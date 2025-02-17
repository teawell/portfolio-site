import { Particle } from "./Particle";

type Props = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  htmlElementsToAvoid: HTMLElement[];
};

export class ParticleContainer {
  private particles: Particle[];
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private htmlElementsToAvoid: HTMLElement[];
  private animationRequestFrameId?: number;
  private isVisible: boolean = false;

  constructor({ canvas, context, htmlElementsToAvoid }: Props) {
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
    this.htmlElementsToAvoid = htmlElementsToAvoid;
    const particlesToProduce = Math.floor(this.canvas.width/10) 
    

    this.particles = new Array(particlesToProduce).fill("").map(() => {
      return new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 20,
        Math.random() * (0.7 - 0.3) + 0.3,
        -0.5 + Math.random(),
        -0.5 + Math.random(),
        this
      );
    });

    this.init();
  }

  private init() {
    this.particles.forEach((particle) => particle.create());
    this.animate();
  }

  private animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach((particle) => particle.animate());

    if (this.isVisible) {
      this.animationRequestFrameId = requestAnimationFrame(() =>
        this.animate()
      );
    }
  }

  getRequestFrameId() {
    return this.animationRequestFrameId;
  }

  updateOnReSize(canvas: HTMLCanvasElement) {
    canvas.width = document.body.scrollWidth;
    canvas.height = window.innerHeight;
    this.canvas = canvas;
  }

  getContext() {
    return this.context;
  }

  getCanvas() {
    return this.canvas;
  }

  getHtmlElementsToAvoid() {
    return this.htmlElementsToAvoid;
  }

  setIsCanvasVisible(isVisible: boolean) {
    this.isVisible = isVisible;

    if (this.isVisible) {
      this.animate();
    }
  }
}
