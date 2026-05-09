import Link from "next/link";
import { Suspense } from "react";
import { NavbarActions } from "./NavbarActions";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Main navbar layout — pure view component.
 * Auth state is handled inside NavbarActions via a server/client boundary.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          cbtis
        </Link>

        {/* Nav links */}
        <ul className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth controls — Suspense boundary while session loads */}
        <Suspense
          fallback={
            <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
          }
        >
          <NavbarActions />
        </Suspense>
      </nav>
    </header>
  );
}
