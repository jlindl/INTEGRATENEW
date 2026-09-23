/**
 * Sending posts to LinkedIn, behind a swappable interface. Ayrshare is the
 * implementation today; another service (e.g. Postiz) only needs a class with
 * the same two methods and a case in getPublisher().
 */
import { config } from "../config";

export type PublishResult = {
  /** The publisher's own id for the post, used to check on it later. */
  id: string;
  status: "scheduled" | "posted";
  linkedinPostId?: string;
  linkedinUrl?: string;
};

export type PostStatus = {
  status: "scheduled" | "posted" | "failed";
  linkedinPostId?: string;
  linkedinUrl?: string;
  error?: string;
};

export interface Publisher {
  readonly name: string;
  /**
   * Publish now, or schedule for `scheduleAt`. `idempotencyKey` must make a
   * repeated call for the same post a no-op rather than a second post.
   */
  publish(input: { text: string; scheduleAt?: Date; idempotencyKey: string }): Promise<PublishResult>;
  /** Current state of a post this publisher accepted earlier. */
  status(id: string): Promise<PostStatus>;
}

export class PublishError extends Error {
  constructor(
    message: string,
    /** Credentials or account problems: stop the run rather than burn retries on every post. */
    readonly fatal = false,
    /** The publisher says this post already exists (the idempotency key was used). */
    readonly duplicate = false,
  ) {
    super(message);
  }
}

type AyrshareResponse = {
  status?: string;
  id?: string;
  scheduleDate?: string;
  message?: string;
  code?: number;
  errors?: { message?: string; code?: number; platform?: string }[];
  postIds?: { status?: string; id?: string; postUrl?: string; platform?: string }[];
};

/** Ayrshare (https://www.ayrshare.com/docs). Needs AYRSHARE_API_KEY and a LinkedIn company page linked in the Ayrshare dashboard. */
export class AyrsharePublisher implements Publisher {
  readonly name = "ayrshare";
  private readonly base = config.publisher.ayrshare.baseUrl;

  private key(): string {
    const key = process.env.AYRSHARE_API_KEY;
    if (!key) throw new PublishError("AYRSHARE_API_KEY is not set.", true);
    return key;
  }

  /** `acceptErrorStatus`: a 200 whose body says status "error" is data (a post's outcome), not a failed call. */
  private async call(path: string, init?: RequestInit, acceptErrorStatus = false): Promise<AyrshareResponse> {
    const res = await fetch(`${this.base}${path}`, {
      ...init,
      headers: { Authorization: `Bearer ${this.key()}`, "Content-Type": "application/json" },
    });
    const body = (await res.json().catch(() => ({}))) as AyrshareResponse;
    if (res.ok && (acceptErrorStatus || body.status !== "error")) return body;

    const detail = [body.message, ...(body.errors ?? []).map((e) => e.message)].filter(Boolean).join(" / ") || `HTTP ${res.status}`;
    const fatal = res.status === 401 || res.status === 403;
    const duplicate = /idempoten|duplicate/i.test(detail);
    throw new PublishError(`Ayrshare ${res.status}: ${detail}`, fatal, duplicate);
  }

  async publish(input: { text: string; scheduleAt?: Date; idempotencyKey: string }): Promise<PublishResult> {
    const body = await this.call("/post", {
      method: "POST",
      body: JSON.stringify({
        post: input.text,
        platforms: ["linkedin"],
        idempotencyKey: input.idempotencyKey,
        ...(input.scheduleAt ? { scheduleDate: input.scheduleAt.toISOString().replace(/\.\d{3}Z$/, "Z") } : {}),
      }),
    });
    if (!body.id) throw new PublishError(`Ayrshare accepted the post but returned no id: ${JSON.stringify(body).slice(0, 300)}`);
    const li = body.postIds?.find((p) => p.platform === "linkedin");
    return {
      id: body.id,
      status: body.status === "scheduled" ? "scheduled" : "posted",
      linkedinPostId: li?.id,
      linkedinUrl: li?.postUrl,
    };
  }

  async status(id: string): Promise<PostStatus> {
    const body = await this.call(`/post/${encodeURIComponent(id)}`, undefined, true);
    const li = body.postIds?.find((p) => p.platform === "linkedin");
    if (body.status === "success") return { status: "posted", linkedinPostId: li?.id, linkedinUrl: li?.postUrl };
    if (body.status === "error") {
      const detail = [body.message, ...(body.errors ?? []).map((e) => e.message)].filter(Boolean).join(" / ");
      return { status: "failed", error: `Ayrshare reported the post failed: ${detail || "no detail"}` };
    }
    // Anything else (pending, scheduled, unknown) leaves the post as scheduled; never risk a repost on a guess.
    return { status: "scheduled" };
  }
}

export function getPublisher(): Publisher {
  switch (config.publisher.provider) {
    case "ayrshare":
      return new AyrsharePublisher();
  }
}
