import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Button, Input } from "@nextui-org/react";
import { useAuthStore } from "../../../store/authStore";
import { showAlert } from "../../Core/utils";
import { useEffect, useState, useRef } from "react";
import { addPeer, createPeer, findPeer } from "../../Core/peerUtils";
import socket from "../../../socket";
import { apiBase } from "../../../services";
import { data } from "autoprefixer";

const variants = {
  close: {
    x: -300,
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 100,
  },
};

const Room = ({ selectedProject, isOpen, setSelectedProject }) => {
  const [peers, setPeers] = useState([]);
  const [userVideoAudio, setUserVideoAudio] = useState({
    localUser: { video: true, audio: true },
  });
  // const [room_id, setRoomId] = useState("")

  const peersRef = useRef([]);
  const joinLinkRef = useRef();

  const { user } = useAuthStore();
  const currentUserName = user.username;

  useEffect(() => {
    socket.on("FE-error-user-exist", ({ error, roomId }) => {
      console.log("ROOM_ID", roomId);
      if (!error) {
        socket.emit("BE-join-room", {
          roomId: roomId,
          userName: currentUserName,
        });
      } else {
        showAlert("error", `Join room ${roomId}`);
      }
    });

    socket.on("FE-user-join", (users) => {
      console.log("users", users);

      // all users
      const peers = [];
      users.forEach(({ userId, info }) => {
        let { userName, video, audio } = info;

        if (userName !== currentUserName) {
          const peer = createPeer(userId, socket.id, stream);

          peer.userName = userName;
          peer.peerID = userId;

          peersRef.current.push({
            peerID: userId,
            peer,
            userName,
          });
          peers.push(peer);

          setUserVideoAudio((preList) => {
            return {
              ...preList,
              [peer.userName]: { video, audio },
            };
          });
        }
      });

      setPeers(peers);
    });

    socket.on("FE-receive-call", ({ signal, from, info }) => {
      let { userName, video, audio } = info;
      const peerIdx = findPeer(from);

      if (!peerIdx) {
        const peer = addPeer(signal, from, stream);

        peer.userName = userName;

        peersRef.current.push({
          peerID: from,
          peer,
          userName: userName,
        });
        setPeers((users) => {
          return [...users, peer];
        });
        setUserVideoAudio((preList) => {
          return {
            ...preList,
            [peer.userName]: { video, audio },
          };
        });
      }
    });

    socket.on("FE-call-accepted", ({ signal, answerId }) => {
      const peerIdx = findPeer(answerId);
      peerIdx.peer.signal(signal);
    });

    socket.on("FE-user-leave", ({ userId, userName }) => {
      const peerIdx = findPeer(userId);
      peerIdx.peer.destroy();
      setPeers((users) => {
        users = users.filter((user) => user.peerID !== peerIdx.peer.peerID);
        return [...users];
      });
      peersRef.current = peersRef.current.filter(
        ({ peerID }) => peerID !== userId,
      );
    });

    return () => {
      // Remove event listeners here
      socket.off("FE-error-user-exist");
      socket.off("FE-user-join");
      socket.off("FE-receive-call");
      socket.off("FE-call-accepted");
      socket.off("FE-user-leave");
    };
  }, [socket]);

  const createPeer = (userId, caller, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("BE-call-user", {
        userToCall: userId,
        from: caller,
        signal,
      });
    });
    peer.on("disconnect", () => {
      peer.destroy();
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerId, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("BE-accept-call", { signal, to: callerId });
    });

    peer.on("disconnect", () => {
      peer.destroy();
    });

    peer.signal(incomingSignal);

    return peer;
  };

  const findPeer = (id) => {
    return peersRef.current.find((p) => p.peerID === id);
  };

  const handleCreateRoom = async () => {
    try {
      const response = await apiBase.post("/rooms/", {
        username: currentUserName,
      });
      const data = response.data;

      // setRoomId(data['room_id'])

      socket.emit("BE-check-user", {
        roomId: data["room_id"],
        userName: currentUserName,
      });
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleJoinRoom = () => {
    const joinLink = joinLinkRef.current.value;
    socket.emit("BE-check-user", {
      roomId: joinLink,
      userName: currentUserName,
    });
  };

  const leaveRoom = (e) => {
    e.preventDefault();
    socket.emit("BE-leave-room", { roomId: "data", leaver: currentUserName });
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
      className={`absolute z-10 ml-0 flex h-full w-64 flex-col gap-8 rounded-[3rem] bg-gradient-to-b from-leva-1/70 to-leva-2/70 text-neutral-400 ${
        isOpen ? "left-[16.5rem] transition-left" : "left-24 transition-left"
      } border-r border-neutral-800 p-5`}
    >
      <div className="flex w-full flex-row place-items-center justify-between">
        <h1 className="text-lg font-semibold tracking-wide">
          {selectedProject}
        </h1>
        <button onClick={() => setSelectedProject(null)}>
          <XMarkIcon className="w-8 stroke-neutral-400" />
        </button>
      </div>
      <div className="flex flex-col gap-14">
        <div className="flex flex-col">
          <p className="mb-3 text-xl font-semibold">Create a room</p>
          <Button
            className="text-white"
            onClick={handleCreateRoom}
            variant="shadow"
            color="primary"
          >
            Create
          </Button>
        </div>

        <div className="flex flex-col">
          <p className="mb-3 text-xl font-semibold">Join a room</p>
          <Input
            ref={joinLinkRef}
            placeholder="Enter room id"
            type="text"
            className="dark"
          />
          <Button
            onClick={handleJoinRoom}
            className="mt-2 text-black"
            variant="shadow"
          >
            join
          </Button>
        </div>

        <Button
          onClick={leaveRoom}
          className="mt-2"
          variant="ghost"
          color="danger"
        >
          Leave Room
        </Button>
      </div>
    </motion.nav>
  );
};

export default Room;
