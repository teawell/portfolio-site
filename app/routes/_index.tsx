import type { MetaFunction } from "@remix-run/node";
import { About } from "~/components/About";
import { Hero } from "~/components/Hero";
import { Nav } from "~/components/Nav";
import { Section } from "~/components/Section";
import { SectionTitle } from "~/components/SectionTitle";
import { Work } from "~/components/Work";

export const meta: MetaFunction = () => {
  return [
    { title: "Jon Teawell | Frontend web developer" },
    { name: "description", content: "Jon Teawell | Frontend web developer" },
  ];
};

export default function Index() {
  return (
    <div>
      <Hero />
      <Nav />
      <About />
      <Work />
      <Section id="contact">
        <SectionTitle>Contact</SectionTitle>
      </Section>
    </div>
  );
}
