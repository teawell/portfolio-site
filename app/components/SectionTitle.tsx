type Props = {
  children: React.ReactNode;
};

export const SectionTitle = ({ children }: Props) => (
  <div className=" mb-8 text-center">
    <h2 className="px-5 py-1 inline-block text-3xl/snug border-b-2 border-orange-500">
      {children}
    </h2>
  </div>
);
