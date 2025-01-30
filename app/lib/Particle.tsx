export class Particle {
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
    const box = boxElement.getBoundingClientRect();
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
      const collidingItemBox = collidingItem.getBoundingClientRect();
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

  updateOnReSize(
    canvas: HTMLCanvasElement,
    boundingBoxesToAvoid: HTMLElement[]
  ) {
    this.canvas = canvas;
    this.boundingBoxesToAvoid = boundingBoxesToAvoid;
  }
}
