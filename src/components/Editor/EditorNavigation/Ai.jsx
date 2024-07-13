import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { variants } from "./utils";
import useEditorStore from "../../../store/editorStore";

export default function Ai({ isOpen, setSelectedTab }) {
  const { aiCameraIsOn, setAiCameraIsOn, changeReloadModelKey } =
    useEditorStore();

  const handleHandTracker = () => {
    if (aiCameraIsOn) {
      setAiCameraIsOn(false);
      changeReloadModelKey();
    } else {
      setAiCameraIsOn(true);
    }
  };

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
      className={`absolute z-20 ml-0 flex h-full w-80 flex-col gap-8 rounded-[3rem] bg-gradient-to-b from-leva-1/70 to-leva-2/70 text-neutral-400 ${
        isOpen
          ? "transition-right right-[16.5rem]"
          : "transition-right right-24"
      } border-r border-neutral-800 p-5`}
    >
      <div className="flex w-full flex-row place-items-center justify-between">
        <h1 className="text-lg tracking-wide">هوش مصنوعی</h1>
        <button onClick={() => setSelectedTab(null)}>
          <XMarkIcon className="w-8 stroke-neutral-400" />
        </button>
      </div>
      <div className="no-scrollbar mb-2 flex flex-col gap-y-5 overflow-y-auto text-white">
        <div className="flex flex-col">
          <p className="mb-3 text-center text-xl font-semibold">
            چرخاندن مدل با پردازش تصویر
          </p>
          <Button
            onClick={handleHandTracker}
            variant="shadow"
            color={aiCameraIsOn ? "danger" : "success"}
          >
            {aiCameraIsOn ? "خاموش" : "روشن"}
          </Button>
          <p className="mt-8 text-xl">نحوه کار:</p>
          <p className="mt-2">
            ابتدا دست خود را رو به روی وبکم قرار داده تا انگشت سبابه دست شما
            شناسایی شود و یک نقطه قرمز روی اون قرار بگیرد. سپس با وصل کردن انگشت
            سبابه به انکشت شست آن نقطه قرمز به رنگ زرد در می آید و اکنون
            میتوانید با حرکت به سمت راست یا چپ مدل سه بعدی را بچرخانید.
          </p>
          <p className="mt-8 text-xl">توجه:</p>
          <p className="mt-2">
            اگر موقعیت چرخشی مدل جابجا شد میتوانید روی گزینه خاموش که در بالا
            آمده است کلیک کنید و مدل را دوباره بارگزاری کنید. و تمامی چرخش ها به
            حالت اولیه خود باز میگردد
          </p>
        </div>
      </div>
    </motion.nav>
  );
}
