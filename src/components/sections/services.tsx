import { Container } from "@/components/layout/container";

type Service = {
  number: string;
  name: string;
  specializations: string;
};

const services: readonly Service[] = [
  { number: "01", name: "BAD & FLIS", specializations: "Baderom · Flislegging · Membran" },
  { number: "02", name: "MUR & PUSS", specializations: "Murarbeid · Pussarbeid" },
  { number: "03", name: "BETONG & FORSKALING", specializations: "Betongarbeid · Forskaling" },
];

export function Services() {
  return (
    <section className="services" aria-labelledby="services-heading">
      <Container>
        <div className="services-header layout-grid">
          <p className="services-label type-label">02 / TJENESTER</p>
          <h2 id="services-heading" className="services-heading">Det vi gjør.</h2>
        </div>
        <ol className="services-list">
          {services.map((service) => (
            <li key={service.number} className="services-row layout-grid">
              <span className="services-number type-label" aria-hidden="true">{service.number}</span>
              <h3 className="services-name">{service.name}</h3>
              <p className="services-description type-micro">{service.specializations}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
