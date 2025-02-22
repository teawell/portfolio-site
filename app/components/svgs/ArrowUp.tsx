type Props = {
  className?: string
}

export const ArrowUp = ({ className }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={className} aria-label="Arrow">
    <title>Arrow</title>
    <path d="m3.293 11.293 1.414 1.414L11 6.414V20h2V6.414l6.293 6.293 1.414-1.414L12 2.586l-8.707 8.707z" />
  </svg>
);
