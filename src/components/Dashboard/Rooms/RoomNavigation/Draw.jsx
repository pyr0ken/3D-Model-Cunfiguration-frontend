import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { variants } from "./utils";
import { useRef, useState } from "react";
import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import { Button, Slider } from "@nextui-org/react";
import useRoomStore from "../../../../store/roomStore";

export default function Draw({ selectedProject, isOpen, setSelectedProject }) {
  const canvasRef = useRef();
  const strokeWidthRef = useRef();
  const eraserWidthRef = useRef();

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

  const handleStrokeWidthChange = () => {
    setStrokeWidth(strokeWidthRef.current.value);
  };

  const handleEraserWidthChange = () => {
    setEraserWidth(eraserWidthRef.current.value);
  };

  const handleUndoClick = () => {
    canvasRef.current?.undo();
  };

  const handleRedoClick = () => {
    canvasRef.current?.redo();
  };

  const handleClearClick = () => {
    canvasRef.current?.clearCanvas();
  };

  const handleResetClick = () => {
    canvasRef.current?.resetCanvas();
  };

  const { isOwner } = useRoomStore()
 
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
    // We will be setting the `persist:true` so that all the strokes
    // are available for the participants who have recently joined
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
      className={`absolute z-10 ml-0 flex h-full w-[40rem] flex-col gap-3 rounded-[3rem] bg-gradient-to-b from-leva-1/70 to-leva-2/70 text-neutral-400 ${
        isOpen ? "left-[16.5rem] transition-left" : "left-24 transition-left"
      } border-r border-neutral-800 p-5`}
    >
      <div className="flex w-full flex-row place-items-center justify-between">
        <h1 className="text-lg tracking-wide">{selectedProject}</h1>
        <button onClick={() => setSelectedProject(null)}>
          <XMarkIcon className="w-8 stroke-neutral-400" />
        </button>
      </div>
      <div className="flex flex-col text-white">
        <div className="mb-4 flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex gap-x-1">
              <Button
                color="primary"
                isDisabled={!eraseMode}
                onClick={handlePenClick}
              >
                Pen
              </Button>
              <Button
                color="primary"
                isDisabled={eraseMode}
                onClick={handleEraserClick}
              >
                Eraser
              </Button>
            </div>
            <div className="flex gap-x-1">
              <Button color="primary" onClick={handleUndoClick}>
                Undo
              </Button>
              <Button color="primary" onClick={handleRedoClick}>
                Redo
              </Button>
              <Button color="primary" onClick={handleClearClick}>
                Clear
              </Button>
              <Button color="primary" onClick={handleResetClick}>
                Reset
              </Button>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="strokeWidth" className="text-sm">
              Stroke width
            </label>
            <Slider
              ref={strokeWidthRef}
              isDisabled={eraseMode}
              minValue={1}
              maxValue={20}
              step={1}
              id="strokeWidth"
              defaultValue={strokeWidth}
              onChange={handleStrokeWidthChange}
            />
            <label htmlFor="eraserWidth" className="text-sm">
              Eraser width
            </label>
            <Slider
              ref={eraserWidthRef}
              isDisabled={!eraseMode}
              minValue={1}
              maxValue={20}
              step={1}
              id="eraserWidth"
              defaultValue={eraserWidth}
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
