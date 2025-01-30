type Props = {
    children: React.ReactNode;
  };
  
  export const SectionText = ({ children }: Props) => (
    <div className="text-xl/snug text-center text-balance">{children}</div>
  );
  