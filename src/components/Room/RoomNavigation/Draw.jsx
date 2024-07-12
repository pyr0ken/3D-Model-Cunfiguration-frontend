import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { variants } from "./utils";
import { useRef, useState } from "react";
import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import { Button, Slider } from "@nextui-org/react";
import useRoomStore from "../../../store/roomStore";

export default function Draw({ isOpen, setSelectedTab }) {
  const canvasRef = useRef();

  const [eraseMode, setEraseMode] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(10);

  const handleEraserClick = () => {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  };

  const handlePenClick = () => {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleStrokeWidthChange = (value) => {
    setStrokeWidth(+value);
  };

  const handleEraserWidthChange = (value) => {
    setEraserWidth(+value);
  };

  const { isOwner } = useRoomStore();

  const { localParticipant } = useMeeting();

  const { publish } = usePubSub("WHITEBOARD", {
    onMessageReceived: (message) => {
      //Check if the stroke is from remote participant only
      if (message.senderId !== localParticipant.id) {
        canvasRef.current.loadPaths(JSON.parse(message.message));
      }
    },
    onOldMessagesReceived: (messages) => {
      messages.map((message) => {
        canvasRef.current.loadPaths(JSON.parse(message.message));
      });
    },
  });

  // This callback from the canvas component will give us the stroke json we need to share
  const onStroke = (stroke, isEraser) => {
    publish(JSON.stringify(stroke), { persist: true });
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
      className={`absolute z-10 mr-0 flex h-full w-[40rem] flex-col gap-3 rounded-[3rem] bg-gradient-to-b from-leva-1/70 to-leva-2/70 text-neutral-400 ${
        isOpen
          ? "transition-right right-[16.5rem]"
          : "transition-right right-24"
      } border-r border-neutral-800 p-5`}
    >
      <div className="flex w-full flex-row place-items-center justify-between">
        <h1 className="text-lg tracking-wide">تخته مجازی</h1>
        <button onClick={() => setSelectedTab(null)}>
          <XMarkIcon className="w-8 stroke-neutral-400" />
        </button>
      </div>
      <div className="flex flex-col text-white">
        <div className="my-5 flex w-full flex-col gap-y-5">
          <div className="flex items-center gap-x-5">
            <Button
              color="primary"
              isDisabled={!eraseMode}
              onClick={handlePenClick}
            >
              مداد
            </Button>
            <Slider
              isDisabled={eraseMode}
              minValue={1}
              maxValue={20}
              showSteps={true}
              step={1}
              value={strokeWidth}
              onChange={handleStrokeWidthChange}
            />
          </div>
          <div className="flex items-center gap-x-5">
            <Button
              color="primary"
              isDisabled={eraseMode}
              onClick={handleEraserClick}
            >
              پاک کن
            </Button>
            <Slider
              isDisabled={!eraseMode}
              minValue={1}
              maxValue={20}
              showSteps={true}
              step={1}
              value={eraserWidth}
              onChange={handleEraserWidthChange}
            />
          </div>
        </div>
        <ReactSketchCanvas
          ref={canvasRef}
          onStroke={onStroke}
          readOnly={!isOwner} //! is not working
          width="100%"
          height="600px"
          backgroundImage="none"
          preserveBackgroundImageAspectRatio="none"
          strokeWidth={strokeWidth}
          eraserWidth={eraserWidth}
          strokeColor={"#000000"}
          canvasColor={"#000000"}
          allowOnlyPointerType="all"
          withViewBox={false}
        />
      </div>
    </motion.nav>
  );
}
