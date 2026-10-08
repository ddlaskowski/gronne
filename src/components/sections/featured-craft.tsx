import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { RevealHeading } from "@/components/motion/reveal-heading";

type CraftImage = {
  src: string | StaticImageData;
  alt: string;
  position?: { mobile?: string; tablet?: string; desktop?: string };
};

// Supply an image only once an approved asset and descriptive alt text are available.
export function FeaturedCraft({ image }: { image?: CraftImage }) {
  const imagePosition = image ? {
    "--craft-position-mobile": image.position?.mobile ?? "50% 50%",
    "--craft-position-tablet": image.position?.tablet ?? image.position?.mobile ?? "50% 50%",
    "--craft-position-desktop": image.position?.desktop ?? image.position?.tablet ?? "50% 50%",
  } as CSSProperties : undefined;

  return (
    <section className="featured-craft" aria-labelledby="featured-craft-heading">
      <Container>
        <div className="featured-craft-header">
          <p className="type-label">03 / HÅNDVERKET</p>
        </div>
        <div className="featured-craft-grid layout-grid">
          <div className="featured-craft-copy">
            <RevealHeading id="featured-craft-heading" className="featured-craft-heading">
              <span>Presisjon i</span>{" "}<span>hver detalj.</span>
            </RevealHeading>
            <p className="featured-craft-description type-body">
              Vi legger vekt på godt håndverk, nøyaktig utførelse og løsninger som
              fungerer i praksis. Detaljene er en viktig del av helheten.
            </p>
          </div>
          <div className="featured-craft-media" style={imagePosition}>
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1600px) 827px, (min-width: 1200px) 53vw, (min-width: 768px) 48vw, 100vw"
                className="featured-craft-image"
              />
            ) : (
              <p className="featured-craft-placeholder-label type-label">PROSJEKTFOTO KOMMER</p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
