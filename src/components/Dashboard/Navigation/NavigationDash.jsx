import { FaVideo } from "react-icons/fa";
import {
  IoCubeOutline,
  IoHomeOutline,
  IoStatsChartOutline,
} from "react-icons/io5";
import { PiShareNetworkDuotone } from "react-icons/pi";
import Logo from "../../Core/Logo";
import NavigationLinkDash from "./NavigationLinkDash";

export default function NavigationDash() {
  return (
    <>
      <nav className="no-scrollbar flex h-full min-w-[17rem] flex-col gap-20 overflow-auto rounded-bl-[3rem] rounded-tl-[3rem] bg-gradient-to-b from-neutral-900 to-leva-2 px-5 py-5 shadow shadow-neutral-600">
        <div className="flex w-full flex-row place-items-center justify-center">
          <Logo className="h-[5rem]" />
        </div>
        <div className="flex flex-col gap-5">
          <NavigationLinkDash name="صفحه اصلی" link={"/"}>
            <IoHomeOutline className="h-8 w-8 min-w-8" />
          </NavigationLinkDash>
          <hr className="h-1 rounded border-0 bg-leva-3/35" />
          <NavigationLinkDash name="گزارش" link={"/dashboard/"}>
            <IoStatsChartOutline className="h-8 w-8 min-w-8" />
          </NavigationLinkDash>
          <NavigationLinkDash name="جلسات" link={"/dashboard/rooms/"}>
            <PiShareNetworkDuotone className="h-8 w-8 min-w-8" />
          </NavigationLinkDash>
          <NavigationLinkDash
            name="مدل های سه بعدی"
            link={"/dashboard/models/"}
          >
            <IoCubeOutline className="h-8 w-8 min-w-8" />
          </NavigationLinkDash>
          <a href="/help-video.mp4" target="_blank">
            <div className="flex cursor-pointer place-items-center gap-3 rounded-lg stroke-neutral-400 p-2 text-neutral-400 transition-colors duration-100 hover:bg-leva-3/30 hover:stroke-neutral-100 hover:text-neutral-100">
              <FaVideo className="h-8 w-8 min-w-8" />
              <p> ویدیوی راهنما</p>
            </div>
          </a>
        </div>
      </nav>
    </>
  );
}
