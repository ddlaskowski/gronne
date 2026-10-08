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
