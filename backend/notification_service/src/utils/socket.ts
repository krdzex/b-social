import { Server } from "socket.io";

let ioInstance: Server;

const configureSocket = (io: Server) => {
  ioInstance = io;

  io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

export { configureSocket, ioInstance };
