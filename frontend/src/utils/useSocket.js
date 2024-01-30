import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import authHelper from "../auth/auth-helper";

let socketInstance = null;
let socketStartedInitialization = false;

const socketUrl = "http://localhost:5000/";

const useSocket = () => {
  const [socket, setSocket] = useState(socketInstance);
  const jwt = authHelper.isAuthenticated();

  useEffect(() => {
    if (socketStartedInitialization) {
      setSocket(socketInstance);
      return;
    }

    socketStartedInitialization = true;

    const localSocket = io(socketUrl, {
      reconnection: true,
      reconnectionAttempts: 5,
      auth: {
        token: jwt.token,
      },
    });

    localSocket.on("connect", () => {
      console.log("connected");
    });

    localSocket.on("disconnect", () => {
      console.log("disconnected");
      setTimeout(() => {
        localSocket.connect();
      }, 1000);
    });

    socketInstance = localSocket;
    setSocket(localSocket);

    return () => {
      localSocket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
