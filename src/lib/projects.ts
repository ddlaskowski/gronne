import type { StaticImageData } from "next/image";

type ResponsiveValue = { mobile: string; tablet?: string; desktop?: string };

export type ProjectEntry = {
  id: string;
  composition: "lead" | "portrait" | "landscape" | "editorial";
  aspectRatio: ResponsiveValue;
  image?: {
    src: string | StaticImageData;
    alt: string;
    objectPosition?: ResponsiveValue;
  };
  title?: string;
  category?: string;
  location?: string;
};

// Technical gallery positions only. Add photography and metadata after client approval.
export const projects: readonly ProjectEntry[] = [
  { id: "gallery-01", composition: "lead", aspectRatio: { mobile: "4 / 3", tablet: "16 / 10" } },
  { id: "gallery-02", composition: "portrait", aspectRatio: { mobile: "4 / 5" } },
  { id: "gallery-03", composition: "landscape", aspectRatio: { mobile: "3 / 2" } },
  { id: "gallery-04", composition: "editorial", aspectRatio: { mobile: "4 / 3", tablet: "16 / 9" } },
];
