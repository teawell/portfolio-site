type Props = {
  id: string;
  children: React.ReactNode;
};

export const Section = ({ children, id }: Props) => (
  <section id={id} className="m-4 mt-8 md:m-16 flex flex-col justify-center scroll-m-12 sm:scroll-m-20">{children}</section>
);
