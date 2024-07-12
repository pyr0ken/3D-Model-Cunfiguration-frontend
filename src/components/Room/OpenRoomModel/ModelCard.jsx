import { usePubSub } from "@videosdk.live/react-sdk";
import { useRef, useState } from "react";
import { IoCube } from "react-icons/io5";
import useAddRoomModel from "../../../hooks/room/useAddRoomModel";
import useGetAllRoomModels from "../../../hooks/room/useGetALlRoomModels";
import useRoomStore from "../../../store/roomStore";
import { relativeTimeFromNow } from "../../Core/utils";

export default function ModelCard({
  id,
  title,
  createdAt,
  isPublicModel = false,
  pointsCount = null,
  displayName = null,
  editModelId = null,
  isEditModel = false,
}) {
  const { isOwner, meetingId, setIsRoomModalOpen } = useRoomStore();

  const { mutate: addRoomModel } = useAddRoomModel();
  const { refetch } = useGetAllRoomModels(meetingId);

  const divRef = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  // VideoSdk PubSub for open model
  const { publish } = usePubSub("MODEL");

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handleClickModel = () => {
    let data = {
      model_id: id,
      meeting_id: meetingId,
    };

    if (isEditModel) {
      data.edit_model_id = editModelId;
    }

    if (isOwner) {
      addRoomModel(data, {
        onSuccess: () => {
          refetch();
          publish("New Model Open", { persist: true });
        },
        onError: (err) => console.log(err),
      });
      refetch();
    }
    setIsRoomModalOpen(false);
  };

  return (
    <div
      ref={divRef}
      onClick={handleClickModel}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative mt-4 max-w-md cursor-pointer overflow-hidden rounded-xl border border-neutral-800 bg-gradient-to-r from-neutral-900 to-neutral-950 px-5 py-10 text-center shadow-2xl"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.06), transparent 40%)`,
        }}
      />
      <span className="mb-4 inline-flex items-center justify-center rounded-md bg-[#007BFF] p-3 shadow-lg">
        <IoCube className="h-10 w-10 text-white" />
      </span>
      <div className="flex flex-col gap-3">
        <p className="font-medium tracking-tight text-gray-200">
          {isEditModel ? displayName : title}
        </p>
        {pointsCount && (
          <p className="text-gray-400">
            نقطه ها :‌ <strong className="text-white">{pointsCount}</strong>
          </p>
        )}
        {!isPublicModel && (
          <h3 className="text-sm text-gray-300">
            {relativeTimeFromNow(createdAt)}
          </h3>
        )}
      </div>
    </div>
  );
}
