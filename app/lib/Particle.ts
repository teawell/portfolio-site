import { ParticleContainer } from "./ParticleContainer";

enum CollisionAxis {
  Top,
  TopRight,
  Right,
  BottomRight,
  Bottom,
  BottomLeft,
  Left,
  TopLeft,
}

export class Particle {
  x: number;
  y: number;
  radius: number;
  fade: number;
  xSpeed: number;
  ySpeed: number;
  parent: ParticleContainer;
  nextCollision: number = 0;
  nextCollisionAxis?: CollisionAxis;

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

  calculateMovesTillCollision(
    coord: number,
    speed: number,
    minCoord: number,
    maxCoord: number
  ) {
    const absSpeed = Math.abs(speed);

    const nextCollisionAtMin =
      Math.floor((coord - this.radius - minCoord) / absSpeed) + 1;
    const nextCollisionAtMax =
      Math.floor((maxCoord - (coord + this.radius - 1)) / absSpeed) + 1;

    const nextCollision = speed < 0 ? nextCollisionAtMin : nextCollisionAtMax;
    return { nextCollision, positiveAxis: speed > 0 };
  }

  calculateNextCollision() {
    const canvas = this.parent.getCanvas();
    const htmlElementsToAvoid = this.parent.getHtmlElementsToAvoid();
    const elementBoundingBoxes = htmlElementsToAvoid.map((element) =>
      element.getBoundingClientRect()
    );

    const nextVerticalCollision = this.calculateMovesTillCollision(
      this.y,
      this.ySpeed,
      0,
      canvas.clientHeight
    );
    const nextHorizontalCollision = this.calculateMovesTillCollision(
      this.x,
      this.xSpeed,
      0,
      canvas.clientWidth
    );    

    if (
      nextVerticalCollision.nextCollision ===
      nextHorizontalCollision.nextCollision
    ) {
      this.nextCollision = nextVerticalCollision.nextCollision;
      // TODO: case statement for all possible options
    } else if (
      nextVerticalCollision.nextCollision <
      nextHorizontalCollision.nextCollision
    ) {
      this.nextCollision = nextVerticalCollision.nextCollision;
      this.nextCollisionAxis = nextVerticalCollision.positiveAxis
        ? CollisionAxis.Bottom
        : CollisionAxis.Top;
    } else {
      this.nextCollision = nextHorizontalCollision.nextCollision;
      this.nextCollisionAxis = nextHorizontalCollision.positiveAxis
        ? CollisionAxis.Right
        : CollisionAxis.Left;
    }
 }

  animate() {
    const canvas = this.parent.getCanvas();
    const htmlElementsToAvoid = this.parent.getHtmlElementsToAvoid();

    if (this.nextCollision === 0) {
      switch (this.nextCollisionAxis) {
        case CollisionAxis.Bottom:
        case CollisionAxis.Top:
          this.ySpeed = -this.ySpeed;
          break;
        case CollisionAxis.BottomLeft:
        case CollisionAxis.BottomRight:
        case CollisionAxis.TopLeft:
        case CollisionAxis.TopRight:
          this.ySpeed = -this.ySpeed;
          this.xSpeed = -this.xSpeed;
          break;
        case CollisionAxis.Left:
        case CollisionAxis.Right:
          this.xSpeed = -this.xSpeed;
          break;
        case undefined:
          // First run so skip actions
          break;
        default:
          const failsafe: never = this.nextCollisionAxis;
          console.error("Unhandled collision", failsafe);
          break;
      }

      this.x += this.xSpeed;
      this.y += this.ySpeed;
      this.create();
      // Check for canvas boundaries and update speed
      // if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      //   this.ySpeed = -this.ySpeed;
      // } else if (
      //   this.x - this.radius < 0 ||
      //   this.x + this.radius > canvas.width
      // ) {
      //   this.xSpeed = -this.xSpeed;
      // }

      this.calculateNextCollision();
    } else {
      // console.log("collision", this.nextCollision);


      this.nextCollision -= 1;
      
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      this.create();
    }

    // Check for canvas boundaries
    // if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
    //   this.ySpeed = -this.ySpeed;
    // } else if (
    //   this.x - this.radius < 0 ||
    //   this.x + this.radius > canvas.width
    // ) {
    //   this.xSpeed = -this.xSpeed;
    // }

    // Check for collision with HTML elements
    // const collidingItem = htmlElementsToAvoid.find((box) =>
    //   this.isColliding(box)
    // );

    // if (collidingItem) {
    //   const collidingItemBox = collidingItem.getBoundingClientRect();
    //   // Check whether a change of vertical/horizontal direction would prevent collision, if so do it
    //   if (
    //     this.y - this.ySpeed < collidingItemBox.top - this.radius ||
    //     this.y - this.ySpeed > collidingItemBox.bottom + this.radius
    //   ) {
    //     this.ySpeed = -this.ySpeed;
    //   } else if (
    //     this.x - this.xSpeed < collidingItemBox.left - this.radius ||
    //     this.x - this.xSpeed > collidingItemBox.right + this.radius
    //   ) {
    //     this.xSpeed = -this.xSpeed;
    //   }
    // }

    // // Update speed
    // this.x += this.xSpeed;
    // this.y += this.ySpeed;
    // this.create();
  }
}
