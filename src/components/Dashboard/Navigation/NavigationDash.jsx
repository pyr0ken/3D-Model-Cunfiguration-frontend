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
import { CgProfile } from "react-icons/cg";
import { PiShareNetworkDuotone } from "react-icons/pi";
import { IoCubeOutline } from "react-icons/io5";
import { IoStatsChartOutline } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import SubMenu from "./SubMenu";

const subMenusList = [
  {
    name: "test",
    icon: RiBuilding3Line,
    menus: ["auth", "app settings", "stroage", "hosting"],
  },
  {
    name: "test",
    icon: TbReportAnalytics,
    menus: ["dashboard", "realtime", "events"],
  },
];

export default function NavigationDash() {
  return (
    <>
      <nav className="no-scrollbar flex h-full min-w-[17rem] flex-col gap-20 overflow-auto rounded-br-[3rem] rounded-tr-[3rem] bg-gradient-to-b from-neutral-900 to-leva-2 px-5 py-5 shadow shadow-neutral-600">
        <div className="flex w-full flex-row place-items-center justify-center">
          <svg
            className="h-[5rem]"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 58 58"
            xmlSpace="preserve"
          >
            <g>
              <polygon
                style={{ fill: "#007BFF" }}
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
            <IoHomeOutline className="h-8 w-8 min-w-8" />
          </NavigationLinkDash>
          <hr className="h-1 rounded border-0 bg-leva-3/35" />
          <NavigationLinkDash name="Main Page" link={"/dashboard/"}>
            <IoStatsChartOutline className="h-8 w-8 min-w-8" />
          </NavigationLinkDash>
          <NavigationLinkDash name="Rooms" link={"/dashboard/rooms/"}>
            <PiShareNetworkDuotone className="h-8 w-8 min-w-8" />
          </NavigationLinkDash>
          <NavigationLinkDash name="Models" link={"/dashboard/models/"}>
            <IoCubeOutline className="h-8 w-8 min-w-8" />
          </NavigationLinkDash>
          <NavigationLinkDash name="Profile">
            <CgProfile className="h-8 w-8 min-w-8" />
          </NavigationLinkDash>
          <NavigationLinkDash name="Settings">
            <IoSettingsOutline className="h-8 w-8 min-w-8" />
          </NavigationLinkDash>
          {/* {subMenusList?.map((menu) => (
            <div key={menu.name}>
              <SubMenu data={menu} />
            </div>
          ))} */}
        </div>
      </nav>
    </>
  );
}
