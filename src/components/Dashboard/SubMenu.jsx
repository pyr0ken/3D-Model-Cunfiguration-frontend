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
        className="flex p-2 rounded cursor-pointer  hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100"
        onClick={handleIconClick}
      >
        <data.icon className="min-w-8 w-8 h-8" />
        <p className="text-inherit font-poppins overflow-x-hidden whitespace-nowrap tracking-wide w-full">
          {data.name}
        </p>
        <IoIosArrowDown
          className={` ${subMenuOpen && "rotate-180"} duration-200 size-7`}
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
        className="flex h-0 flex-col pl-14 text-sm font-normal overflow-hidden "
      >
        {data.menus?.map((menu) => (
          <li
            key={menu}
            className="text-neutral-400 p-2 hover:text-neutral-100 hover:bg-neutral-700/30 transition-colors duration-100"
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
