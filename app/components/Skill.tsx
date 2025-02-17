type Props = {
  skill: {
    title: string;
    image: string;
  };
};

export const Skill = ({ skill: { title, image } }: Props) => (
  <div className="p-2 rounded-lg text-center flex-shrink-0">
    <div className="flex justify-center">
      <img
        src={image}
        alt={`${title} logo`}
        className="w-auto h-12 sm:h-16 md:h-24 pb-2"
      />
    </div>
    <p className="text-base/snug">{title}</p>
  </div>
);
