import { Experience, ExperienceCard } from "./ExperienceCard";

type Props = {
  experiences: Experience[];
};

export const WorkExperience = ({ experiences }: Props) => {
  return (
    <div className="">
      {experiences.map((experience, index) => (
        <div key={experience.company} className={`mb-8 last:mb-0`}>
          <ExperienceCard experience={experience} isOdd={index % 2 === 0} />
        </div>
      ))}
    </div>
  );
};
