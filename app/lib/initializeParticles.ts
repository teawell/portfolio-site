import { RefObject } from "react";
import { ParticleContainer } from "./ParticleContainer";

export const initializeParticles = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  areasToAvoidRefs: RefObject<HTMLElement>[]
) => {
  const htmlElementToAvoid: HTMLElement[] = areasToAvoidRefs
    .map((item: RefObject<HTMLElement>) =>
      item && item.current ? item.current : null
    )
    .filter((item) => item !== null);

  const particleContainer = new ParticleContainer({
    numberOfParticles: 101,
    canvas,
    context,
    htmlElementToAvoid,
  });

  addEventListener("resize", particleContainer.updateOnReSize);

  return particleContainer;
};
