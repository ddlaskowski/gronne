import { Container } from "@/components/layout/container";

export default function Home() {
  return (
    <main className="foundation-page">
      <Container>
        <div className="layout-grid">
          <div className="foundation-copy">
            <h1 className="type-section">Grønne Mur og Flis AS</h1>
            <p className="type-body text-muted foundation-description">
              Flislegging, baderomsarbeid, mur og puss samt betongarbeid i Oslo og omegn.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
