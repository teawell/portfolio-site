import { RefObject } from "react";
import { ParticleContainer } from "./ParticleContainer";

export const initializeParticles = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  areasToAvoidRefs: RefObject<HTMLElement>[]
) => {
  const htmlElementsToAvoid: HTMLElement[] = areasToAvoidRefs
    .map((item: RefObject<HTMLElement>) =>
      item && item.current ? item.current : null
    )
    .filter((item) => item !== null);

  const particleContainer = new ParticleContainer({
    canvas,
    context,
    htmlElementsToAvoid,
  });

  addEventListener("resize", () => particleContainer.updateOnReSize(canvas));

  return particleContainer;
};
