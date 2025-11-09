
import { createBrowserRouter, redirect } from "react-router-dom";
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
import VerifyEmail from "@/pages/Auth/VerifyEmail";
import Unauthorized from "@/pages/Auth/Unauthorized";
import CheckoutPage from "@/pages/CheckoutPage"; 
import { store } from "@/store";
import BuyerProfile from "@/pages/profile/BuyerProfile";
import SellerProfile from "@/pages/profile/SellerProfile";
import Profile from "@/pages/profile/Profile";

// Simple auth check function
const checkAuth = (options?: {
  requireAuth?: boolean;
  requireGuest?: boolean;
  allowedRoles?: string[];
  requireVerified?: boolean;
}) => {
  const { user, isAuthenticated } = store.getState().auth;

  if (options?.requireGuest && isAuthenticated) {
    return redirect("/");
  }

  if (options?.requireAuth && !isAuthenticated) {
    return redirect("/login");
  }

  if (isAuthenticated && user) {
    if (user.isBlocked || user.isDeleted) {
      return redirect("/login");
    }

    if (options?.allowedRoles && !options.allowedRoles.includes(user.role)) {
      return redirect("/unauthorized");
    }

    if (options?.requireVerified && !user.isVerified) {
      return redirect("/verify-email");
    }
  }

  return null;
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/login", element: <Login />, loader: () => checkAuth({ requireGuest: true }) },
      { path: "/sign-up", element: <SignUp />, loader: () => checkAuth({ requireGuest: true }) },
      { path: "/verify-email", element: <VerifyEmail /> },
      { path: "/unauthorized", element: <Unauthorized /> },

      // Protected sections
      {
        path: "/feed",
        element: <Feed />,
        loader: () => checkAuth({ requireAuth: false }),
        children: [
          { path: "", element: <FeedHome /> },
          { path: "messages/:postId", element: <MessagingPage /> },
          { path: "post/:id", element: <div>Feed Posts.</div> },
        ],
      },

      { 
        path: "/products", 
        element: <Products />,
        loader: () => checkAuth({ requireAuth: false, requireVerified: false })
      },
      { 
        path: "/prfile", 
        element: <Profile />,
        loader: () => checkAuth({ requireAuth: false, requireVerified: false })
      },

      { 
        path: "/seller", 
        element: <Seller />,
        loader: () => checkAuth({ requireAuth: false, allowedRoles: ["seller", "admin"] })
      },

      { 
        path: "/new-listing", 
        element: <NewListingSteps />,
        loader: () => checkAuth({ requireAuth: false, allowedRoles: ["seller", "admin"], requireVerified: false })
      },

      {
        path: "/buyer/profile",
        element: <BuyerProfile />,
        loader: () => checkAuth({ requireAuth: false, allowedRoles: ["buyer"] }),
      },
      {
        path: "/seller/profile",
        element: <SellerProfile />,
        loader: () => checkAuth({ requireAuth: false, allowedRoles: ["seller", "admin"] }),
      },

      { 
        path: "/live", 
        element: <Live />,
        loader: () => checkAuth({ requireAuth: false })
      },

      {
        path: "/checkout/:id",
        element: <CheckoutPage />,
        loader: () => checkAuth({ requireAuth: false })
      },
    ],
  },
]);

export default routes;
