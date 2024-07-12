import { Button, Input, Spinner } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { HiOutlineSignalSlash } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import useCreateRoom from "../../../hooks/room/useCreateRoom";
import useDeleteRoom from "../../../hooks/room/useDeleteRoom";
import useJoinRoom from "../../../hooks/room/useJoinRoom";
import useRooms from "../../../hooks/room/useRooms";
import useEnterRoom from "../../../hooks/room/useEnterRoom";
import useRoomStore from "../../../store/roomStore";
import {
  formatDateTime,
  relativeTimeFromNow,
  showAlert,
} from "../../Core/utils";

export default function RoomsList() {
  const { data: rooms, isLoading, refetch } = useRooms();
  const { mutate: createRoom } = useCreateRoom();
  const { mutate: deleteRoom } = useDeleteRoom();
  const { mutate: joinRoom } = useJoinRoom();

  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const joinRoomIdRef = useRef();
  const titleRef = useRef();

  const { setAuthToken, setMeetingId, setJoined, setRoomTitle } =
    useRoomStore();
  const { mutate: enterRoom } = useEnterRoom();
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
    if (!title) {
      showAlert("error", "لطفا عنوان جلسه را وارد کنید");
    }

    createRoom(
      { title },
      {
        onSuccess: (data) => {
          refetch();
          showAlert("success", data.detail);
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

  const handleEnterRoom = (id) => {
    setRoomEnterId(id);
    enterRoom(
      { room_id: id },
      {
        onSuccess: (response) => {
          setAuthToken(response.data.auth_token);
          setMeetingId(response.data.meeting_id);
          setRoomTitle(response.data.room_title);
          setJoined(false);
          navigate(`/rooms/${id}`);
        },
        onError: (error) => {
          setRoomEnterId(null)
          if (error.response.status === 400) {
            showAlert("error", error.response?.data?.detail);
          } else {
            showAlert("error", "مشکلی در ارسال اطلاعات پیش آمده است");
          }
        },
      },
    );
  };

  const handleDeleteRoom = (id) => {
    deleteRoom(
      { room_id: id },
      {
        onSuccess: (data) => {
          refetch();
          showAlert("success", data.detail);
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

  const handleJoinRoom = async (meetingId) => {
    if (!meetingId) {
      showAlert("error", "لطفا آیدی جلسه را وارد کنید");
    }

    joinRoom(
      { room_id: meetingId },
      {
        onSuccess: (data) => {
          setAuthToken(data.auth_token);
          setMeetingId(data.meeting_id);
          setRoomTitle(data.room_title);
          setJoined(false);
          navigate(`/rooms/${data.room_id}`);
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
    <>
      <ToastContainer rtl />
      <div className="mx-5 mt-2 flex h-screen w-full flex-col gap-y-5 overflow-auto text-white">
        <div className="flex flex-col">
          <div className="flex items-center justify-between rounded-md bg-gradient-to-l from-leva-2 to-leva-1 p-5">
            <h1 className="text-2xl font-bold"> جلسات ساخته شده </h1>
            <div className="flex items-center gap-x-2">
              <Input
                ref={titleRef}
                className="dark"
                size="lg"
                variant="faded"
                placeholder="لطفا عنوان جلسه جدید را وارد کنید..."
                color="primary"
              />
              <Button
                className="px-10 text-lg"
                variant="shadow"
                size="lg"
                color="primary"
                onClick={() => handleCreateRoom(titleRef.current.value)}
              >
                ساخت جلسه جدید
              </Button>
            </div>
          </div>

          <div className="mx-5 mt-1 overflow-y-auto rounded-lg">
            <div className="grid grid-cols-5 rounded-tl-lg rounded-tr-lg bg-leva-2 p-4 text-lg font-semibold">
              <p className="pr-2">عنوان</p>
              <p className="pr-2.5">زمان ایجاد</p>
              <p className="pr-2.5">تعداد اعضا</p>
              <p className="pr-2.5">تعداد مدل ها</p>
              <p className="text-center">گزینه ها</p>
            </div>
            {isLoading ? (
              <p className="bg-leva-2/50 p-4 text-center text-lg">
                در حال بارگیری اطلاعات...
              </p>
            ) : (
              <div className="max-h-[50vh] overflow-y-auto text-gray-200">
                {createdRooms.length > 0 ? (
                  createdRooms.map((room) => (
                    <div
                      key={room.id}
                      className="grid grid-cols-5 items-center bg-leva-3/90 p-2 text-lg font-medium last:rounded-bl-lg last:rounded-br-lg odd:border-y-2 odd:border-leva-1"
                    >
                      <p className="pr-1">{room.title}</p>
                      <p className="pr-3">{formatDateTime(room.created_at)}</p>
                      <p className="pr-4">{room.members_count}</p>
                      <p className="pr-3">{room.edit_models_count}</p>
                      <div className="flex justify-center gap-x-2">
                        <button
                          onClick={() => handleEnterRoom(room.id)}
                          className={`rounded-lg p-3 text-black transition-colors ${roomEnterId === room.id ? "bg-black/70" : "bg-blue-400 hover:bg-green-500"}`}
                        >
                          {roomEnterId === room.id ? (
                            <Spinner size="lg" />
                          ) : (
                            "ورود"
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteRoom(room.id)}
                          className="rounded-lg bg-blue-400 p-3 text-black transition-colors hover:bg-red-500"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="bg-leva-2/50 p-4 text-center text-lg">
                    هیچ جلسه ای در اینجا وجود ندارد. همین الان میتوانید یک جلسه
                    بسازید !
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between rounded-md bg-gradient-to-l from-leva-2 to-leva-1 p-5">
            <h1 className="text-2xl font-bold"> جلسات عضو شده </h1>
            <div className="flex items-center gap-x-2">
              <Input
                ref={joinRoomIdRef}
                className="dark"
                size="lg"
                variant="faded"
                placeholder="لطفا آیدی جلسه را وارد کنید..."
                color="primary"
              />
              <Button
                className="px-11 text-lg"
                variant="shadow"
                size="lg"
                color="primary"
                onClick={() => handleJoinRoom(joinRoomIdRef.current.value)}
              >
                پیوستن به جلسه
              </Button>
            </div>
          </div>
          <div className="mx-5 mt-1 overflow-y-auto rounded-lg text-gray-200">
            <div className="grid grid-cols-5 items-center rounded-tl-lg rounded-tr-lg bg-leva-2 p-4 text-lg font-semibold">
              <p>عنوان</p>
              <p className="pl-1">مدیر</p>
              <p className="pl-1">وضعیت</p>
              <p className="pl-3">آخرین تاریخ عضویت</p>
              <p className="pl-1 text-center">گزینه ها</p>
            </div>
            {isLoading ? (
              <p className="bg-leva-2/50 p-4 text-center text-lg">
                در حال بارگیری اطلاعات...
              </p>
            ) : (
              <div className="max-h-[50vh] overflow-y-auto">
                {joinedRooms.length > 0 ? (
                  joinedRooms.map((userRoom) => (
                    <div
                      key={userRoom.id}
                      className="grid grid-cols-5 items-center bg-leva-3/90 p-2 font-medium last:rounded-bl-lg last:rounded-br-lg odd:border-y-2 odd:border-leva-1"
                    >
                      <p className="pl-3">{userRoom.room.title}</p>
                      <p className="pr-1">{userRoom.room.owner.username}</p>
                      <p className="pl-3">
                        {userRoom.room.is_active ? (
                          <BounceLoader color="rgb(34,197,94)" />
                        ) : (
                          <HiOutlineSignalSlash className="h-8 min-w-6 stroke-2 text-red-500" />
                        )}
                      </p>
                      <p className="pl-3">
                        {relativeTimeFromNow(userRoom.last_join)}
                      </p>
                      <div className="flex pl-4 justify-center gap-x-2">
                        <button
                          onClick={() =>
                            handleJoinRoom(userRoom.room.meeting_id)
                          }
                          className="rounded-lg bg-blue-400 p-3 text-black transition-colors hover:bg-green-500"
                        >
                          پیوستن
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="bg-leva-2/50 p-4 text-center text-lg">
                    هیچ جلسه ای در اینجا وجود ندارد. همین الان میتوانید به یک
                    جلسه بپیوندید !
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
