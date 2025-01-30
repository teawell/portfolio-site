type Props = {
  children: React.ReactNode;
};

export const SectionTitle = ({ children }: Props) => (
  <h2 className="text-3xl/snug mb-8 px-5 py-1 rounded bg-gradient-to-r from-orange-600 to-50% to-transparent">{children}</h2>
);
