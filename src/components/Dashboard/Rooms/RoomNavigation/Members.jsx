import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useMeeting } from "@videosdk.live/react-sdk";
import MemberConfig from "./MemberConfig";
import { Button } from "@nextui-org/react";
import useRoomStore from "../../../../store/roomStore";
import { copyText, showAlert } from "../../../Core/utils";
import { MdContentCopy } from "react-icons/md";
import useRoomEnd from "../../../../hooks/room/useRoomEnd";
import useRoomLeft from "../../../../hooks/room/useRoomLeft";
import { variants } from "./utils";


export default function Members({
  selectedProject,
  isOpen,
  setSelectedProject,
}) {
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
    showAlert("info", "The room id copied.");
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
        isOpen ? "left-[16.5rem] transition-left" : "left-24 transition-left"
      } border-r border-neutral-800 p-5`}
    >
      <div className="flex w-full flex-row place-items-center justify-between">
        <h1 className="text-lg tracking-wide">{selectedProject}</h1>
        <button onClick={() => setSelectedProject(null)}>
          <XMarkIcon className="w-8 rounded-lg stroke-neutral-400 text-neutral-400 transition-colors duration-100 hover:bg-leva-3/30 hover:stroke-neutral-100 hover:text-neutral-100" />
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
          Room ID: <strong>{meetingId}</strong>
        </Button>
        <Button onClick={() => handleLeaveRoom()} color="warning">
          Leave
        </Button>

        {isOwner && (
          <div className="mb-2 flex gap-x-2">
            <Button
              onClick={() => handleMuteAll()}
              className="flex-1"
              color="primary"
            >
              Mute All
            </Button>
            <Button onClick={() => handleEndRoom()} color="danger">
              End Room
            </Button>
          </div>
        )}

        {[...participants.keys()].map((participantId) => (
          <MemberConfig participantId={participantId} key={participantId} />
        ))}
      </div>
    </motion.nav>
  );
}
