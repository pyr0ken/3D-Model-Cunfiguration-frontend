import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { usePubSub } from "@videosdk.live/react-sdk";
import { motion } from "framer-motion";
import useDeleteEditModel from "../../../hooks/model/useDeleteEditModel";
import useGetAllRoomModels from "../../../hooks/room/useGetALlRoomModels";
import useUpdateSelectedModel from "../../../hooks/room/useUpdateSelectedModel";
import useRoomStore from "../../../store/roomStore";
import ModelsPopupList from "../OpenRoomModel/ModelsPopupList";
import { variants } from "./utils";
import { RiDeleteBin6Line } from "react-icons/ri";
import useDeleteRoomModel from "../../../hooks/room/useDeleteRoomModel";
import { showAlert } from "../../Core/utils";

export default function Settings({ isOpen, setSelectedTab }) {
  const {
    isOwner,
    meetingId,
    selectedModel,
    isRoomModalOpen,
    setIsRoomModalOpen,
    setSelectedModel,
    setCloseModel,
  } = useRoomStore();

  const {
    data: allModels,
    isLoading,
    refetch,
  } = useGetAllRoomModels(meetingId);
  const { mutate: updateSelectedModel } = useUpdateSelectedModel();
  const { mutate: deleteRoomModel } = useDeleteRoomModel();

  const { publish: selectModel } = usePubSub("SELECT_MODEL", {
    onMessageReceived: () => {
      refetch();
    },
  });

  const { publish: closeModel } = usePubSub("CLOSE_MODEL", {
    onMessageReceived: () => {
      setSelectedModel(null);
    },
  });

  const { publish: deleteModel } = usePubSub("DELETE_MODEL", {
    onMessageReceived: () => {
      refetch();
    },
  });

  const handleCloseModel = () => {
    setSelectedModel(null);
    setCloseModel(true);
    setIsRoomModalOpen(false);
    closeModel("Close Model", { persist: true });
  };

  const handleAddModel = () => {
    setIsRoomModalOpen(true);
  };

  const handleSelectedModel = (editModelId) => {
    updateSelectedModel(
      {
        meeting_id: meetingId,
        edit_model_id: editModelId,
      },
      {
        onSuccess: (res) => {
          setCloseModel(false);
          refetch();
          selectModel("New Select Model", { persist: true });
        },
        onError: (err) => console.log(err),
      },
    );
  };

  const handleDeleteRoomModel = (id) => {
    deleteRoomModel(
      { meeting_id: meetingId, edit_model_id: id },
      {
        onSuccess: (response) => {
          refetch();
          console.log(response);
          showAlert("success", response.data.detail);
          deleteModel("Delete Room Model", { persist: true });
        },
        onError: (error) => {
          if (error.response.status === 400) {
            showAlert("error", error.response?.data?.detail);
          } else {
            showAlert("error", "مشکلی در ارسال اطلاعات پیش آمده است");
          }
        },
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
      className={`absolute z-20 ml-0 flex h-full w-72 flex-col gap-8 rounded-[3rem] bg-gradient-to-b from-leva-1/70 to-leva-2/70 text-neutral-400 ${
        isOpen
          ? "transition-right right-[16.5rem]"
          : "transition-right right-24"
      } border-r border-neutral-800 p-5`}
    >
      <div className="flex w-full flex-row place-items-center justify-between">
        <h1 className="text-lg tracking-wide">تنظیمات مدل ها</h1>
        <button onClick={() => setSelectedTab(null)}>
          <XMarkIcon className="w-8 stroke-neutral-400" />
        </button>
      </div>
      <div className="flex flex-col gap-5 text-white">
        <div className="flex flex-col">
          <p className="mb-4 text-xl font-semibold">لیست مدل های جلسه</p>
          <div className="flex cursor-pointer flex-col gap-y-2 rounded border-r-3">
            {allModels.data.models.length > 0 &&
              allModels.data.models.map((editModel, index) => {
                return (
                  <div className="flex justify-between" key={index}>
                    <p
                      onClick={() =>
                        isOwner ? handleSelectedModel(editModel.id) : {}
                      }
                      className={`${editModel.id === selectedModel?.id ? "bg-leva-3 hover:bg-leva-3" : "hover:bg-leva-3/40"} ${!isOwner && "rounded-l-xl"} flex w-full items-center justify-between p-2 transition-colors`}
                    >
                      {editModel.display_name}
                    </p>
                    {isOwner && (
                      <span
                        onClick={() => handleDeleteRoomModel(editModel.id)}
                        className="flex items-center rounded-l-xl bg-red-500 p-2 transition-colors hover:bg-red-600"
                      >
                        <RiDeleteBin6Line className="size-5" />
                      </span>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        {isOwner && (
          <div className="flex flex-col gap-y-2">
            <Button variant="shadow" onClick={handleAddModel} color="success">
              باز کردن مدل جدید
            </Button>
            {selectedModel && (
              <Button
                variant="shadow"
                onClick={handleCloseModel}
                color="danger"
              >
                بستن مدل فعلی
              </Button>
            )}
          </div>
        )}
      </div>
      <Modal
        isOpen={isRoomModalOpen}
        size="3xl"
        onClose={() => setIsRoomModalOpen(false)}
        placement="top-center"
        className="h-[85vh] overflow-y-auto dark"
      >
        <ModalContent>
          <ModalBody>
            <ModelsPopupList />
          </ModalBody>
        </ModalContent>
      </Modal>
    </motion.nav>
  );
}
