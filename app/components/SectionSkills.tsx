type Props = {
  skills: string[];
};

export const SectionSkills = ({ skills }: Props) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 ">
    {skills.map((skill) => (
      <div key={skill} className="mx-auto border border-orange-500 p-2 rounded-full text-center min-w-60 max-w-32 sm:mx-0 sm:min-w-28 max-h-12">{skill}</div>
    ))}
  </div>
);
