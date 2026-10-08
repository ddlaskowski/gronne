"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { loadGsap } from "@/lib/gsap-client";
import { revealMotion } from "@/lib/motion";

// The existing media div provides geometry; children can be a placeholder or Image.
export function RevealImage(props: ComponentPropsWithoutRef<"div">) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const revealed = useRef(false);

  useEffect(() => {
    let disposed = false;
    let revert: (() => void) | undefined;

    async function initialize() {
      const [gsap, { ScrollTrigger }] = await Promise.all([
        loadGsap(),
        import("gsap/ScrollTrigger"),
      ]);
      const element = mediaRef.current;
      if (disposed || !element) return;

      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      revert = () => media.revert();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        // Late loading and history restoration must not re-hide visible media.
        if (revealed.current || element.getBoundingClientRect().top <= innerHeight * 0.85) return;
        gsap.fromTo(element,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.1,
            ease: revealMotion.ease,
            clearProps: "clipPath",
            // An interrupted reveal must not replay after a preference change.
            onStart: () => { revealed.current = true; },
            scrollTrigger: {
              trigger: element,
              start: revealMotion.start,
              once: true,
            },
          },
        );
      }, element);
    }

    void initialize().catch(() => revert?.());
    return () => {
      disposed = true;
      revert?.();
    };
  }, []);

  return <div {...props} ref={mediaRef} />;
}
