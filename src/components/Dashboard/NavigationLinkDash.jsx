import { Link } from "react-router-dom";

export default function NavigationLinkDash({ children, name, link }) {
  return (
    <Link
      to={link}
      className="flex p-2 rounded cursor-pointer  hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100"
    >
      {children}
      <p className="text-inherit font-poppins overflow-x-hidden whitespace-nowrap tracking-wide">
        {name}
      </p>
    </Link>
  );
}
