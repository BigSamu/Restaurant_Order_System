// socket.config.js
import { Server as SocketIO } from "socket.io";

let ioConnection = null;

export const setupSocketConnection = (httpServer, corsOptions) => {
  if (ioConnection) return ioConnection;

  const io = new SocketIO(httpServer, {
    cors: corsOptions,
  });

  // Socket.IO connection setup
  const ioKitchen = io.of("/kitchen");
  ioKitchen.on("connection", (socket) => {
    console.log(`Socket connection setup with ID ${socket.id}`);

    ioKitchen.on("disconnect", () => {
      console.log(`Socket connection with ID ${socket.id} disconnected`);
    });
  });

  ioConnection = ioKitchen;
};

export const getSocketConnection = () => {
  if (!ioConnection) throw new Error("Socket connection not initialized.");
  return ioConnection;
};
