import { type MetaFunction } from "@remix-run/node";
import { AboutSection } from "~/components/AboutSection";
import { ContactSection } from "~/components/ContactSection";
import { HeroSection } from "~/components/HeroSection";
import { Nav } from "~/components/Nav";
import { WorkSection } from "~/components/WorkSection";

export const meta: MetaFunction = () => {
  return [
    { title: "Jon Teawell | Frontend web developer" },
    { name: "description", content: "Jon Teawell | Frontend web developer" },
  ];
};

export default function Index() {
  return (
    <div>
      <HeroSection />
      <Nav />
      <AboutSection />
      <WorkSection />
      <ContactSection />
    </div>
  );
}
