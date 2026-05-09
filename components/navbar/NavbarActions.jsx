import { auth } from "@/auth";
import { NavbarAuthControls } from "./NavbarAuthControls";

/**
 * Server component — fetches session and passes data down to client controls.
 * Keeps auth data fetching at the server boundary.
 */
export async function NavbarActions() {
  const session = await auth();
  return <NavbarAuthControls user={session?.user ?? null} />;
}
