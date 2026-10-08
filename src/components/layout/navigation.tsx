import Link from "next/link";
import { navigationItems } from "@/lib/navigation";

export function Navigation() {
  return (
    <nav className="desktop-navigation" aria-label="Hovedmeny">
      <ul>
        {navigationItems.map(({ href, label }) => (
          <li key={href}><Link href={href} className="navigation-link type-label">{label}</Link></li>
        ))}
      </ul>
    </nav>
  );
}
