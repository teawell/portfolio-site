import { NavLink, useLocation } from "@remix-run/react";

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
    id: "projects",
    description: "Projects",
  },
  {
    id: "contact",
    description: "Contact",
  },
];

export const Nav = () => {
  const location = useLocation();

  return (
    <nav className="flex flex-row-reverse p-2 bg-gray-900 shadow-lg sticky top-0">
      <ul className="inline-flex text-xl/snug mr-12">
        {navItems.map(({ id, description }) => (
          <li
            className={`mr-8 ${
              location.hash === `#${id}` ? "text-orange-600" : ""
            } hover:text-orange-500`}
            key={id}
          >
            <NavLink to={`#${id}`}>{description}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
