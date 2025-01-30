import type { MetaFunction } from "@remix-run/node";
import { Hero } from "~/components/Hero";
import { Nav } from "~/components/Nav";

export const meta: MetaFunction = () => {
  return [
    { title: "Jon Teawell | Frontend web developer" },
    { name: "description", content: "Jon Teawell | Frontend web developer" },
  ];
};

export default function Index() {
  return (
    <div>
      <Hero />
      <Nav />
      <div id="about">About section</div>
      <div id="work">Work section</div>
      <div id="projects">Projects section</div>
      <div id="contact">Contact section</div>
    </div>
  );
}
