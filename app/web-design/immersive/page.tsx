import { redirect } from "next/navigation";

/** The demos are listed on the web design page itself. */
export default function ImmersiveIndex() {
  redirect("/web-design#immersive");
}
