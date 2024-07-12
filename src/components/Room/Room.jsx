import { MeetingProvider } from "@videosdk.live/react-sdk";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import useRoomDetail from "../../hooks/room/useRoomDetail";
import { useAuthStore } from "../../store/authStore";
import useRoomStore from "../../store/roomStore";
import Meeting from "./Meeting";

export default function Room() {
  // Get room id from path
  const { id } = useParams();

  // Get user information
  const { user } = useAuthStore();
  const userName = user.username;
  const userId = user.userId;

  // Room Store
  const { meetingId, authToken, setIsOwner, setRoomId } = useRoomStore();

  // Check user is owner of room
  const { data: roomInfo } = useRoomDetail(id);

  useEffect(() => {
    setRoomId(id);

    if (roomInfo && roomInfo.owner.id === userId) {
      setIsOwner(true);
    }
  }, [roomInfo, userId, id]);

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId: meetingId,
        micEnabled: false,
        webcamEnabled: false,
        name: userName,
        metaData: { userId },
      }}
      token={authToken}
      joinWithoutUserInteraction={true}
    >
      <Meeting />
    </MeetingProvider>
  ) : (
    <Navigate to={"/dashboard/rooms/"} />
  );
}
