import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useState } from "react";
import { IoPersonSharp } from "react-icons/io5";
import useRoomStore from "../../../../store/roomStore";
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";
import useRoomDetail from "../../../../hooks/room/useRoomDetail";
import { useParams } from "react-router-dom";
import { BsSoundwave } from "react-icons/bs";
import { MdCallEnd } from "react-icons/md";
import { ScaleLoader } from "react-spinners";

export default function MemberConfig({ participantId }) {
  const {
    disableMic,
    enableMic,
    remove,
    displayName,
    isActiveSpeaker,
    micOn,
    micStream,
    isLocal,
    metaData,
  } = useParticipant(participantId);

  const { isOwner, ownerId, setOwnerId } = useRoomStore();

  // Get room id from path
  const { id } = useParams();

  // Check user is owner of room
  const { data: roomInfo } = useRoomDetail(id);

  useEffect(() => {
    setOwnerId(roomInfo.owner.id);
  }, [roomInfo]);

  let isParticipantOwner = false;
  if (ownerId === metaData.userId) {
    isParticipantOwner = true;
  }

  const handleDisableMic = () => {
    if (micOn && micStream) {
      disableMic();
    }
  };

  const handleRemoveParticipant = () => {
    remove();
  };

  return (
    <div className="flex justify-between">
      <div className="flex items-center justify-center gap-x-3">
        <IoPersonSharp
          className={`${isParticipantOwner ? "text-red-500" : ""}`}
        />
        <p> {displayName} </p>
      </div>
      {micOn && (
        <div className="flex items-center">
          <ScaleLoader
            color={`${isActiveSpeaker ? "rgb(34,197,94)" : "rgb(255,255,255)"}`}
          />
        </div>
      )}
      <div className="flex items-center gap-x-3">
        <div className="flex gap-x-2">
          <span
            onClick={isOwner ? () => handleDisableMic() : () => {}}
            className={`cursor-pointer rounded-lg ${micOn ? "bg-red-500 hover:bg-red-600" : "hover:bg-neutral-900"} p-1 transition-colors duration-100 hover:stroke-neutral-100`}
          >
            {micOn ? (
              <CiMicrophoneOn
                className={`h-8 w-8 min-w-8 cursor-pointer stroke-[0.4] ${micOn ? "text-black" : "text-red-400"}`}
              />
            ) : (
              <CiMicrophoneOff
                className={`h-8 w-8 min-w-8 cursor-pointer ${micOn ? "text-black" : "text-red-400"}`}
              />
            )}
          </span>
          {isOwner && (
            <span
              onClick={() => handleRemoveParticipant()}
              className="rounded-lg bg-red-500 p-1 transition-colors  hover:bg-red-600"
            >
              <MdCallEnd className="h-8 min-w-8 cursor-pointer text-black" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
