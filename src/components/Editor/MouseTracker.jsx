// import { useEffect, useState } from "react";
// import socket from "../../socket";

// export default function MouseTracker() {
//   const [cursors, setCursors] = useState([]);

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       socket.emit("BE-send-mouse-movement", {
//         x: event.pageX,
//         y: event.pageY,
//       });
//     };

//     document.addEventListener("mousemove", handleMouseMove);

//     //! READ THIS CODE FOR ALL THE TIME
//     socket.on("FE-receive-mouse-movement", (data) => {
//       setCursors((prevCursors) => {
//         const updatedCursors = prevCursors.filter(
//           (cursor) => cursor.socket_id !== data.socket_id
//         );
//         return [
//           ...updatedCursors,
//           {
//             socket_id: data.socket_id,
//             x: data.x,
//             y: data.y,
//             color: data.color,
//           },
//         ];
//       });
//     });

//     socket.on("FE-remove-cursor", (data) => {
//       setCursors((prevCursors) =>
//         prevCursors.filter((cursor) => cursor.socket_id !== data.socket_id)
//       );
//     });

//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, [socket, cursors]);

//   return (
//     <div className="Mouse">
//       {cursors.map((cursorData) => (
//         <span
//           key={cursorData.socket_id}
//           style={{
//             display: "inline-block",
//             height: "15px",
//             width: "15px",
//             borderRadius: "50%",
//             backgroundColor: `${cursorData.color}`,
//             position: "absolute",
//             left: `${cursorData.x}px`,
//             top: `${cursorData.y}px`,
//             zIndex: 9999,
//           }}
//         ></span>
//       ))}
//     </div>
//   );
// }
