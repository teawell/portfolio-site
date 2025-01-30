import type { MetaFunction } from "@remix-run/node";
import { Hero } from "~/components/Hero";
import { Nav } from "~/components/Nav";
import { Section } from "~/components/Section";
import { SectionText } from "~/components/SectionText";
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
      <Section id="about">
        <SectionTitle>About</SectionTitle>
        <SectionText>
          <p className="mb-3">
            I&apos;m a passionate developer with a focus on delivering
            outstanding user experiences through web applications. I have worked
            with technologies such as React and Typescript to create great
            applications over the past 8 years.
          </p>
          <p className="mb-3">
            I&apos;ve taken on many roles including leading teams to deliver
            successful projects whilst managing stakeholder expectations,
            architecting both new and old codebases and managing/mentoring other
            team members. 
          </p>
          <p>I always strive to deliver high quality code early and
          often and permeate these qualities throughout the team.</p>
        </SectionText>
      </Section>
      <Section id="work">
        <SectionTitle>Work</SectionTitle>
      </Section>
      <Section id="contact">
        <SectionTitle>Contact</SectionTitle>
      </Section>
    </div>
  );
}
