"use client";

let runtime: Promise<typeof import("gsap")> | undefined;

// Shared client-only loading; await fonts before measuring or revealing text.
export async function loadGsap() {
  const [{ gsap }] = await Promise.all([
    runtime ??= import("gsap"),
    document.fonts.ready,
  ]);
  return gsap;
}

// Native preference changes revert only this component's context. GSAP's
// matchMedia also runs ScrollTrigger's global revert/refresh lifecycle.
export function createMotionContext(
  gsap: typeof import("gsap").gsap,
  scope: Element,
  animate: (motionAllowed: boolean) => void | (() => void),
) {
  const preference = window.matchMedia("(prefers-reduced-motion: no-preference)");
  let context: ReturnType<typeof gsap.context> | undefined;

  const dispose = () => {
    preference.removeEventListener("change", update);
    context?.revert();
    context = undefined;
  };
  function update() {
    context?.revert();
    context = gsap.context(() => {}, scope);
    try {
      context.add(() => animate(preference.matches));
    } catch (error) {
      dispose();
      throw error;
    }
  }

  preference.addEventListener("change", update);
  update();
  return dispose;
}
