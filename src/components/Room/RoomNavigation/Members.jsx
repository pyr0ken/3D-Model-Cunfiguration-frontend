import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, ScrollShadow } from "@nextui-org/react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { motion } from "framer-motion";
import { MdContentCopy } from "react-icons/md";
import useRoomEnd from "../../../hooks/room/useRoomEnd";
import useRoomLeft from "../../../hooks/room/useRoomLeft";
import useRoomStore from "../../../store/roomStore";
import { copyText, showAlert } from "../../Core/utils";
import MemberConfig from "./MemberConfig";
import { variants } from "./utils";

export default function Members({ isOpen, setSelectedTab }) {
  const { isOwner, meetingId, ownerId } = useRoomStore();

  const { mutate: roomEnd } = useRoomEnd();
  const {} = useRoomLeft();

  const { participants, end, leave } = useMeeting();

  const handleMuteAll = () => {
    [...participants.values()].forEach((participant) => {
      if (participant.metaData.userId !== ownerId) {
        participant.disableMic();
      }
    });
  };

  const handleEndRoom = () => {
    roomEnd({ meeting_id: meetingId });
    end();
  };

  const handleLeaveRoom = () => {
    leave();
  };

  const handleCopyRoomId = () => {
    copyText(meetingId);
    showAlert("success", "آیدی جلسه با موفقیت کپی شد");
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
        <h1 className="text-lg tracking-wide">اعضای جلسه</h1>
        <button onClick={() => setSelectedTab(null)}>
          <XMarkIcon className="w-8 rounded-lg stroke-neutral-400 text-neutral-400 transition-colors duration-100" />
        </button>
      </div>
      <div className="no-scrollbar flex flex-col gap-y-2 overflow-y-auto text-white">
        <Button
          onClick={() => handleCopyRoomId()}
          color="secondary"
          variant="shadow"
          title="Click to copy"
        >
          <MdContentCopy className="h-8 min-w-4" />
          آیدی جلسه: <strong>{meetingId}</strong>
        </Button>
        <Button onClick={() => handleLeaveRoom()} color="warning">
          ترک جلسه
        </Button>

        {isOwner && (
          <div className="mb-2 flex gap-x-2">
            <Button
              onClick={() => handleMuteAll()}
              className="flex-1"
              color="primary"
            >
              بی صدا کردن تمام اعضا
            </Button>
            <Button onClick={() => handleEndRoom()} color="danger">
              پایان جلسه
            </Button>
          </div>
        )}
        <ScrollShadow hideScrollBar>
          {[...participants.keys()].map((participantId) => (
            <MemberConfig participantId={participantId} key={participantId} />
          ))}
        </ScrollShadow>
      </div>
    </motion.nav>
  );
}
