"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { MobileMenu } from "@/components/layout/mobile-menu";

export function HeaderInteractions({ brand, navigation }: { brand: ReactNode; navigation: ReactNode }) {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const update = () => setCompact(window.scrollY > 32);
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeOnDesktop = () => {
      if (desktop.matches) dialogRef.current?.close();
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header className="site-header" data-compact={compact}>
      <a className="skip-link type-small" href="#main-content">Hopp til innhold</a>
      <div className="header-bar">
        <Container className="header-content">
          {brand}
          {navigation}
          <button type="button" className="menu-toggle header-menu-toggle type-label" aria-expanded={open} aria-controls="mobile-menu" aria-haspopup="dialog" onClick={() => setOpen(true)}>
            Meny <span className="menu-toggle-lines" aria-hidden="true"><span /><span /></span>
          </button>
        </Container>
      </div>
      <MobileMenu dialogRef={dialogRef} open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
