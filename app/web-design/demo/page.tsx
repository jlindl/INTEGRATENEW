import { redirect } from "next/navigation";

/** /web-design/demo has no index of its own — send strays to the portfolio. */
export default function DemoIndex() {
  redirect("/web-design");
}
