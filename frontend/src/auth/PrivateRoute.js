import { Navigate, Outlet } from "react-router";
import authHelper from "./auth-helper";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import useSocket from "../utils/useSocket";

const PrivateRoute = ({ children }) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("newComment", (data) => {
      toast.success(data.message, {duration: 2000, position: "top-right"})
    });
  }, [socket]);

  if (!authHelper.isAuthenticated()) {
    return <Navigate to={"/signin"} replace />;
  }

  return (
    <>
      <Toaster />
      {children ? children : <Outlet />}
    </>
  );
};

export default PrivateRoute;
