import useRooms from "../../../hooks/room/useRooms";
import useCreateRoom from "../../../hooks/room/useCreateRoom";
import useDeleteRoom from "../../../hooks/room/useDeleteRoom";
import { Button, Input } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import {
  showAlert,
  formatISODate,
  relativeTimeFromNow,
} from "../../Core/utils";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { IoEnterOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { useLocation } from "react-router-dom";
import useJoinRoom from "../../../hooks/room/useJoinRoom";
import useRoomStore from "../../../store/roomStore";
import useVideoSdkCreateRoom from "../../../hooks/room/useVideoSdkCreateRoom";
import { BounceLoader } from "react-spinners";
import { HiOutlineSignalSlash } from "react-icons/hi2";

export default function RoomsList() {
  const { data: rooms, isLoading, isError, error, refetch } = useRooms();
  const { mutate: createRoom } = useCreateRoom();
  const { mutate: deleteRoom } = useDeleteRoom();
  const { mutate: joinRoom } = useJoinRoom();

  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const joinRoomIdRef = useRef();
  const titleRef = useRef();

  const { setAuthToken, setMeetingId, setJoined } = useRoomStore();
  const { mutate: createVideoSdkRoom } = useVideoSdkCreateRoom();
  const [roomEnterId, setRoomEnterId] = useState(null);

  const createdRooms = rooms?.created_rooms || [];
  const joinedRooms = rooms?.joined_rooms || [];

  useEffect(() => {
    if (state && state.message && state.status) {
      showAlert(state.status, state.message);
      // Clear the successMessage from the location state
      navigate(pathname, { replace: true });
    }
  }, [state, navigate, pathname]);

  const handleCreateRoom = (title) => {
    createRoom(
      { title },
      {
        onSuccess: (data) => {
          refetch();
          showAlert("success", data.detail);
        },
        onError: (error) => {
          showAlert("error", `title: ${error.response?.data?.title?.join()}`);
          if (!error?.originalStatus) {
            showAlert("error", error.response?.data?.detail);
          } else if (error.originalStatus === 400) {
            showAlert("error", error.response?.data?.detail);
          } else if (error.originalStatus === 401) {
            showAlert("error", error.response?.data?.detail);
          } else {
            showAlert("error", "Failed");
          }
        },
      },
    );
  };

  const handleEnterRoom = (id) => {
    setRoomEnterId(id);
    createVideoSdkRoom(
      { id },
      {
        onSuccess: (response) => {
          setAuthToken(response.data.auth_token);
          setMeetingId(response.data.meeting_id);
          setJoined(false);
          navigate(`/rooms/${id}`);
        },
        onError: (error) => {
          console.error("Error creating room:", error);
          setRoomEnterId(null);
        },
      },
    );
  };

  const handleDeleteRoom = (id) => {
    deleteRoom(
      { id },
      {
        onSuccess: (data) => {
          refetch();
        },
        onError: (error) => {
          showAlert("error", error.response?.data?.room_id);
          if (!error?.originalStatus) {
            showAlert("error", error.response?.data?.detail);
          } else if (error.originalStatus === 400) {
            showAlert("error", error.response?.data?.detail);
          } else if (error.originalStatus === 401) {
            showAlert("error", error.response?.data?.detail);
          } else {
            showAlert("error", "Failed");
          }
        },
      },
    );
  };

  const handleJoinRoom = async (meetingId) => {
    joinRoom(
      { room_id: meetingId },
      {
        onSuccess: (data) => {
          setAuthToken(data.auth_token);
          setMeetingId(data.meeting_id);
          setJoined(false);
          navigate(`/rooms/${data.id}`);
        },
        onError: (error) => {
          console.log(error);
          showAlert("error", error.response?.data?.room_id);
          if (!error?.originalStatus) {
            showAlert("error", error.response?.data?.detail);
          } else if (error.originalStatus === 400) {
            showAlert("error", error.response?.data?.detail);
          } else if (error.originalStatus === 401) {
            showAlert("error", error.response?.data?.detail);
          } else {
            showAlert("error", "Failed");
          }
        },
      },
    );
  };

  return (
    <>
      <ToastContainer />
      <div className="mx-5 mt-2 flex h-screen w-full flex-col gap-y-5 overflow-auto text-white">
        <div className="flex flex-col">
          <div className="flex items-center justify-between rounded-md bg-gradient-to-l from-leva-2 to-leva-1 p-5">
            <h1 className="text-2xl font-bold"> Created Rooms </h1>
            <div className="flex items-center gap-x-2">
              <Input
                ref={titleRef}
                className="dark"
                size="lg"
                variant="faded"
                placeholder="Enter the title of room..."
                color="primary"
              />
              <Button
                className="px-10 text-lg"
                variant="shadow"
                size="lg"
                color="primary"
                onClick={() => handleCreateRoom(titleRef.current.value)}
              >
                Create New Room
              </Button>
            </div>
          </div>

          <div className="mx-5 mt-1 overflow-y-auto rounded-lg">
            <div className="grid grid-cols-3 rounded-tl-lg rounded-tr-lg bg-leva-2 p-4 text-lg font-semibold">
              <p className="pl-1">Title</p>
              <p className="pl-2.5">Created At</p>
              <p className="text-center">Options</p>
            </div>
            {isLoading ? (
              <p className="p-2">Loading...</p>
            ) : (
              <div className="max-h-[50vh] overflow-y-auto text-gray-200">
                {createdRooms.length > 0 ? (
                  createdRooms.map((room) => (
                    <div
                      key={room.id}
                      className="grid grid-cols-3 bg-leva-3 p-2 font-medium last:rounded-bl-lg last:rounded-br-lg odd:border-y-2 odd:border-leva-1"
                    >
                      <p className="p-3">{room.title}</p>
                      <p className="p-3">{formatISODate(room.created_at)}</p>
                      <div className="flex justify-center gap-x-2 font-mono">
                        <button
                          onClick={() => handleEnterRoom(room.id)}
                          className={`rounded-lg p-2 text-black transition-colors ${roomEnterId === room.id ? "bg-black/70" : "bg-blue-400 hover:bg-green-500"}`}
                        >
                          {roomEnterId === room.id ? <Spinner size="lg" /> : "Enter"}
                        </button>
                        <button
                          onClick={() => handleDeleteRoom(room.id)}
                          className="rounded-lg bg-blue-400 p-2 text-black transition-colors hover:bg-red-500"
                        >
                          Delete
                        </button>
                        {/* <Button
                      variant="shadow"
                      className="dark"
                      color="secondary"
                      onClick={() => handleDeleteRoom(room.id)}
                    >
                      <IoEnterOutline className="size-10" />
                    </Button>
                    <Button
                      variant="shadow"
                      className="dark"
                      color="danger"
                      onClick={() => handleDeleteRoom(room.id)}
                    >
                      <MdDelete className="size-6" />
                    </Button> */}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="bg-leva-2/50 p-4 text-center text-lg">
                    There Is no room exist, Let's create ones !
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between rounded-md bg-gradient-to-l from-leva-2 to-leva-1 p-5">
            <h1 className="text-2xl font-bold"> Joined Rooms </h1>
            <div className="flex items-center gap-x-2">
              <Input
                ref={joinRoomIdRef}
                className="dark"
                size="lg"
                variant="faded"
                placeholder="Enter the room id..."
                color="primary"
              />
              <Button
                className="text-lg"
                variant="shadow"
                size="lg"
                color="primary"
                onClick={() => handleJoinRoom(joinRoomIdRef.current.value)}
              >
                Join room
              </Button>
            </div>
          </div>
          <div className="mx-5 mt-1 overflow-y-auto rounded-lg text-gray-200">
            <div className="grid grid-cols-5 items-center rounded-tl-lg rounded-tr-lg bg-leva-2 p-4 text-lg font-semibold">
              <p>Title</p>
              <p className="pl-1">Owner</p>
              <p className="pl-1">Is Active</p>
              <p className="pl-3">Last Join</p>
              <p className="pl-1 text-center">Options</p>
            </div>
            {isLoading ? (
              <p className="p-2">Loading...</p>
            ) : (
              <div className="max-h-[50vh] overflow-y-auto">
                {joinedRooms.length > 0 ? (
                  joinedRooms.map((userRoom) => (
                    <div
                      key={userRoom.id}
                      className="grid grid-cols-5 items-center bg-leva-3 p-2 font-medium last:rounded-bl-lg last:rounded-br-lg odd:border-y-2 odd:border-leva-1"
                    >
                      <p className="p-3">{userRoom.room.title}</p>
                      <p className="p-3">{userRoom.room.owner.username}</p>
                      <p className="p-3">
                        {userRoom.room.is_active ? (
                          <BounceLoader color="rgb(34,197,94)" />
                        ) : (
                          <HiOutlineSignalSlash className="h-8 min-w-6 stroke-2 text-red-500" />
                        )}
                      </p>
                      <p className="p-3">
                        {relativeTimeFromNow(userRoom.last_join)}
                      </p>
                      <div className="flex justify-center gap-x-2 font-mono">
                        <button
                          onClick={() =>
                            handleJoinRoom(userRoom.room.meeting_id)
                          }
                          className="rounded-lg bg-blue-400 p-3 text-black transition-colors hover:bg-green-500"
                        >
                          Join
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="rounded-tl-lg rounded-tr-lg bg-leva-2/50 p-4 text-center text-lg">
                    There Is no room exist, Let's join ones !
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
