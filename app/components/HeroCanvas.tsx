import { useRef, useEffect, RefObject } from "react";
import { canvasParticles } from "~/lib/canvasParticles";

type Props = {
  areasToAvoidRefs?: RefObject<HTMLElement>[];
};

export const HeroCanvas = ({ areasToAvoidRefs, ...props }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const animationRequestFrameId = canvasParticles(
          canvas,
          context,
          areasToAvoidRefs || []
        );

        return () => {
          cancelAnimationFrame(animationRequestFrameId);
        };
      }
    }
  }, [areasToAvoidRefs, canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      {...props}
      className="absolute top-0 bottom-0 left-0 right-0 h-full w-full  bg-gradient-to-t from-sky-900  via-slate-800 via-40% to-gray-900"
    />
  );
};
