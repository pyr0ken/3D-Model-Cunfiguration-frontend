import { useMeeting } from "@videosdk.live/react-sdk";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import useGetAllRoomModels from "../../../hooks/room/useGetALlRoomModels";
import useRoomLeft from "../../../hooks/room/useRoomLeft";
import useRoomStore from "../../../store/roomStore";
import Model from "../../Models/Model";
import JoinLoading from "./JoinLoading";
import RoomNavigation from "./RoomNavigation";
import RoomStream from "./RoomStream";
import OpenModel from "./OpenRoomModel/OpenModel";

export default function Meeting() {
  // Room Store
  const {
    joined,
    meetingId,
    selectedModel,
    closeModel,
    setMeetingId,
    setJoined,
    setRoomId,
    setSelectedModel,
  } = useRoomStore();

  // Models Store
  const { data: allModels, isLoading } = useGetAllRoomModels(meetingId);

  // Left Meet
  const { mutate: roomLeft } = useRoomLeft();

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

  useEffect(() => {
    if (allModels && !closeModel) {
      const selectedModelData = allModels.data.selected_model;
      setSelectedModel(selectedModelData);
    }
  }, [allModels]);

  useEffect(() => {
    window.addEventListener("popstate", (event) => {
      // console.log("User clicked back button", event);
      leave();
    });
  }, [window]);

  return (
    <div className="bg-grid relative flex h-screen w-full overflow-hidden">
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

      {/* {cameraIsOn && <CameraAi />} */}

      {selectedModel && joined ? (
        <Model selectedModel={selectedModel} />
      ) : (
        <div className="ml-[5.5rem] flex w-full justify-center">
          <OpenModel />
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
