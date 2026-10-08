"use client";

import Image from "next/image";
import { useState } from "react";

// Only this image needs client behavior, to retain the placeholder on load failure.
export function HeroImage() {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <Image
      src="/images/hero/hero-craft.webp"
      alt=""
      fill
      sizes="(min-width: 1024px) 49vw, 100vw"
      className="hero-image"
      preload
      onError={() => setFailed(true)}
    />
  );
}
