import { Section } from "./Section";
import { SectionText } from "./SectionText";
import { SectionTitle } from "./SectionTitle";
import linkedIn from "../images/linkedin.png";
import github from "../images/github.png";
import { Link } from "@remix-run/react";

export const ContactSection = () => (
  <Section id="contact">
    <SectionTitle>Contact</SectionTitle>
    <div className="flex flex-col justify-center items-center">
      <SectionText>
        <p className="text-center mb-1">
          Have a question or want to work together?
        </p>
        <p className="text-center mb-3">
            Reach out on LinkedIn or checkout more of my work on Github.
        </p>
      </SectionText>
      <Link
        to="https://www.linkedin.com/in/jonathan-teawell/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex mb-3"
      >
        <img
          src={linkedIn}
          alt="LinkedIn logo"
          height={25}
          width={25}
          className="mr-2"
        />
        <p className="hover:text-orange-500">LinkedIn</p>
      </Link>
      <Link
        to="https://github.com/teawell"
        target="_blank"
        rel="noopener noreferrer"
        className="flex"
      >
        <img
          src={github}
          alt="Github logo"
          height={25}
          width={25}
          className="mr-2"
        />
        <p className="hover:text-orange-500">Github</p>
      </Link>
    </div>
  </Section>
);
