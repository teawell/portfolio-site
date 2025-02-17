import { ParticleContainer } from "./ParticleContainer";

export class Particle {
  x: number;
  y: number;
  radius: number;
  fade: number;
  xSpeed: number;
  ySpeed: number;
  parent: ParticleContainer;

  isColliding(boxElement: HTMLElement) {
    const box = boxElement.getBoundingClientRect();
    const isWithinVerticalSpace =
      this.y > box.top - this.radius && this.y < box.bottom + this.radius;
    const isWithinHorizontalSpace =
      this.x > box.left - this.radius && this.x < box.right + this.radius;

    return isWithinHorizontalSpace && isWithinVerticalSpace;
  }

  constructor(
    x: number,
    y: number,
    radius: number,
    fade: number,
    xSpeed: number,
    ySpeed: number,
    parent: ParticleContainer
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fade = fade;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.parent = parent;

    const canvas = this.parent.getCanvas();
    const htmlElementsToAvoid = this.parent.getHtmlElementsToAvoid();

    const regenerateIfCollision = () => {
      const isColliding = htmlElementsToAvoid.some((box) =>
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
    const context = this.parent.getContext();
    context.filter = `blur(1px)`;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(0,150,256,${this.fade})`;
    context.fill();
    context.closePath();
  }

  animate() {
    const canvas = this.parent.getCanvas();
    const htmlElementsToAvoid = this.parent.getHtmlElementsToAvoid();

    // Check for canvas boundaries
    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.ySpeed = -this.ySpeed;
    } else if (
      this.x - this.radius < 0 ||
      this.x + this.radius > canvas.width
    ) {
      this.xSpeed = -this.xSpeed;
    }

    // Check for collision with HTML elements
    const collidingItem = htmlElementsToAvoid.find((box) =>
      this.isColliding(box)
    );

    if (collidingItem) {
      const collidingItemBox = collidingItem.getBoundingClientRect();
      // Check whether a change of vertical/horizontal direction would prevent collision, if so do it
      if (
        this.y - this.ySpeed < collidingItemBox.top - this.radius ||
        this.y - this.ySpeed > collidingItemBox.bottom + this.radius
      ) {
        this.ySpeed = -this.ySpeed;
      } else if (
        this.x - this.xSpeed < collidingItemBox.left - this.radius ||
        this.x - this.xSpeed > collidingItemBox.right + this.radius
      ) {
        this.xSpeed = -this.xSpeed;
      }
    }

    // Update speed
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.create();
  }
}
