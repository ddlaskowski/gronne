import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { RevealHeading } from "@/components/motion/reveal-heading";

type Project = {
  image?: {
    src: string | StaticImageData;
    alt: string;
    position?: { mobile?: string; tablet?: string; desktop?: string };
  };
  title?: string;
  category?: string;
};

// Two reserved positions; populate only with approved photography and real metadata.
const emptyProjects: readonly [Project, Project] = [{}, {}];

export function SelectedProjects({ projects = emptyProjects }: { projects?: readonly [Project, Project] }) {
  return (
    <section className="selected-projects" aria-labelledby="selected-projects-heading">
      <Container>
        <div className="selected-projects-header layout-grid">
          <p className="selected-projects-label type-label">04 / UTVALGTE PROSJEKTER</p>
          <RevealHeading id="selected-projects-heading" className="selected-projects-heading">
            <span>Arbeid som</span>{" "}<span>taler for seg.</span>
          </RevealHeading>
        </div>
        <div className="selected-projects-composition layout-grid">
          {projects.map((project, index) => {
            const image = project.image;
            const imagePosition = image ? {
              "--project-position-mobile": image.position?.mobile ?? "50% 50%",
              "--project-position-tablet": image.position?.tablet ?? image.position?.mobile ?? "50% 50%",
              "--project-position-desktop": image.position?.desktop ?? image.position?.tablet ?? image.position?.mobile ?? "50% 50%",
            } as CSSProperties : undefined;

            return (
              <figure key={index} className="selected-projects-item">
                <div className="selected-projects-media" style={imagePosition}>
                  {image ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes={index === 0
                        ? "(min-width: 1600px) 827px, (min-width: 1200px) 53vw, (min-width: 768px) 64vw, 100vw"
                        : "(min-width: 1600px) 459px, (min-width: 1200px) 30vw, (min-width: 768px) 32vw, 100vw"}
                      className="selected-projects-image"
                    />
                  ) : (
                    <p className="selected-projects-placeholder-label type-label">PROSJEKTFOTO KOMMER</p>
                  )}
                </div>
                {(project.title || project.category) && (
                  <figcaption className="selected-projects-caption">
                    {project.title && <h3 className="type-subheading">{project.title}</h3>}
                    {project.category && <p className="selected-projects-category type-label">{project.category}</p>}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
        <div className="selected-projects-footer layout-grid">
          <Link href="/prosjekter" className="selected-projects-cta type-label">
            SE ALLE PROSJEKTER <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
