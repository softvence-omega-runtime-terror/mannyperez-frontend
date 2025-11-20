import { createBrowserRouter, redirect } from "react-router-dom";
import App from "@/App";
import Landing from "@/pages/Landing";
import Seller from "@/pages/Seller";
import Login from "@/pages/Auth/Login";
import SignUp from "@/pages/Auth/SignUp";
import Feed from "@/pages/Feed";
import FeedHome from "@/pages/FeedHome";

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
import Promotions from "@/components/SellersComponent/Promotions";
import Orders from "@/components/BuyerCompnents/Orders";
import SavedItems from "@/components/BuyerCompnents/SavedItems";
import OrdersList from "@/components/SellersComponent/OrdersList";
import SellerMessagePage from "@/pages/messages/seller/SellerMessagePage";
import MessagingPage from "@/pages/messages/buyer/MessagePage";
import LivePage from "@/pages/live-events/LivePage";

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
      {
        path: "/login",
        element: <Login />,
        loader: () => checkAuth({ requireGuest: false }),
      },
      {
        path: "/sign-up",
        element: <SignUp />,
        loader: () => checkAuth({ requireGuest: false }),
      },
      { path: "/verify-email", element: <VerifyEmail /> },
      { path: "/unauthorized", element: <Unauthorized /> },

      // Protected sections
      {
        path: "/feed",
        element: <Feed />,
        loader: () => checkAuth({ requireAuth: false }),
        children: [
          { path: "", element: <FeedHome /> },
          {
            path: "messages/:receiverId/:productId",
            element: <MessagingPage />,
          },
          { path: "post/:id", element: <div>Feed Posts.</div> },
        ],
      },

      {
        path: "/seller/products",
        element: <Products />,
        loader: () => checkAuth({ requireAuth: false, requireVerified: false }),
      },

      {
        path: "/seller/promotions",
        element: <Promotions />,
        loader: () => checkAuth({ requireAuth: false, requireVerified: false }),
      },
      {
        path: "/seller/orders",
        element: <OrdersList />,
        loader: () => checkAuth({ requireAuth: false, requireVerified: false }),
      },
      {
        path: "/prfile",
        element: <Profile />,
        loader: () => checkAuth({ requireAuth: false, requireVerified: false }),
      },

      {
        path: "/seller",
        element: <Seller />,
        loader: () =>
          checkAuth({ requireAuth: false, allowedRoles: ["seller", "admin"] }),
      },

      {
        path: "/new-listing",
        element: <NewListingSteps />,
        loader: () =>
          checkAuth({
            requireAuth: false,
            allowedRoles: ["seller", "admin"],
            requireVerified: false,
          }),
      },

      {
        path: "/buyer/profile",
        element: <BuyerProfile />,
        loader: () =>
          checkAuth({ requireAuth: false, allowedRoles: ["buyer"] }),
      },
      {
        path: "/buyer/orders",
        element: <Orders />,
        loader: () => checkAuth({ requireAuth: false, requireVerified: false }),
      },
      {
        path: "/buyer/saved-items",
        element: <SavedItems />,
        loader: () => checkAuth({ requireAuth: false, requireVerified: false }),
      },
      {
        path: "/seller/profile",
        element: <SellerProfile />,
        loader: () =>
          checkAuth({ requireAuth: false, allowedRoles: ["seller", "admin"] }),
      },
      {
        path: "seller/messages",
        element: <SellerMessagePage />,
        loader: () =>
          checkAuth({ requireAuth: false, allowedRoles: ["seller", "admin"] }),
      },
      {
       path: "/live",
       element: <LivePage/>,
       loader: ()=> checkAuth({requireAuth:  false})
      },

      {
        path: "/live/:eventId",
        element: <Live />,
        loader: () => checkAuth({ requireAuth: false }),
      },

      {
        path: "/checkout/:id",
        element: <CheckoutPage />,
        loader: () => checkAuth({ requireAuth: false }),
      },
    ],
  },
]);

export default routes;
