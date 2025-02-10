type Props = {
  skill: string;
};

export const Skill = ({ skill }: Props) => (
  <div className="mx-auto border border-orange-500 p-2 rounded-full text-center min-w-60 max-w-32 sm:mx-0 sm:min-w-28 max-h-12">
    {skill}
  </div>
);
