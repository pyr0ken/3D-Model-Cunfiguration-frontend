export const createPeer = (userId, caller, stream) => {
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

export const addPeer = (incomingSignal, callerId, stream) => {
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

export const findPeer = (id) => {
  return peersRef.current.find((p) => p.peerID === id);
};
