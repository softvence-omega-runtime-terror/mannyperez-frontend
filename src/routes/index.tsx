import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Landing from "@/pages/Landing";
import Seller from "@/pages/Seller";
import Login from "@/pages/Auth/Login";
import SignUp from "@/pages/Auth/SignUp";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />, // root layout
    children: [
      { path: "/", element: <Landing /> },          
      { path: "/seller", element: <Seller/> }, 
      { path: "/login", element: <Login/> }, 
      { path: "/sign-up", element: <SignUp/> }, 
    ],
  },
]);

export default routes;
