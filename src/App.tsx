import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import { socket, SocketEvent } from "./lib/socket";
import Navbar from "@/components/layout/Navbar";

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) return;

    const token = accessToken;

    socket.auth = { token };
    socket.connect();
    socket.emit(SocketEvent.JOIN);

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated, accessToken]);

  // List of paths where you **do not want** the global Navbar
  const hideNavbarPaths = [""];

  return (
    <div className="app">
      {/* Conditionally render global Navbar */}
      {!hideNavbarPaths.includes(location.pathname) && (
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
      )}

      {/* Render child routes */}
      <Outlet />
    </div>
  );
}

export default App;
