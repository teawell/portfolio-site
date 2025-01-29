class Particle {
  x: number;
  y: number;
  radius: number;
  fade: number;
  xSpeed: number;
  ySpeed: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(
    x: number,
    y: number,
    radius: number,
    fade: number,
    xSpeed: number,
    ySpeed: number,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fade = fade;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.canvas = canvas;
    this.context = context;
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
    if (this.y < 0 || this.y > this.canvas.height) {
      this.ySpeed = -this.ySpeed;
    } else if (this.x < 0 || this.x > this.canvas.width) {
      this.xSpeed = -this.xSpeed;
    }

    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.create();
  }
}

const generateParticles = (
  amount: number,
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
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
      context
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
  context: CanvasRenderingContext2D
) => {
  const cursor = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

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

  //   addEventListener("resize", () => setSize());

  const particlesArray: Particle[] = generateParticles(101, canvas, context);

  setSize(canvas);
  init(particlesArray);
  return animate(particlesArray, canvas, context);
};
