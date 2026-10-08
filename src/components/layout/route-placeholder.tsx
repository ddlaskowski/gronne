import { Container } from "@/components/layout/container";

export function RoutePlaceholder({ title }: { title: string }) {
  return (
    <main id="main-content" tabIndex={-1} className="foundation-page">
      <Container><div className="foundation-copy"><h1 className="type-section">{title}</h1></div></Container>
    </main>
  );
}
