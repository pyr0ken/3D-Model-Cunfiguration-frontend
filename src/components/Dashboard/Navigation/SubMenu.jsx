import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function SubMenu({ data }) {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const handleIconClick = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      <li
        className="flex cursor-pointer place-items-center gap-3  rounded-lg stroke-neutral-400 p-2 text-neutral-400 transition-colors duration-100 hover:bg-leva-3/30 hover:stroke-neutral-100 hover:text-neutral-100"
        onClick={handleIconClick}
      >
        <data.icon className="h-8 w-8 min-w-8" />
        <p className="w-full overflow-x-hidden whitespace-nowrap font-poppins tracking-wide text-inherit">
          {data.name}
        </p>
        <IoIosArrowDown
          className={` ${subMenuOpen && "rotate-180"} size-7 duration-200`}
        />
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex h-0 flex-col overflow-hidden pl-14 text-sm font-normal "
      >
        {data.menus?.map((menu) => (
          <li
            key={menu}
            className="p-2 text-neutral-400 transition-colors duration-100 hover:bg-neutral-700/30 hover:text-neutral-100"
          >
            <Link to="" className="">
              {menu}
            </Link>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
