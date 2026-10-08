"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { revealMotion } from "@/lib/motion";

// Progressive enhancement: server HTML and CSS always render a visible heading.
export function RevealHeading(props: ComponentPropsWithoutRef<"h2">) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const revealed = useRef(false);

  useEffect(() => {
    let disposed = false;
    let revert: (() => void) | undefined;

    async function initialize() {
      // Defer loading the motion runtime until this client component mounts.
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        document.fonts.ready,
      ]);
      const heading = headingRef.current;
      if (disposed || !heading) return;

      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      revert = () => media.revert();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        // History restoration or late loading must never re-hide visible content.
        if (revealed.current || heading.getBoundingClientRect().top <= innerHeight * 0.85) return;
        gsap.from(heading, {
          y: revealMotion.y,
          opacity: 0,
          duration: revealMotion.duration,
          ease: revealMotion.ease,
          clearProps: "transform,opacity",
          onComplete: () => { revealed.current = true; },
          scrollTrigger: {
            trigger: heading,
            start: revealMotion.start,
            once: true,
          },
        });
      }, heading);
    }

    // Runtime/import failures keep the original visible server-rendered content.
    void initialize().catch(() => revert?.());
    return () => {
      disposed = true;
      revert?.();
    };
  }, []);

  return <h2 {...props} ref={headingRef} />;
}
