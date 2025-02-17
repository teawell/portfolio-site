import { Section } from "./Section";
import { SectionSkills } from "./SectionSkills";
import { SectionText } from "./SectionText";
import { SectionTitle } from "./SectionTitle";


export const AboutSection = () => (
  <Section id="about">
    <SectionTitle>About</SectionTitle>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2px_1fr] gap-4 lg:gap-8 bg-gray-800 rounded-lg">
      <SectionText className="pt-3 lg:py-3 lg:pl-4 lg:pr-0 px-4">
        <p className="mb-3">
          I am a passionate developer who focuses on delivering outstanding user
          experiences through web applications. I have worked with technologies
          such as React and Typescript to create great applications over the
          past 8 years.
        </p>
        <p className="mb-3">
          I&apos;ve taken on many roles including leading teams to deliver
          successful projects whilst managing stakeholder expectations,
          architecting both new and old codebases and managing/mentoring other
          team members.
        </p>
        <p>
          I always strive to deliver high quality code early and often and
          permeate these qualities throughout the team.
        </p>
      </SectionText>
      <div className="h-full w-full bg-gray-900 min-h-1"></div>
      <SectionSkills className="pb-3 lg:py-3 lg:pr-4 lg:pl-0 px-4" />
    </div>
  </Section>
);
