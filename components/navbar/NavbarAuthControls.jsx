"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { useAuth } from "@/hooks/useAuth";

/**
 * Client component — receives user from the server boundary.
 * Renders login button or user avatar + sign out depending on auth state.
 *
 * @param {{ user: { name: string, email: string } | null }} props
 */
export function NavbarAuthControls({ user }) {
  const { logout } = useAuth();

  if (!user) {
    return (
      <Button asChild size="sm">
        <Link href="/login">Log in</Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <UserAvatar name={user.name} className="h-8 w-8" />
        <span className="hidden text-sm font-medium sm:block">{user.name}</span>
      </div>
      <Button variant="outline" size="sm" onClick={logout}>
        Sign out
      </Button>
    </div>
  );
}
