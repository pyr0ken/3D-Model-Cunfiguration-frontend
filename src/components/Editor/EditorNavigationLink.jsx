import { Link } from "react-router-dom";

export default function EditorNavigationLink({ children, name, link }) {
  return (
    <Link
      to={link}
      title={name}
      className="flex cursor-pointer place-items-center gap-3 rounded-lg stroke-neutral-400 p-2 text-neutral-400 transition-colors duration-100 hover:bg-leva-3/30 hover:stroke-neutral-100 hover:text-neutral-100"
    >
      {children}
      <div className="flex w-full place-items-center justify-start overflow-auto">
        <p className="w-full truncate whitespace-nowrap text-inherit">{name}</p>
      </div>
    </Link>
  );
}
