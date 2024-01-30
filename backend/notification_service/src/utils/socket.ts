import { Server } from "socket.io";

const configureSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

export { configureSocket };
