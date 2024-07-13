import { XMarkIcon } from "@heroicons/react/24/outline";
import { ScrollShadow } from "@nextui-org/react";
import { motion } from "framer-motion";
import { RiDeleteBin6Line } from "react-icons/ri";
import useDeletePoint from "../../../hooks/model/useDeletePoint";
import usePoints from "../../../hooks/model/usePoints";
import useEditorStore from "../../../store/editorStore";
import { showAlert } from "../../Core/utils";
import { variants } from "./utils";

const Points = ({ isOpen, setSelectedTab }) => {
  const { selectedModel } = useEditorStore();

  const {
    data: points,
    isLoading,
    isError,
    refetch,
  } = usePoints(selectedModel?.id);
  const { mutate: deletePoint } = useDeletePoint();

  const handleDeletePoint = (pointId) => {
    deletePoint(
      {
        edit_model_id: selectedModel.id,
        point_id: pointId,
      },
      {
        onSuccess: (res) => {
          showAlert("info", "نقطه مورد نظر با موفقیت حذف شد");
          refetch();
        },
        onError: (err) => console.log(err),
      },
    );
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
      className={`absolute z-20 mr-0 flex h-full w-72 flex-col gap-8 rounded-[3rem] bg-gradient-to-b from-leva-1/70 to-leva-2/70 text-neutral-400 ${
        isOpen
          ? "transition-right right-[16.5rem]"
          : "transition-right right-24"
      } border-r border-neutral-800 p-5`}
    >
      <div className="flex w-full flex-row place-items-center justify-between">
        <h1 className="text-lg tracking-wide">نقطه ها</h1>
        <button onClick={() => setSelectedTab(null)}>
          <XMarkIcon className="w-8 stroke-neutral-400" />
        </button>
      </div>
      <ScrollShadow hideScrollBar>
        <div className="no-scrollbar mb-2 flex flex-col gap-y-5 overflow-y-auto text-white">
          {!isLoading && !isError ? (
            points.map((point, index) => (
              <div
                key={index}
                className="relative flex flex-col gap-y-3 rounded-md bg-blue-300/20 p-2 text-center"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-5 w-5 justify-center rounded-full"
                    style={{ backgroundColor: point.color }}
                  >
                    {index + 1}
                  </span>
                  <span
                    onClick={() => handleDeletePoint(point.id)}
                    className="flex cursor-pointer items-center rounded-full bg-red-500 p-1"
                  >
                    <RiDeleteBin6Line className="h-5 min-w-4" />
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-between overflow-x-hidden gap-x-4">
                    <strong>یادداشت :</strong>
                    <span className="text-right">
                      {point.note ? point.note : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <strong>اندازه :</strong>
                    <span>{Math.round(point.radius * 100) / 100}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">هنوز هیچ نقطه ای اضافه نشده است. همین الان میتوانید با نگه داشتن کنترل(ctrl) و کلیک چپ روی مدل یه نقظه به آن اضافه کنید.</p>
          )}
        </div>
      </ScrollShadow>
    </motion.nav>
  );
};

export default Points;
