import { Skill } from "./Skill";

type Props = {
  skills: string[];
};

export const SectionSkills = ({ skills }: Props) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 ">
    {skills.map((skill) => (
      <Skill key={skill} skill={skill} />
    ))}
  </div>
);
