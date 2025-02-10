type Props = {
    children: React.ReactNode;
  };
  
  export const SectionText = ({ children }: Props) => (
    <div className="text-xl/snug text-balance text-center lg:text-left">{children}</div>
  );
  