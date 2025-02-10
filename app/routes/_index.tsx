import type { MetaFunction } from "@remix-run/node";
import { About } from "~/components/About";
import { Hero } from "~/components/Hero";
import { Nav } from "~/components/Nav";
import { Section } from "~/components/Section";
import { SectionTitle } from "~/components/SectionTitle";

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
      <Section id="work">
        <SectionTitle>Work</SectionTitle>
      </Section>
      <Section id="contact">
        <SectionTitle>Contact</SectionTitle>
      </Section>
    </div>
  );
}
