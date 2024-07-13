import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import { useEffect } from "react";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { ToastContainer } from "react-toastify";
import useGetAllRoomModels from "../../hooks/room/useGetALlRoomModels";
import useRoomLeft from "../../hooks/room/useRoomLeft";
import useRoomStore from "../../store/roomStore";
import CameraAi from "./CameraAi";
import JoinLoading from "./JoinLoading";
import OpenModel from "./OpenRoomModel/OpenModel";
import Model from "./RoomModel/Model";
import RoomNavigation from "./RoomNavigation";
import RoomStream from "./RoomStream";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Meeting() {
  // Room Store
  const {
    isOwner,
    roomTitle,
    joined,
    meetingId,
    selectedModel,
    closeModel,
    aiCameraIsOn,
    setMeetingId,
    setJoined,
    setRoomId,
    setSelectedModel,
    setCloseModel,
    changeCameraStatus,
  } = useRoomStore();

  // Models Store
  const {
    data: allModels,
    isLoading,
    refetch,
  } = useGetAllRoomModels(meetingId);

  // Left Meet
  const { mutate: roomLeft } = useRoomLeft();

  // VideoSdk meeting config
  const { participants, leave } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined(true);
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      setRoomId(null);
      setMeetingId(null);
      setJoined(false);
    },
    onParticipantJoined: (participant) => {},
    onParticipantLeft: (participant) => {
      roomLeft({ meeting_id: meetingId, user_id: participant.metaData.userId });
    },
  });

  // VideoSdk PubSub for open model
  const { publish: modelPubSub } = usePubSub("MODEL", {
    onMessageReceived: () => {
      setCloseModel(false);
      refetch();
    },
  });

  // VideoSdk for selected
  const { publish: selectedModelPublish } = usePubSub("SELECT_MODEL", {
    onMessageReceived: () => {
      setCloseModel(false);
      refetch();
    },
  });

  // VideoSdk for close model
  const { publish: closeModelPubSub } = usePubSub("CLOSE_MODEL", {
    onMessageReceived: () => {
      setCloseModel(true);
      setSelectedModel(null);
    },
  });

  // VideoSdk for delete model
  const { publish: deleteModelPubSub } = usePubSub("DELETE_MODEL", {
    onMessageReceived: () => {
      refetch();
    },
  });

  useEffect(() => {
    if (allModels && !closeModel) {
      const selectedModelData = allModels.data.selected_model;
      setSelectedModel(selectedModelData);
    }
  }, [allModels, closeModel]);

  useEffect(() => {
    window.addEventListener("popstate", (event) => {
      // console.log("User clicked back button", event);
      leave();
    });
  }, [window]);

  return (
    <div className="bg-grid relative flex h-screen w-full overflow-hidden">
      <DndProvider backend={HTML5Backend}>
        <RoomNavigation />

        {joined ? (
          <div>
            {[...participants.keys()].map((participantId) => (
              <RoomStream participantId={participantId} key={participantId} />
            ))}
          </div>
        ) : (
          <JoinLoading />
        )}

        {aiCameraIsOn && <CameraAi />}

        {selectedModel && joined ? (
          <Model />
        ) : isOwner && joined ? (
          <div className="mr-[5.5rem] flex w-full justify-center">
            <OpenModel />
          </div>
        ) : (
          joined && (
            <div className="mr-[5.5rem] flex w-full justify-center text-white">
              <div className="flex flex-col items-center justify-center gap-y-5">
                <HiOutlineStatusOnline className="size-48 text-gray-400" />
                <p className="text-2xl text-gray-400">
                  شما در جلسه <strong>{roomTitle}</strong> هستید
                </p>
              </div>
            </div>
          )
        )}
      </DndProvider>

      <ToastContainer rtl />
    </div>
  );
}
