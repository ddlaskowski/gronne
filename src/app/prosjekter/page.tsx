import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { projects, type ProjectEntry } from "@/lib/projects";
import "@/styles/projects-page.css";

export const metadata: Metadata = { title: "Prosjekter | Grønne Mur og Flis AS" };

const imageSizes: Record<ProjectEntry["composition"], string> = {
  lead: "(min-width: 1600px) 1189px, (min-width: 1200px) 75vw, 100vw",
  portrait: "(min-width: 1600px) 459px, (min-width: 1200px) 30vw, (min-width: 768px) 48vw, 100vw",
  landscape: "(min-width: 1600px) 827px, (min-width: 1200px) 53vw, (min-width: 768px) 48vw, 100vw",
  editorial: "(min-width: 1600px) 1317px, (min-width: 1200px) 84vw, 100vw",
};

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="projects-page">
      <header className="projects-page-hero">
        <Container>
          <div className="projects-page-hero-grid layout-grid">
            <p className="projects-page-label type-label">02 / PROSJEKTER</p>
            <h1 className="projects-page-heading">Arbeidet vårt.</h1>
            <p className="projects-page-description type-body">
              Et utvalg av arbeider innen flislegging, mur og betong.
            </p>
          </div>
        </Container>
      </header>
      <section className="projects-page-gallery" aria-label="Prosjektgalleri">
        <Container>
          <div className="projects-page-composition layout-grid">
            {projects.map((project) => {
              const { image, aspectRatio } = project;
              const position = image?.objectPosition;
              const mediaStyle = {
                "--gallery-ratio-mobile": aspectRatio.mobile,
                "--gallery-ratio-tablet": aspectRatio.tablet ?? aspectRatio.mobile,
                "--gallery-ratio-desktop": aspectRatio.desktop ?? aspectRatio.tablet ?? aspectRatio.mobile,
                "--gallery-position-mobile": position?.mobile ?? "50% 50%",
                "--gallery-position-tablet": position?.tablet ?? position?.mobile ?? "50% 50%",
                "--gallery-position-desktop": position?.desktop ?? position?.tablet ?? position?.mobile ?? "50% 50%",
              } as CSSProperties;

              return (
                <figure key={project.id} className={`projects-page-item projects-page-${project.composition}`}>
                  <div className="projects-page-media" style={mediaStyle}>
                    {image ? (
                      <Image src={image.src} alt={image.alt} fill sizes={imageSizes[project.composition]} className="projects-page-image" />
                    ) : (
                      <p className="projects-page-placeholder-label type-label">PROSJEKTFOTO KOMMER</p>
                    )}
                  </div>
                  {image && (project.title || project.category || project.location) && (
                    <figcaption className="projects-page-caption">
                      {project.title && <h2 className="type-subheading">{project.title}</h2>}
                      {project.category && <p className="projects-page-metadata type-label">{project.category}</p>}
                      {project.location && <p className="projects-page-metadata type-small font-mono">{project.location}</p>}
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        </Container>
      </section>
      <section className="projects-page-contact" aria-labelledby="projects-page-contact-heading">
        <Container className="layout-grid">
          <h2 id="projects-page-contact-heading" className="projects-page-contact-heading">Har du et prosjekt i tankene?</h2>
          <Link href="/kontakt" className="projects-page-contact-link contact-cta-link type-label">TA KONTAKT</Link>
        </Container>
      </section>
    </main>
  );
}
