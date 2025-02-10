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
    description: "About me",
  },
  {
    id: "work",
    description: "Work History",
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

  return (
    <nav className="flex flex-row-reverse p-6 bg-gray-950 shadow-lg sticky top-0 ">
      <ul className="inline-flex text-xl/snug mr-12">
        {navItems.map(({ id, description }) => (
          <li key={id}>
            <NavLink
              className={`mr-8 ${
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
