import { Server, Socket } from "socket.io";
import JwtHelper from "./jwtHalper";

let ioInstance: Server;

const configureSocket = (io: Server) => {
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    await JwtHelper.parseJWT(token)
      .then((decoded) => {
        socket.data.userId = decoded.user.id;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  });

  ioInstance = io;

  io.on("connection", (socket) => {
    console.log("user connected");

    const userId: number = socket.data.userId;

    socket.join(`room-${userId}`);

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

export { configureSocket, ioInstance };
