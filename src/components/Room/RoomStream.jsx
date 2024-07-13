import { useRef, useEffect, useState, useMemo } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import { Rnd } from "react-rnd";

export default function RoomStream(props) {
  const micRef = useRef(null);
  const { screenShareStream, micStream, screenShareOn, micOn, isLocal } =
    useParticipant(props.participantId);

  const screenStream = useMemo(() => {
    if (screenShareOn && screenShareStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(screenShareStream.track);
      return mediaStream;
    }
  }, [screenShareStream, screenShareOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error),
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      {screenShareOn && !isLocal && (
        <Rnd
          className="z-2147483645"
          style={{ display: screenShareOn ? "initial" : "none" }}
          default={{
            x: 0,
            y: 0,
            width: 300,
            height: 300,
          }}
          minWidth={300}
          minHeight={300}
          maxWidth={900}
          maxHeight={700}
          // bounds="#root"
          enableResizing={true}
        >
          <ReactPlayer
            //
            playsinline // extremely crucial prop
            pip={false}
            light={false}
            controls={true}
            muted={true}
            playing={true}
            //
            url={screenStream}
            //
            // height={"300px"}
            // width={"300px"}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
        </Rnd>
      )}
    </div>
  );
}
