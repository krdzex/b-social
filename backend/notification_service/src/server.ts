import http from "http";
import app from "./expressApp";
import { configureSocket } from "./utils/socket";
import { Server } from "socket.io";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    credentials: true,
    origin: true,
  },
  path: "/socket.io",
});

configureSocket(io);

const PORT = process.env.PORT || 5000;

export const StartServer = async () => {
  server.listen(PORT, () => {
    console.log(`App is listening to ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    process.exit(1);
  });
};

StartServer().then(() => {
  console.log("server is up");
});
