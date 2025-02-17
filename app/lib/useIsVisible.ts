import { RefObject, useEffect, useState } from "react";

export const useIsVisible = (
  ref: RefObject<HTMLElement>,
  options?: IntersectionObserverInit
) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const refCopy = ref;
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);
    if (refCopy.current) {
      observer.observe(refCopy.current);
    }
    return () => {
      if (refCopy.current) {
        observer.unobserve(refCopy.current);
      }
    };
  }, [ref, options]);

  return isIntersecting;
};
