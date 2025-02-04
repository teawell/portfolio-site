import { useRef, useEffect } from "react";
import { initializeParticles } from "~/lib/initializeParticles";
import { ArrowUp } from "./svgs/ArrowUp";
import { NavLink } from "@remix-run/react";

export const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textOneRef = useRef<HTMLDivElement>(null);
  const textTwoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const animationRequestFrameId = initializeParticles(canvas, context, [
          buttonRef,
          textOneRef,
          textTwoRef,
        ]);

        return () => {
          cancelAnimationFrame(animationRequestFrameId);
        };
      }
    }
  }, [canvasRef]);

  return (
    <div
      id="home"
      className="flex h-screen items-center justify-center relative"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 bottom-0 left-0 right-0 h-full w-full  bg-gradient-to-b from-sky-900  via-slate-800 via-40% to-gray-900"
      />
      <div className="flex flex-col items-center relative">
        <header className="flex flex-col items-center gap-9 text-center">
          <h1 className="text-5xl/snug mb-4 tracking-wider">
            <div
              ref={textOneRef}
              className="inline-block animate-fade-right animate-once animate-delay-800"
            >
              Hello, I&apos;m <span className="text-orange-600">Jon</span>.
            </div>
            <div
              ref={textTwoRef}
              className="animate-fade-left animate-once animate-delay-[1200ms]"
            >
              I&apos;m a frontend web developer.
            </div>
          </h1>

          <NavLink
            to="#about"
            className="animate-fade-up animate-once animate-delay-[1600ms] animate-duration-[1400ms]"
          >
            <button
              ref={buttonRef}
              className="text-orange-600 flex text-2xl justify-center items-center border-solid border-2 border-orange-600 py-2 px-6 rounded-md hover:border-orange-500 hover:text-orange-500 group transition"
            >
              <p className="mr-2">Learn more</p>
              <ArrowUp className="fill-orange-600 rotate-90 group-hover:rotate-180 group-hover:fill-orange-500 transition" />
            </button>
          </NavLink>
        </header>
      </div>
    </div>
  );
};
