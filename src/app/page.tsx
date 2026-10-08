import { Hero } from "@/components/sections/hero";
import { Introduction } from "@/components/sections/introduction";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <Introduction />
    </main>
  );
}
