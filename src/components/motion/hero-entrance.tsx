"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import type { gsap } from "gsap";
import { loadGsap } from "@/lib/gsap-client";
import { revealMotion } from "@/lib/motion";

export function HeroEntrance({ onFocusCapture, ...props }: ComponentPropsWithoutRef<"div">) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const started = useRef(false);

  useEffect(() => {
    let disposed = false;
    let revert: (() => void) | undefined;

    async function initialize() {
      const gsap = await loadGsap();
      const scope = scopeRef.current;
      if (disposed || !scope) return;
      const media = gsap.matchMedia();
      revert = () => media.revert();
      media.add({
        motion: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      }, (context) => {
        // A changed preference never re-hides content that has already been shown.
        if (started.current) return;
        started.current = true;
        if (context.conditions?.reduced || scope.getBoundingClientRect().bottom <= 0) return;
        const eyebrow = scope.querySelector(".type-label");
        const headline = scope.querySelector(".hero-heading");
        const description = scope.querySelector(".hero-description");
        const cta = scope.querySelector(".hero-cta");
        if (!eyebrow || !headline || !description || !cta) return;

        const timeline = gsap.timeline({ defaults: { ease: revealMotion.ease } });
        timelineRef.current = timeline;
        timeline
          .from(eyebrow, { opacity: 0, y: 12, duration: 0.55, clearProps: "transform,opacity" }, 0.15)
          .from(headline, { opacity: 0, y: 28, duration: 1, clearProps: "transform,opacity" }, 0.30)
          .from(description, { opacity: 0, y: 16, duration: 0.75, clearProps: "transform,opacity" }, 0.55)
          .from(cta, { opacity: 0, y: 12, duration: 0.65, clearProps: "transform,opacity" }, 0.75);
        return () => { timelineRef.current = null; };
      }, scope);
    }

    void initialize().catch(() => revert?.());
    return () => {
      disposed = true;
      revert?.();
      timelineRef.current = null;
    };
  }, []);

  return (
    <div {...props} ref={scopeRef} onFocusCapture={(event) => {
      // Keyboard users must never focus a temporarily transparent CTA.
      started.current = true;
      timelineRef.current?.progress(1);
      onFocusCapture?.(event);
    }} />
  );
}
