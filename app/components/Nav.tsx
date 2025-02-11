import { NavLink, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";

type NavItem = {
  id: string;
  description: string;
};
const navItems: NavItem[] = [
  {
    id: "home",
    description: "Home",
  },
  {
    id: "about",
    description: "About",
  },
  {
    id: "work",
    description: "Work",
  },
  {
    id: "contact",
    description: "Contact",
  },
];

export const Nav = () => {
  const location = useLocation();
  const [hash, setHash] = useState("");

  useEffect(() => {
    // Convoluted way of setting the right hash as remix tries to SSR
    // the classes but doesn't update them based on the client hash
    setHash(location.hash);
  }, [location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      const scrollPosition = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 140;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          location.hash = `#${section.id}`
          setHash(`#${section.id}`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  return (
    <nav className="flex p-2 sm:p-6 bg-gray-950 shadow-lg sticky top-0 ">
      <ul className="flex w-full md:w-auto text-m/snug sm:text-xl/snug sm:mr-12 ">
        {navItems.map(({ id, description }) => (
          <li key={id} className="ml-4">
            <NavLink
              className={`${
                hash === `#${id}` ? "text-orange-600" : ""
              } hover:text-orange-500`}
              to={`#${id}`}
            >
              {description}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
