import { XMarkIcon } from "@heroicons/react/24/outline";
import { ScrollShadow } from "@nextui-org/react";
import { motion } from "framer-motion";
import { variants } from "./utils";

export default function Help({ isOpen, setSelectedTab }) {
  return (
    <motion.nav
      variants={variants}
      initial="close"
      animate="open"
      exit="close"
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      className={`absolute z-10 ml-0 flex h-full w-80 flex-col gap-8 rounded-[3rem] bg-gradient-to-b from-leva-1/70 to-leva-2/70 text-neutral-400 ${
        isOpen
          ? "transition-right right-[16.5rem]"
          : "transition-right right-24"
      } border-r border-neutral-800 p-5`}
    >
      <div className="flex w-full flex-row place-items-center justify-between">
        <h1 className="text-lg tracking-wide">راهنما</h1>
        <button onClick={() => setSelectedTab(null)}>
          <XMarkIcon className="w-8 stroke-neutral-400" />
        </button>
      </div>
      <ScrollShadow hideScrollBar>
        <div className="no-scrollbar flex flex-col gap-y-10 overflow-y-scroll">
          <div className="flex flex-col gap-y-3 text-white">
            <p className="text-xl"> کار با مدل </p>
            <div className="flex flex-col rounded-md bg-leva-3/50 p-4">
              <p className="font-semibold">کنترل(ctrl) + کلیک چپ روی مدل :</p>
              <p className="text-center">افزودن نقطه</p>
            </div>
            <div className="flex flex-col rounded-md bg-leva-3/40 p-4">
              <p className="font-semibold">کلیک راست روی نقطه :</p>
              <p className="text-center">اضافه کردن یادداشت به نقطه</p>
            </div>
            <div className="flex flex-col rounded-md bg-leva-3/30 p-4">
              <p className="font-semibold">اسکرول کردن با موس :</p>
              <p className="text-center">
                بزرگنمایی و کوچک نمایی مدل (zoom and zoom out)
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-3 mb-3 text-white">
            <p className="text-xl">پنل ابزار سمت چپ</p>
            <div className="flex flex-col rounded-md bg-leva-3/50 p-4">
              <p className="font-semibold">
                بخش Base برای تنظیمات کلی مانند:
              </p>
              <p className="text-right">
                نظارت بر منابع مصرفی(Monitoring)، تنظیمات آیکون زوم (ZoomInIcon
                & ZoomOutIcon)، اتوماتیک چرخیدن مدل (AutoRotate), جابجایی مدل
                (Pan), بارگزاری مجدد مدل (Reload Model){" "}
              </p>
            </div>
            <div className="flex flex-col rounded-md bg-leva-3/40 p-4">
              <p className="font-semibold">
                  بخش Light برای نورپردازی روی مدل :
              </p>
              <p className="text-right">
                نورپزدازی محیط (ambientLight)،‌ نورپردازی جهت دار روی مدل (directionalLight)،‌ نورپردازی در داخل مدل (pointLight)
              </p>
            </div>
            <div className="flex flex-col rounded-md bg-leva-3/30 p-4">
              <p className="font-semibold">
                بخش Model برای تنظیمات مدل مانند:
              </p>
              <p className="text-right">
                          ، گرفتن اسکرین شات از مدل به همراه پوینت ها (Take ScreenShot)،‌ تغییر دادن محور چرخشی مدل(rotationX)
              </p>
            </div>
            <div className="flex flex-col rounded-md bg-leva-3/30 p-4">
              <p className="font-semibold">
                بخش Point برای تنظیمات نقطه ها مانند:
              </p>
              <p className="text-right">
                  نشان دادن شماره نقطه ها روی مدل (pointIndex)،‌ تغییر رنگ نقطه های بعدی (pointColor)، اندازه نقطه ها های بعدی (pointRadius)
              </p>
            </div>
          </div>
        </div>
      </ScrollShadow>
    </motion.nav>
  );
}
