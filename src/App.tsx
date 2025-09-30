// src/App.tsx
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <h2 className="text-5xl">Helloo World</h2>
      {/* This is where nested routes render */}
      <Outlet />
    </div>
  );
}

export default App;
