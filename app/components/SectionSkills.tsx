import { Skill } from "./Skill";
import typescriptLogo from "../images/typescript.png";
import reactLogo from "../images/react.png";
import nextLogo from "../images/next.png";
import jestLogo from "../images/Jest.png";
import cssLogo from "../images/css.png";
import nodeLogo from "../images/node.png";

type Props = {
  className?: string;
};

const skills = [
  { title: "Typescript", image: typescriptLogo },
  { title: "React", image: reactLogo },
  { title: "Next.js", image: nextLogo },
  { title: "Jest", image: jestLogo },
  { title: "CSS", image: cssLogo },
  { title: "Node.js", image: nodeLogo },
];

export const SectionSkills = ({ className }: Props) => (
  <div className={`grid grid-flow-col grid-rows-3 sm:grid-rows-2 gap-y-4 ${className}`}>
    {skills.map((skill) => (
      <Skill key={skill.title} skill={skill} />
    ))}
  </div>
);
