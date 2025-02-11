type Props = {
  children: React.ReactNode;
  className?: string;
};

export const SectionText = ({ children, className }: Props) => (
  <div
    className={`text-lg/snug sm:text-xl/snug text-balance text-center lg:text-left ${className}`}
  >
    {children}
  </div>
);
