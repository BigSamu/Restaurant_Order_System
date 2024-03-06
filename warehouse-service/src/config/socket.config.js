// socket.config.js
import { Server as SocketIO } from "socket.io";

let ioConnection = null;

export const setupSocketConnection = (httpServer, corsOptions) => {
  if (ioConnection) return ioConnection;
  const io = new SocketIO(httpServer, {
    cors: corsOptions,
  });

  console.log("Setting up Socket.IO connection...")
  // Socket.IO connection setup
  const ioWarehouse = io.of("/warehouse");
  ioWarehouse.on("connection", (socket) => {
    console.log(`Socket connection setup with ID ${socket.id}`);

    ioWarehouse.on("disconnect", () => {
      console.log(`Socket connection with ID ${socket.id} disconnected`);
    });
  });
  console.log(ioConnection)
  ioConnection = ioWarehouse;
};

export const getSocketConnection = () => {
  if (!ioConnection) throw new Error("Socket connection not initialized.");
  return ioConnection;
};
