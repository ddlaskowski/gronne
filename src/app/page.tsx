import { Hero } from "@/components/sections/hero";
import { Introduction } from "@/components/sections/introduction";
import { Services } from "@/components/sections/services";
import { FeaturedCraft } from "@/components/sections/featured-craft";
import { SelectedProjects } from "@/components/sections/selected-projects";
import { AboutPreview } from "@/components/sections/about-preview";
import { ContactCta } from "@/components/sections/contact-cta";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <Introduction />
      <Services />
      <FeaturedCraft />
      <SelectedProjects />
      <AboutPreview />
      <ContactCta />
    </main>
  );
}
