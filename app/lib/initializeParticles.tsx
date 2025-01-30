import { RefObject } from "react";
import { Particle } from "./Particle";


const generateParticles = (
  amount: number,
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  boundingBoxesToAvoid: HTMLElement[]
): Particle[] => {
  return new Array(amount).fill("").map(() => {
    return new Particle(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 20,
      Math.random() * (0.7 - 0.3) + 0.3,
      -0.5 + Math.random(),
      -0.5 + Math.random(),
      canvas,
      context,
      boundingBoxesToAvoid
    );
  });
};

const setSize = (canvas: HTMLCanvasElement) => {
  canvas.width = document.body.scrollWidth;
  canvas.height = window.innerHeight;
};

const animate = (
  particlesArray: Particle[],
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((particle) => particle.animate());
  return requestAnimationFrame(() => animate(particlesArray, canvas, context));
};

const init = (particlesArray: Particle[]) => {
  particlesArray.forEach((particle) => particle.create());
};

export const initializeParticles = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  areasToAvoidRefs: RefObject<HTMLElement>[]
) => {
  //   const cursor = {
  //     x: window.innerWidth / 2,
  //     y: window.innerHeight / 2,
  //   };

  //   addEventListener("mousemove", (e) => {
  //     cursor.x = e.clientX;
  //     cursor.y = e.clientY;
  //   });

  //   addEventListener(
  //     "touchmove",
  //     (e) => {
  //       e.preventDefault();
  //       cursor.x = e.touches[0].clientX;
  //       cursor.y = e.touches[0].clientY;
  //     },
  //     { passive: false }
  //   );

  const htmlElementToAvoid: HTMLElement[] = areasToAvoidRefs
    .map((item: RefObject<HTMLElement>) =>
      item && item.current ? item.current : null
    )
    .filter((item) => item !== null);

  const particlesArray: Particle[] = generateParticles(
    101,
    canvas,
    context,
    htmlElementToAvoid
  );

  setSize(canvas);
  init(particlesArray);

  addEventListener("resize", () => {
    setSize(canvas);
    particlesArray.forEach((particle) =>
      particle.updateOnReSize(canvas, htmlElementToAvoid)
    );
  });

  return animate(particlesArray, canvas, context);
};
