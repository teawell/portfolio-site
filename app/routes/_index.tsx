import { json, redirect, type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { About } from "~/components/About";
import { Contact } from "~/components/Contact";
import { Hero } from "~/components/Hero";
import { Nav } from "~/components/Nav";
import { Work } from "~/components/Work";

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
      <About />
      <Work />
      <Contact />
    </div>
  );
}
