import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function NavigationLinkDash({ children, name, link }) {
  const location = useLocation();

  const isActive = location.pathname === link;

  return (
    <Link
      to={link}
      className={`flex cursor-pointer place-items-center gap-3 rounded-lg stroke-neutral-400 p-2 ${isActive ? "text-leva-3" : "text-neutral-400"} transition-colors duration-100 hover:bg-leva-3/30 hover:stroke-neutral-100 hover:text-neutral-100`}
    >
      {children}
      <p className="overflow-x-hidden whitespace-nowrap font-poppins tracking-wide text-inherit">
        {name}
      </p>
    </Link>
  );
}
