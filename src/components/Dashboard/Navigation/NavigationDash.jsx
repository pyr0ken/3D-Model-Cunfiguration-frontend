import { CgProfile } from "react-icons/cg";
import {
  IoCubeOutline,
  IoHomeOutline,
  IoSettingsOutline,
  IoStatsChartOutline,
} from "react-icons/io5";
import { PiShareNetworkDuotone } from "react-icons/pi";
import NavigationLinkDash from "./NavigationLinkDash";
import Logo from "../../Core/Logo";

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
          <NavigationLinkDash name="مدل های سه بعدی" link={"/dashboard/models/"}>
            <IoCubeOutline className="h-8 w-8 min-w-8" />
          </NavigationLinkDash>
          <NavigationLinkDash name="پروفایل">
            <CgProfile className="h-8 w-8 min-w-8" />
          </NavigationLinkDash>
        </div>
      </nav>
    </>
  );
}
