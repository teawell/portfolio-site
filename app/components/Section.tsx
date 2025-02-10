type Props = {
  id: string;
  children: React.ReactNode;
};

export const Section = ({ children, id }: Props) => (
  <section id={id} className="m-16 flex flex-col justify-center scroll-m-24">{children}</section>
);
