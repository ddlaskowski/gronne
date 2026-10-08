"use client";

import Link from "next/link";
import { useEffect, type KeyboardEvent, type RefObject } from "react";
import { navigationItems } from "@/lib/navigation";

type MobileMenuProps = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ dialogRef, open, onClose }: MobileMenuProps) {
  function keepFocusInMenu(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      if (dialog.open) dialog.close();
    };
  }, [open, dialogRef]);

  return (
    <dialog ref={dialogRef} id="mobile-menu" className="mobile-menu" aria-labelledby="mobile-menu-title" onClose={onClose} onKeyDown={keepFocusInMenu}>
      <div className="mobile-menu-top">
        <h2 id="mobile-menu-title" className="type-label">Meny</h2>
        <button type="button" className="menu-toggle type-label" onClick={() => dialogRef.current?.close()} autoFocus>
          Lukk <span aria-hidden="true">×</span>
        </button>
      </div>
      <nav aria-label="Hovedmeny, mobil">
        <ul>
          {navigationItems.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="mobile-navigation-link" onClick={() => dialogRef.current?.close()}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </dialog>
  );
}
