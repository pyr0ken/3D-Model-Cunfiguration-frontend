import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import NavigationLinkDash from "./NavigationLinkDash";
import {
  IoHomeOutline,
  IoChatboxEllipsesOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import {
  MdOutlineSpaceDashboard,
  MdOutlineCastConnected,
} from "react-icons/md";
import { IoCubeOutline } from "react-icons/io5";
import { IoStatsChartOutline } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import SubMenu from "./SubMenu";

const subMenusList = [
  {
    name: "build",
    icon: RiBuilding3Line,
    menus: ["auth", "app settings", "stroage", "hosting"],
  },
  {
    name: "analytics",
    icon: TbReportAnalytics,
    menus: ["dashboard", "realtime", "events"],
  },
];

export default function NavigationDash() {
  return (
    <>
      <nav className="bg-leva-1 rounded-tr-[3rem] rounded-br-[3rem] flex flex-col w-[17rem] z-20 gap-20 py-5 px-5 absolute top-0 left-0 h-full overflow-auto shadow shadow-neutral-600">
        <div className="flex flex-row w-full justify-center place-items-center">
          <svg
            className="h-[5rem]"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 58 58"
            xml:space="preserve"
          >
            <g>
              <polygon
                style={{ fill: "#26B99A" }}
                points="29,58 3,45 3,13 29,26 	"
              />
              <polygon
                style={{ fill: "#556080" }}
                points="29,58 55,45 55,13 29,26 	"
              />
              <polygon
                style={{ fill: "#434C6D" }}
                points="3,13 28,0 55,13 29,26 	"
              />
            </g>
          </svg>
        </div>
        <div className="flex flex-col gap-5">
          <NavigationLinkDash name="Home" link={"/"}>
            <IoHomeOutline className="min-w-8 w-8 h-8" />
          </NavigationLinkDash>
          <hr class="h-1 bg-leva-3/35 border-0 rounded" />
          <NavigationLinkDash name="Main Page">
            <IoStatsChartOutline className="min-w-8 w-8 h-8" />
          </NavigationLinkDash>
          <NavigationLinkDash name="Models">
            <IoCubeOutline className="min-w-8 w-8 h-8" />
          </NavigationLinkDash>
          <NavigationLinkDash name="Settings">
            <IoSettingsOutline className="min-w-8 w-8 h-8" />
          </NavigationLinkDash>
          {subMenusList?.map((menu) => (
            <div key={menu.name}>
              <SubMenu data={menu} />
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
