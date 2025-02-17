import { useEffect, useRef, useState } from "react";
import { useIsVisible } from "~/lib/useIsVisible";

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
  isOdd: boolean;
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
  isOdd,
}: Props) => {
  const experienceRef = useRef<HTMLDivElement>(null);
  const isExperienceVisible = useIsVisible(experienceRef, { threshold: 0.5 });
  const fadeType = isOdd ? "animate-fade-left" : "animate-fade-right";
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isExperienceVisible) {
      setHasAnimated(true);
    }
  }, [isExperienceVisible]);

  return (
    <div
      ref={experienceRef}
      className={`bg-gray-800 rounded-lg animate-once animate-duration-[600ms] ${
        hasAnimated ? fadeType : "opacity-0"
      }`}
    >
      <div className="flex flex-wrap justify-between py-3 px-4 border-b-2 border-gray-900">
        <div className="flex mr-2 flex-wrap text-base/snug sm:text-lg/snug">
          <h3 className="font-bold pr-2">
            {companyLink ? (
              <a href={companyLink} target="_blank" rel="noopener noreferrer">
                {company}
              </a>
            ) : (
              company
            )}
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
      <p className="py-3 px-4 text-base/snug border-b-2 border-gray-900">
        {description}
      </p>
      <div className="py-3 px-4">
        <h4 className="font-semibold">Skills:</h4>
        <p>{skills.join(", ")}</p>
      </div>
    </div>
  );
};
