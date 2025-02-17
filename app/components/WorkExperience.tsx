import { Experience, ExperienceCard } from "./ExperienceCard";

type Props = {
  experiences: Experience[];
};

export const WorkExperience = ({ experiences }: Props) => (
  <div className="">
    {experiences.map((experience) => (
      <div key={experience.company} className="mb-8 last:mb-0">
        <ExperienceCard experience={experience} />
      </div>
    ))}
  </div>
);
