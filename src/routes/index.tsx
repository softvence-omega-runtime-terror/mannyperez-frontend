import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Landing from "@/pages/Landing";
import Seller from "@/pages/Seller";
import Login from "@/pages/Auth/Login";
import SignUp from "@/pages/Auth/SignUp";
import Feed from "@/pages/Feed";
import FeedHome from "@/pages/FeedHome";
import MessagingPage from "@/pages/MessagePage";
import Live from "@/pages/Live";
import Products from "@/pages/Products";
import NewListingSteps from "@/components/ProductsComponent/CreateNewListing/NewListingStepsContainer";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />, // root layout
    children: [
      { path: "/", element: <Landing /> },
      { path: "/seller", element: <Seller /> },
      {
        path: "/feed",
        element: <Feed />,
        children: [
          { path: "", element: <FeedHome /> }, // default content for left column
          { path: "messages/:postId", element: <MessagingPage /> },
          { path: "post/:id", element: <div>Feed Posts.</div> }, // example nested route
        ],
      },
      { path: "/products", element: <Products /> },
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/", element: <Landing /> },
      { path: "/seller", element: <Seller /> },
      { path: "/live", element: <Live /> },
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/new-listing", element: <NewListingSteps /> },
    ],
  },
]);

export default routes;
