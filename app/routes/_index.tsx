import type { MetaFunction } from "@remix-run/node";
import { ArrowUp } from "~/components/svgs/ArrowUp";

export const meta: MetaFunction = () => {
  return [
    { title: "Jon Teawell | Frontend web developer" },
    { name: "description", content: "Jon Teawell | Frontend web developer" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9 text-center">
          <h1 className="text-5xl/snug mb-4 text-gray-200 tracking-wider">
            <div>
              Hello, I&apos;m <span className="text-orange-600">Jon</span>.
            </div>
            <div>I&apos;m a frontend web developer.</div>
          </h1>
          <button className="text-orange-600 flex text-2xl justify-center items-center border-solid border-2 border-orange-600 py-2 px-6 rounded-md hover:border-orange-500 hover:text-orange-500 group transition">
            <p className="mr-2">View my work</p>
            <ArrowUp className="fill-orange-600 rotate-90 group-hover:rotate-180 group-hover:fill-orange-500 transition" />
          </button>
        </header>
      </div>
    </div>
  );
}
