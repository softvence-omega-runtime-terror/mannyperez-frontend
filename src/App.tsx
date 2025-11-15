// src/App.tsx
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import { socket, SocketEvent } from "./lib/socket";

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) return;

    const token = localStorage.getItem("authToken");

    socket.auth = { token };

    socket.connect();

    socket.emit(SocketEvent.JOIN);

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated]);

  return (
    <div className="app">
      {/* This is where nested routes render */}
      <Outlet />
    </div>
  );
}

export default App;
