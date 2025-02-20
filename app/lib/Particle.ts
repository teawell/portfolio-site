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
  Deferred,
}

export class Particle {
  private x: number;
  private y: number;
  private radius: number;
  private fade: number;
  private xSpeed: number;
  private ySpeed: number;
  private parent: ParticleContainer;
  private nextCollision: number = 0;
  private nextCollisionAxis: CollisionAxis = CollisionAxis.Deferred;

  private isColliding(boxElement: HTMLElement) {
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

  private calculateMovesTillScreenCollision(
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

  private calculateCanvasEdgeCollision() {
    const canvas = this.parent.getCanvas();
    const nextVerticalCollision = this.calculateMovesTillScreenCollision(
      this.y,
      this.ySpeed,
      0,
      canvas.clientHeight
    );
    const nextHorizontalCollision = this.calculateMovesTillScreenCollision(
      this.x,
      this.xSpeed,
      0,
      canvas.clientWidth
    );

    if (
      nextVerticalCollision.nextCollision ===
      nextHorizontalCollision.nextCollision
    ) {
      // Check which of the corners will be hit
      if (
        nextVerticalCollision.positiveAxis &&
        nextHorizontalCollision.positiveAxis
      ) {
        return {
          nextCollision: nextVerticalCollision.nextCollision,
          nextCollisionAxis: CollisionAxis.BottomRight,
        };
      } else if (
        nextVerticalCollision.positiveAxis &&
        !nextHorizontalCollision.positiveAxis
      ) {
        return {
          nextCollision: nextVerticalCollision.nextCollision,
          nextCollisionAxis: CollisionAxis.BottomLeft,
        };
      } else if (
        !nextVerticalCollision.positiveAxis &&
        nextHorizontalCollision.positiveAxis
      ) {
        return {
          nextCollision: nextVerticalCollision.nextCollision,
          nextCollisionAxis: CollisionAxis.TopRight,
        };
      } else {
        return {
          nextCollision: nextVerticalCollision.nextCollision,
          nextCollisionAxis: CollisionAxis.TopLeft,
        };
      }
    } else if (
      nextVerticalCollision.nextCollision <
      nextHorizontalCollision.nextCollision
    ) {
      return {
        nextCollision: nextVerticalCollision.nextCollision,
        nextCollisionAxis: nextVerticalCollision.positiveAxis
          ? CollisionAxis.Bottom
          : CollisionAxis.Top,
      };
    } else {
      return {
        nextCollision: nextHorizontalCollision.nextCollision,
        nextCollisionAxis: nextVerticalCollision.positiveAxis
          ? CollisionAxis.Right
          : CollisionAxis.Left,
      };
    }
  }

  private calculateMovesTillBoxCollision(
    coord: number,
    speed: number,
    boxCoord: number,
    boxIsAhead: boolean
  ) {
    const absSpeed = Math.abs(speed);

    const boxIsBehindCollision =
      Math.floor((coord - this.radius - boxCoord) / absSpeed) + 1;
    const boxIsAheadCollision =
      Math.floor((boxCoord - (coord + this.radius - 1)) / absSpeed) + 1;

    const nextCollision = boxIsAhead
      ? boxIsAheadCollision
      : boxIsBehindCollision;
    return nextCollision < 0 ? 0 : nextCollision;
  }

  private calculateHtmlCollision() {
    const htmlElementsToAvoid = this.parent.getHtmlElementsToAvoid();
    const htmlCollision = htmlElementsToAvoid.map((element) => {
      const bounding = element.getBoundingClientRect();

      const isWithinBoxVertically =
        (this.y + this.radius + this.ySpeed > bounding.top &&
          this.y < bounding.bottom) ||
        (this.y - this.radius + this.ySpeed < bounding.bottom &&
          this.y > bounding.top);
      const isWithinBoxHorizontally =
        (this.x + this.radius + this.xSpeed > bounding.left &&
          this.x < bounding.right) ||
        (this.x - this.radius + this.xSpeed < bounding.right &&
          this.x > bounding.left);

      if (isWithinBoxHorizontally && isWithinBoxVertically) {
        const movesAheadToLook = 20;
        // Workout if collision will still happen on each axis after moving
        const willBeWithinBoxVertically =
          (this.y + this.radius + this.ySpeed * movesAheadToLook >
            bounding.top &&
            this.y < bounding.bottom) ||
          (this.y - this.radius + this.ySpeed * movesAheadToLook <
            bounding.bottom &&
            this.y > bounding.top);

        const willBeWithinBoxVerticallyIfReversed =
          (this.y + this.radius + this.ySpeed * -movesAheadToLook >
            bounding.top &&
            this.y < bounding.bottom) ||
          (this.y - this.radius + this.ySpeed * -movesAheadToLook <
            bounding.bottom &&
            this.y > bounding.top);

        const willBeWithinBoxHorizontally =
          (this.x + this.radius + this.xSpeed * movesAheadToLook >
            bounding.left &&
            this.x < bounding.right) ||
          (this.x - this.radius + this.xSpeed * movesAheadToLook <
            bounding.right &&
            this.x > bounding.left);

        const willBeWithinBoxHorizontallyIfReversed =
          (this.x + this.radius + this.xSpeed * -movesAheadToLook >
            bounding.left &&
            this.x < bounding.right) ||
          (this.x - this.radius + this.xSpeed * -movesAheadToLook <
            bounding.right &&
            this.x > bounding.left);

        // Checking whether changing direction will prevent collision
        if (
          willBeWithinBoxHorizontally &&
          !willBeWithinBoxHorizontallyIfReversed &&
          willBeWithinBoxVertically &&
          !willBeWithinBoxVerticallyIfReversed
        ) {
          return {
            nextCollision: 0,
            nextCollisionAxis: CollisionAxis.TopRight,
          };
        } else if (
          willBeWithinBoxHorizontally &&
          !willBeWithinBoxHorizontallyIfReversed
        ) {
          return {
            nextCollision: 0,
            nextCollisionAxis: CollisionAxis.Right,
          };
        } else if (
          willBeWithinBoxVertically &&
          !willBeWithinBoxVerticallyIfReversed
        ) {
          return {
            nextCollision: 0,
            nextCollisionAxis: CollisionAxis.Top,
          };
        }
      }
      // If it isn't within the bounds, we look to when it next might be

      const particleIsToTheLeft = this.x + this.radius < bounding.left;
      // Get horizontal collision, will be 0 if colliding
      const nextHorizontalCollision = isWithinBoxHorizontally
        ? 0
        : this.calculateMovesTillBoxCollision(
            this.x,
            this.xSpeed,
            particleIsToTheLeft ? bounding.left : bounding.right,
            particleIsToTheLeft
          );

      const particleIsAbove = this.y + this.radius < bounding.top;
      // Get vertical collision, will be 0 if colliding
      const nextVerticalCollision = isWithinBoxVertically
        ? 0
        : this.calculateMovesTillBoxCollision(
            this.y,
            this.ySpeed,
            particleIsAbove ? bounding.top : bounding.bottom,
            particleIsAbove
          );

      // We don't want to choose a 0 value
      const horizontalValue =
        nextHorizontalCollision === 0
          ? nextVerticalCollision
          : nextHorizontalCollision;
      const verticalValue =
        nextVerticalCollision === 0
          ? nextHorizontalCollision
          : nextVerticalCollision;

      return {
        nextCollision:
          horizontalValue < verticalValue ? horizontalValue : verticalValue,
        nextCollisionAxis: CollisionAxis.Deferred,
      };
    });

    // Order them based on distance to collision
    const sortedHtmlCollision = htmlCollision.sort(
      (a, b) => a.nextCollision - b.nextCollision
    );

    // Filter to collisions that we know will happen
    const notDeferred = sortedHtmlCollision.filter(
      (collision) => collision.nextCollisionAxis !== CollisionAxis.Deferred
    );

    if (notDeferred.length > 0) {
      return notDeferred[0];
    } else {
      return sortedHtmlCollision[0];
    }
  }

  private calculateNextCollision() {
    const edgeCollision = this.calculateCanvasEdgeCollision();
    const htmlCollision = this.calculateHtmlCollision();

    if (
      htmlCollision.nextCollision >= 0 &&
      htmlCollision.nextCollision < edgeCollision.nextCollision
    ) {
      this.nextCollision = htmlCollision.nextCollision;
      this.nextCollisionAxis = htmlCollision.nextCollisionAxis;
    } else {
      this.nextCollision = edgeCollision.nextCollision;
      this.nextCollisionAxis = edgeCollision.nextCollisionAxis;
    }
  }

  animate() {
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
        case CollisionAxis.Deferred:
          // First run or deferring so skip actions
          break;
        default:
          const failsafe: never = this.nextCollisionAxis;
          console.error("Unhandled collision", failsafe);
          break;
      }

      this.x += this.xSpeed;
      this.y += this.ySpeed;
      this.create();

      this.calculateNextCollision();
    } else {
      this.nextCollision -= 1;

      this.x += this.xSpeed;
      this.y += this.ySpeed;
      this.create();
    }
  }
}
