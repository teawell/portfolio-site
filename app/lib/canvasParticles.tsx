import { RefObject } from "react";

class Particle {
  x: number;
  y: number;
  radius: number;
  fade: number;
  xSpeed: number;
  ySpeed: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  boundingBoxesToAvoid: HTMLElement[];

  isColliding(boxElement: HTMLElement) {
    const box = boxElement.getBoundingClientRect()
    const isWithinVerticalSpace =
      this.y > box.top - this.radius &&
      this.y < box.top + box.height + this.radius;
    const isWithinHorizontalSpace =
      this.x > box.left - this.radius &&
      this.x < box.left + box.width + this.radius;

    return isWithinHorizontalSpace && isWithinVerticalSpace;
  }

  constructor(
    x: number,
    y: number,
    radius: number,
    fade: number,
    xSpeed: number,
    ySpeed: number,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    boundingBoxesToAvoid: HTMLElement[]
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fade = fade;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.canvas = canvas;
    this.context = context;
    this.boundingBoxesToAvoid = boundingBoxesToAvoid;

    const regenerateIfCollision = () => {
      const isColliding = this.boundingBoxesToAvoid.some((box) =>
        this.isColliding(box)
      );

      if (isColliding) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        regenerateIfCollision();
      }
    };
    regenerateIfCollision();
  }

  create() {
    this.context.filter = `blur(1px)`;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fillStyle = `rgba(0,150,256,${this.fade})`;
    this.context.fill();
    this.context.closePath();
  }

  animate() {
    if (this.y - this.radius < 0 || this.y + this.radius > this.canvas.height) {
      this.ySpeed = -this.ySpeed;
    } else if (
      this.x - this.radius < 0 ||
      this.x + this.radius > this.canvas.width
    ) {
      this.xSpeed = -this.xSpeed;
    }

    const collidingItem = this.boundingBoxesToAvoid.find((box) =>
      this.isColliding(box)
    );

    if (collidingItem) {
        const collidingItemBox = collidingItem.getBoundingClientRect()
      // Check whether a change of vertical/horizontal direction would prevent collision, if so do it
      if (
        this.y - this.ySpeed < collidingItemBox.top - this.radius ||
        this.y - this.ySpeed >
        collidingItemBox.top + collidingItemBox.height + this.radius
      ) {
        this.ySpeed = -this.ySpeed;
      } else if (
        this.x - this.xSpeed < collidingItemBox.left - this.radius ||
        this.x - this.xSpeed >
        collidingItemBox.left + collidingItemBox.width + this.radius
      ) {
        this.xSpeed = -this.xSpeed;
      }
    }

    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.create();
  }

  updateOnReSize(canvas: HTMLCanvasElement, boundingBoxesToAvoid: HTMLElement[]) {
    this.canvas = canvas;
    this.boundingBoxesToAvoid = boundingBoxesToAvoid;
  }
}

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

export const canvasParticles = (
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
