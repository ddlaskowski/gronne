"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/lib/navigation";

export function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="desktop-navigation" aria-label="Hovedmeny">
      <ul>
        {navigationItems.map(({ href, label }) => (
          <li key={href}><Link href={href} className="navigation-link type-label" aria-current={pathname === href ? "page" : undefined}>{label}</Link></li>
        ))}
      </ul>
    </nav>
  );
}
