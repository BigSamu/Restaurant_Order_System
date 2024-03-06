// socket.config.js
import { Server as SocketIO } from "socket.io";

let ioConnection = null;

export const setupSocketConnection = (httpServer, corsOptions) => {
  if (ioConnection) return ioConnection;
  const io = new SocketIO(httpServer, {
    cors: corsOptions,
    path: "/socket.io/warehouse/",
  });

  // Socket.IO connection setup
  console.log("Setting up Socket.IO connection...");
  io.on("connection", (socket) => {
    console.log(`Socket connection setup with ID ${socket.id}`);

    io.on("disconnect", () => {
      console.log(`Socket connection with ID ${socket.id} disconnected`);
    });
  });
  ioConnection = io;
};

export const getSocketConnection = () => {
  if (!ioConnection) throw new Error("Socket connection not initialized.");
  return ioConnection;
};
