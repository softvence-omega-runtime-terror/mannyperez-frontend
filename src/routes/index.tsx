import App from "@/App";
import Login from "@/pages/Auth/Login";
import SignUp from "@/pages/Auth/SignUp";
import Feed from "@/pages/Feed";
import FeedHome from "@/pages/FeedHome";
import Landing from "@/pages/Landing";
import Seller from "@/pages/Seller";
import { createBrowserRouter, redirect } from "react-router-dom";

import Orders from "@/components/BuyerCompnents/Orders";
import SavedItems from "@/components/BuyerCompnents/SavedItems";
import NewListingSteps from "@/components/ProductsComponent/CreateNewListing/NewListingStepsContainer";
import OrdersList from "@/components/SellersComponent/OrdersList";
import Promotions from "@/components/SellersComponent/Promotions";
import Unauthorized from "@/pages/Auth/Unauthorized";
import VerifyEmail from "@/pages/Auth/VerifyEmail";
import CheckoutPage from "@/pages/CheckoutPage";
import ErrorPage from "@/pages/ErrorPage";
import Live from "@/pages/Live";
import LivePage from "@/pages/live-events/LivePage";
import MessagingPage from "@/pages/messages/buyer/MessagePage";
import SellerMessagePage from "@/pages/messages/seller/SellerMessagePage";
import Products from "@/pages/Products";
import BuyerProfile from "@/pages/profile/BuyerProfile";
import Profile from "@/pages/profile/Profile";
import SellerProfile from "@/pages/profile/SellerProfile";
import { store } from "@/store";

// NEW — ADMIN LAYOUT
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminListings from "@/pages/admin/AdminListings";
import AdminIncidents from "@/pages/admin/AdminIncidents";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminPayout from "@/pages/admin/AdminPayout";
import AdminReports from "@/pages/admin/AdminReports";
import AdminCategories from "@/pages/admin/AdminCategories";

// --------------------- AUTH CHECK ---------------------
const checkAuth = (options?: {
  requireAuth?: boolean;
  requireGuest?: boolean;
  allowedRoles?: string[];
  requireVerified?: boolean;
}) => {
  const { user, isAuthenticated } = store.getState().auth;

  if (options?.requireGuest && isAuthenticated) return redirect("/");

  if (options?.requireAuth && !isAuthenticated) return redirect("/login");

  if (isAuthenticated && user) {
    if (user.isBlocked || user.isDeleted) return redirect("/login");

    if (
      options?.allowedRoles &&
      !options.allowedRoles.includes(user.role as any)
    ) {
      return redirect("/unauthorized");
    }

    if (options?.requireVerified && !user.isVerified)
      return redirect("/verify-email");
  }

  return null;
};

// --------------------- ROUTES ---------------------
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      { path: "/", element: <Landing /> },

      // Auth Pages
      { path: "/login", element: <Login />, loader: () => checkAuth({}) },
      { path: "/sign-up", element: <SignUp />, loader: () => checkAuth({}) },
      { path: "/verify-email", element: <VerifyEmail /> },
      { path: "/unauthorized", element: <Unauthorized /> },

      // Feed
      {
        path: "/feed",
        element: <Feed />,
        loader: () => checkAuth({}),
        children: [
          { path: "", element: <FeedHome /> },
          {
            path: "messages/:receiverId/:productId",
            element: <MessagingPage />,
          },
          { path: "post/:id", element: <div>Feed Posts.</div> },
        ],
      },

      // Seller Routes
      {
        path: "/seller/products",
        element: <Products />,
        loader: () => checkAuth({}),
      },
      {
        path: "/seller/promotions",
        element: <Promotions />,
        loader: () => checkAuth({}),
      },
      {
        path: "/seller/orders",
        element: <OrdersList />,
        loader: () => checkAuth({}),
      },
      {
        path: "/seller",
        element: <Seller />,
        loader: () =>
          checkAuth({ allowedRoles: ["seller", "admin"] }),
      },
      {
        path: "/new-listing",
        element: <NewListingSteps />,
        loader: () =>
          checkAuth({
            allowedRoles: ["seller", "admin"],
          }),
      },

      // Buyer Routes
      {
        path: "/buyer/profile",
        element: <BuyerProfile />,
        loader: () => checkAuth({ allowedRoles: ["buyer"] }),
      },
      {
        path: "/buyer/orders",
        element: <Orders />,
        loader: () => checkAuth({}),
      },
      {
        path: "/buyer/saved-items",
        element: <SavedItems />,
        loader: () => checkAuth({}),
      },

      // Profiles
      {
        path: "/profile",
        element: <Profile />,
        loader: () => checkAuth({}),
      },
      {
        path: "/seller/profile",
        element: <SellerProfile />,
        loader: () =>
          checkAuth({ allowedRoles: ["seller", "admin"] }),
      },
      {
        path: "/seller/messages",
        element: <SellerMessagePage />,
        loader: () =>
          checkAuth({ allowedRoles: ["seller", "admin"] }),
      },

      // Live
      { path: "/live", element: <LivePage />, loader: () => checkAuth({}) },
      { path: "/live/:eventId", element: <Live />, loader: () => checkAuth({}) },

      // Checkout
      {
        path: "/checkout/:id",
        element: <CheckoutPage />,
        loader: () => checkAuth({}),
      },

      // ------------------------------------------------------------------
      //                     ADMIN ROUTES 
      // ------------------------------------------------------------------
      {
        path: "/admin",
        element: <AdminLayout />, // OUTLET WRAPPER
        loader: () =>
          checkAuth({
            requireAuth: true,
            allowedRoles: ["admin"],
          }),

        children: [
          { path: "", element: <AdminDashboard /> },
          { path: "users", element: <AdminUsers /> },
          { path: "listings", element: <AdminListings /> },
          { path: "incidents", element: <AdminIncidents /> },
          { path: "settings", element: <AdminSettings /> },
          { path: "payouts", element: <AdminPayout /> },
          { path: "reports", element: <AdminReports /> },
          { path: "categories", element: <AdminCategories /> },
        ],
      },
      // ------------------------------------------------------------------
    ],
  },
]);

export default routes;
