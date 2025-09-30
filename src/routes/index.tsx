import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Landing from "@/pages/Landing";
import Seller from "@/pages/Seller";
import Login from "@/pages/Auth/Login";
import SignUp from "@/pages/Auth/SignUp";
import Feed from "@/pages/Feed";
import FeedHome from "@/pages/FeedHome";
import Live from "@/pages/Live";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />, // root layout
    children: [
      { path: "/", element: <Landing /> },
      { path: "/seller", element: <Seller /> },
      { 
        path: "/feed",
        element: <Feed />, // Feed layout with left & right columns
        children: [
          { path: "", element: <FeedHome/> }, // default content for left column
          { path: "post/:id", element: <div>Feed Posts.</div> }, // example nested route
        ]
      },
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/", element: <Landing /> },          
      { path: "/seller", element: <Seller/> }, 
      { path: "/live", element: <Live/> }, 
      { path: "/login", element: <Login/> }, 
      { path: "/sign-up", element: <SignUp/> }, 
    ],
  },
]);

export default routes;
