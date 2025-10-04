// src/App.tsx
import { Outlet } from "react-router-dom";


function App() {
  return (
    <div className="app">
      {/* This is where nested routes render */}
      <Outlet />
      
    </div>
  );
}

export default App;
