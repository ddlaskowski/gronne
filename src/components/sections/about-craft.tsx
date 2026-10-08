import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { Container } from "@/components/layout/container";

type AboutCraftImage = {
  src: string | StaticImageData;
  alt: string;
  position?: { mobile?: string; tablet?: string; desktop?: string };
};

// Configure only an approved client photograph with meaningful Norwegian alt text.
export function AboutCraft({ image }: { image?: AboutCraftImage }) {
  const imagePosition = image ? {
    "--about-image-position-mobile": image.position?.mobile ?? "50% 50%",
    "--about-image-position-tablet": image.position?.tablet ?? image.position?.mobile ?? "50% 50%",
    "--about-image-position-desktop": image.position?.desktop ?? image.position?.tablet ?? image.position?.mobile ?? "50% 50%",
  } as CSSProperties : undefined;

  return (
    <section className="about-page-craft" aria-labelledby="about-page-craft-heading">
      <Container>
        <div className="about-page-craft-header">
          <p className="type-label">03 / HÅNDVERKET</p>
        </div>
        <div className="about-page-craft-grid layout-grid">
          <div className="about-page-craft-copy">
            <h2 id="about-page-craft-heading" className="about-page-craft-heading">
              <span>Detaljene gjør</span>{" "}<span>forskjellen.</span>
            </h2>
            <p className="about-page-craft-description type-body">
              Et godt resultat krever nøyaktig utførelse, forståelse for materialene
              og oppmerksomhet på detaljene gjennom hele arbeidet.
            </p>
          </div>
          <div className="about-page-craft-media" style={imagePosition}>
            {image ? (
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1600px) 704px, (min-width: 1200px) 45vw, (min-width: 768px) 48vw, 100vw" className="about-page-craft-image" />
            ) : (
              <p className="about-page-placeholder-label type-label">PROSJEKTFOTO KOMMER</p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
