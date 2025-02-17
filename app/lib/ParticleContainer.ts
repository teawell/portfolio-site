import { Particle } from "./Particle";

type Props = {
  numberOfParticles: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  htmlElementToAvoid: HTMLElement[];
};

export class ParticleContainer {
  particles: Particle[];
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  htmlElementToAvoid: HTMLElement[];
  animationRequestFrameId?: number;

  constructor({
    numberOfParticles,
    canvas,
    context,
    htmlElementToAvoid,
  }: Props) {
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // If it's resolution does not match change it
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    this.canvas = canvas;
    this.context = context;
    this.htmlElementToAvoid = htmlElementToAvoid;
    this.particles = new Array(numberOfParticles).fill("").map(() => {
      return new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 20,
        Math.random() * (0.7 - 0.3) + 0.3,
        -0.5 + Math.random(),
        -0.5 + Math.random(),
        canvas,
        context,
        htmlElementToAvoid
      );
    });

    this.init();
  }

  init() {
    this.particles.forEach((particle) => particle.create());
    this.animate();
  }

  animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach((particle) => particle.animate());

    this.animationRequestFrameId = requestAnimationFrame(() => this.animate());
  }

  getRequestFrameId() {
    return this.animationRequestFrameId;
  }

  updateOnReSize() {
    this.canvas.width = document.body.scrollWidth;
    this.canvas.height = window.innerHeight;
  }
}
