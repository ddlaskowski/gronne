"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

// Only this image needs client behavior, to retain the placeholder on load failure.
export function HeroImage({ image }: { image: StaticImageData }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <Image
      src={image}
      alt="En håndverker fordeler flislim med en tannsparkel og lager buede limriller mellom gulvflisene."
      fill
      sizes="(min-width: 1024px) 49vw, 100vw"
      className="hero-image"
      preload
      onError={() => setFailed(true)}
    />
  );
}
