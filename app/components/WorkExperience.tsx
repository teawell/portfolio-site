import { SectionText } from "./SectionText";

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

const formatMonthYear = (date: Date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${months[month]} ${year}`;
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
        <div key={company} className="mb-8 last:mb-0">
          <div className="flex justify-between pb-1">
            <div className="flex">
              <h3 className="font-bold pr-2">
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
                ,
              </h3>
              <p>{title}</p>
            </div>
            <div className="flex">
              <p className="pr-2">{`${formatMonthYear(
                start
              )} - ${formatMonthYear(end)},`}</p>
              <p>{location}</p>
            </div>
          </div>
          <SectionText className="pb-2">{description}</SectionText>
          <div className="flex flex-wrap">
            <h4 className="font-semibold pr-2">Skills:</h4>
            <p>{skills.join(", ")}</p>
          </div>
        </div>
      )
    )}
  </div>
);
