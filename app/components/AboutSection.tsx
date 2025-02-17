import { Section } from "./Section";
import { SectionSkills } from "./SectionSkills";
import { SectionText } from "./SectionText";
import { SectionTitle } from "./SectionTitle";

const skills = [
  "Typescript",
  "React",
  "Next.js",
  "Javascript",
  "Storybook",
  "React Query",
  "Jest",
  "Cypress",
  "Tailwind",
  "SASS",
  "CSS",
  "TurboRepo",
  "NX",
  "GIT",
  "HTML",
  "React Intl",
  "Webpack",
  "CI/CD",
  "Docker",
  "Redux",
  "Enzyme",
];

export const AboutSection = () => (
  <Section id="about">
    <SectionTitle>About</SectionTitle>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <SectionText>
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
      <SectionSkills skills={skills} />
    </div>
  </Section>
);
