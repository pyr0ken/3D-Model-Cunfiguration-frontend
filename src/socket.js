import io from "socket.io-client";

const sockets = io("127.0.0.1:3001", {
  autoConnect: true,
  forceNew: true,
});
// const sockets = io("/");

export default sockets;
