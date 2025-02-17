type Props = {
  children: React.ReactNode;
  className?: string;
};

export const SectionText = ({ children, className }: Props) => (
  <div
    className={`text-base/snug text-center lg:text-left ${className}`}
  >
    {children}
  </div>
);
