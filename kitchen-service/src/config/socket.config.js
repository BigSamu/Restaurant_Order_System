// socket.config.js
import { Server as SocketIO } from "socket.io";

let socketConnection = null;

export const setupSocketConnection = (httpServer, corsOptions) => {
  if (socketConnection) return socketConnection;

  const io = new SocketIO(httpServer, {
    cors: corsOptions,
  });

  // Socket.IO connection setup
  io.on("connection", (socket) => {
    console.log(`Socket connection setup with ID ${socket.id}`);

    io.on("disconnect", () => {
      console.log(`Socket connection with ID ${socket.id} disconnected`);
    });
  });

  socketConnection = io;
};

export const getSocketConnection = () => {
  if (!socketConnection) throw new Error("Socket connection not initialized.");
  return socketConnection;
};
