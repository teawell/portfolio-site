import { Skill } from "./Skill";

export type Experience = {
  start: Date;
  end: Date;
  location: string;
  company: string;
  companyLink?: string;
  title: string;
  description: React.ReactNode;
  skills: string[];
};

type Props = {
  experience: Experience[];
};

export const WorkExperience = ({ experience }: Props) => (
  <div className="">
    {experience.map(
      ({
        start,
        end,
        location,
        company,
        title,
        description,
        companyLink,
        skills,
      }) => (
        <div key={company}>
          <div>
            <div>
              <h3>
                {companyLink ? (
                  <a
                    href={companyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {company}
                  </a>
                ) : (
                  company
                )}
              </h3>
              <p>{title}</p>
            </div>
            <div>
              <p>
                {start.getMonth()} {start.getFullYear()}-{end.getMonth()}{" "}
                {end.getFullYear()}
              </p>
              <p>{location}</p>
            </div>
          </div>
          <p>{description}</p>
          <div className="flex flex-wrap">
            {skills.map((skill) => (
              <Skill key={`${company}-${skill}`} skill={skill} />
            ))}
          </div>
        </div>
      )
    )}
  </div>
);
