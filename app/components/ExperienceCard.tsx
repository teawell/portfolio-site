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

type Props = {
  experience: Experience;
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

export const ExperienceCard = ({
  experience: {
    start,
    end,
    location,
    company,
    title,
    description,
    companyLink,
    skills,
  },
}: Props) => (
  <>
    <div className="flex flex-wrap justify-between pb-2">
      <div className="flex mr-2 text-lg/snug sm:text-xl/snug">
        <h3 className="font-bold pr-2">
          {companyLink ? (
            <a href={companyLink} target="_blank" rel="noopener noreferrer">
              {company}
            </a>
          ) : (
            company
          )}
          ,
        </h3>
        <p>{title}</p>
      </div>
      <div className="flex grow-[3] justify-end">
        <p className="pr-2">{`${formatMonthYear(start)} - ${formatMonthYear(
          end
        )},`}</p>
        <p>{location}</p>
      </div>
    </div>
    <SectionText className="pb-2 text-base/snug sm:text-lg/snug">
      {description}
    </SectionText>
    <div className="flex flex-wrap text-center">
      <h4 className="font-semibold pr-2">Skills:</h4>
      <p>{skills.join(", ")}</p>
    </div>
  </>
);
