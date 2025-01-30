import type { MetaFunction } from "@remix-run/node";
import { Hero } from "~/components/Hero";

export const meta: MetaFunction = () => {
  return [
    { title: "Jon Teawell | Frontend web developer" },
    { name: "description", content: "Jon Teawell | Frontend web developer" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center relative">
      <Hero />
    </div>
  );
}
