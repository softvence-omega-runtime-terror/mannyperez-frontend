/* eslint-disable @typescript-eslint/no-explicit-any */
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
import OrderDetails from "@/pages/OrderDetails";
import Products from "@/pages/Products";
import BuyerProfile from "@/pages/profile/BuyerProfile";
import Profile from "@/pages/profile/Profile";
import SellerProfile from "@/pages/profile/SellerProfile";
import { store } from "@/store";


import UpdateProduct from "@/components/ProductsComponent/CreateNewListing/UpdateProduct";
import AdminCategories from "@/pages/admin/AdminCategories";
// ADMIN

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminIncidents from "@/pages/admin/AdminIncidents";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminListings from "@/pages/admin/AdminListings";
import AdminPayout from "@/pages/admin/AdminPayout";
import AdminReports from "@/pages/admin/AdminReports";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminUsers from "@/pages/admin/AdminUsers";

import PaymentSuccessPage from "@/pages/payment-success";
import PaymentCancelPage from "@/pages/payment-cancel";

// --------------------- AUTH CHECK ---------------------
const checkAuth = (options?: {
  requireAuth?: boolean;
  requireGuest?: boolean;
  allowedRoles?: string[];
  requireVerified?: boolean;
}) => {
  const { user, isAuthenticated } = store.getState().auth;

  // If user is logged in and trying to visit login/register → kick back
  if (options?.requireGuest && isAuthenticated) return redirect("/");

  // If route requires auth but user not authenticated
  if (options?.requireAuth && !isAuthenticated) return redirect("/login");

  if (isAuthenticated && user) {
    // BLOCKED / DELETED
    if (user.isBlocked || user.isDeleted) return redirect("/login");

    // ROLE CHECK
    if (
      options?.allowedRoles &&
      !options.allowedRoles.includes(user.role as any)
    ) {
      return redirect("/unauthorized");
    }

    // EMAIL VERIFICATION CHECK
    if (options?.requireVerified && !user.isVerified) {
      return redirect("/verify-email");
    }
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

      // AUTH
      {
        path: "/login",
        element: <Login />,
        loader: () => checkAuth({ requireGuest: true }),
      },
      {
        path: "/sign-up",
        element: <SignUp />,
        loader: () => checkAuth({ requireGuest: true }),
      },
      { path: "/verify-email", element: <VerifyEmail /> },
      { path: "/unauthorized", element: <Unauthorized /> },
      { path: "/payment-success/:paymentId", element: <PaymentSuccessPage /> },
      { path: "/payment-cancel", element: <PaymentCancelPage /> },

      // FEED
      {
        path: "/feed",
        element: <Feed />,
        loader: () => checkAuth({ requireAuth: true, requireVerified: true }),
        children: [
          { path: "", element: <FeedHome /> },
          {
            path: "messages",
            element: <MessagingPage />,
          },
          {
            path: "messages/:receiverId/:productId",
            element: <MessagingPage />,
          },
        ],
      },
      { path: "/live", element: <LivePage />, loader: () => checkAuth({}) },

      // SELLER ROUTES
      {
        path: "/seller",
        element: <Seller />,
        loader: () =>
          checkAuth({
            requireAuth: true,
            allowedRoles: ["seller", "admin","buyer"],
            requireVerified: true,
          }),
      },
      {
        path: "/seller/products",
        element: <Products />,
        loader: () =>
          checkAuth({
            requireAuth: true,
            allowedRoles: ["seller", "admin"],
            requireVerified: true,
          }),
      },
      {
        path: "/seller/promotions",
        element: <Promotions />,
        loader: () =>
          checkAuth({
            requireAuth: true,
            allowedRoles: ["seller", "admin"],
          }),
      },
      {
        path: "/seller/orders",
        element: <OrdersList />,
        loader: () => checkAuth({}),
      },
      {
        path: "/seller",
        element: <Seller />,
        loader: () => checkAuth({ allowedRoles: ["seller", "admin"] }),
      },
      {
        path: "/new-listing",
        element: <NewListingSteps />,
        loader: () =>
          checkAuth({
            requireAuth: true,
            allowedRoles: ["seller", "admin"],
            requireVerified: true,
          }),
      },

      // Buyer Routes
      {
        path: "/buyer/profile",
        element: <BuyerProfile />,
        loader: () => checkAuth({ allowedRoles: ["buyer"] }),
      },
      // SELLER MESSAGE PAGE
      {
        path: "/seller/messages",
        element: <SellerMessagePage />,
        loader: () =>
          checkAuth({
            requireAuth: true,
            allowedRoles: ["seller", "admin"],
          }),
      },
      {
        path: "/update-product/:productId",
        element: <UpdateProduct />,
        loader: () =>
          checkAuth({
            allowedRoles: ["seller", "admin"],
          }),
      },

      // BUYER ROUTES
      {
        path: "/buyer/profile",
        element: <BuyerProfile />,
        loader: () =>
          checkAuth({
            requireAuth: true,
            allowedRoles: ["buyer"],
          }),
      },
      {
        path: "/buyer/orders",
        element: <Orders />,

        loader: () => checkAuth({ requireAuth: true }),
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetails />,
        loader: () => checkAuth({}),
      },
      {
        path: "/buyer/saved-items",
        element: <SavedItems />,
        loader: () => checkAuth({}),
      },

      // Profiles
      {
        path: "/seller/profile",
        element: <Profile />,
        loader: () => checkAuth({}),
      },
      {
        path: "/seller/profile",
        element: <SellerProfile />,
        loader: () => checkAuth({ allowedRoles: ["seller", "admin"] }),
      },
      {
        path: "/seller/messages",
        element: <SellerMessagePage />,
        loader: () => checkAuth({ allowedRoles: ["seller", "admin"] }),
      },

      // Live

      {
        path: "/live/:eventId",
        element: <Live />,
        loader: () => checkAuth({}),
      },
      { path: "/live", element: <LivePage />, loader: () => checkAuth({}) },
      {
        path: "/live/:eventId",
        element: <Live />,
        loader: () => checkAuth({}),
      },
      {
        path: "/live/feature",
        element: <LivePage />,
        loader: () => checkAuth({}),
      },

      // PROFILE (GENERAL)
      {
        path: "/profile",
        element: <Profile />,
        loader: () => checkAuth({ requireAuth: true }),
      },

      // SELLER PROFILE (REAL ROUTE)
      {
        path: "/seller/profile-page",
        element: <SellerProfile />,
        loader: () => checkAuth({ allowedRoles: ["seller", "admin"] }),
      },
      {
        path: "/seller/messages",
        element: <SellerMessagePage />,
        loader: () => checkAuth({ allowedRoles: ["seller", "admin"] }),
      },

      // Live

      {
        path: "/live/:eventId",
        element: <Live />,
        loader: () => checkAuth({}),
      },
      { path: "/live", element: <LivePage />, loader: () => checkAuth({}) },
      {
        path: "/live/:eventId",
        element: <Live />,
        loader: () => checkAuth({}),
      },
      {
        path: "/live/feature",
        element: <LivePage />,
        loader: () => checkAuth({}),
      },

      // CHECKOUT
      {
        path: "/checkout/:id",
        element: <CheckoutPage />,
        loader: () => checkAuth({ requireAuth: true }),
      },

      // ------------------------------------------------------------------
      //                     ADMIN ROUTES
      // ------------------------------------------------------------------
      {
        path: "/admin",
        element: <AdminLayout />,
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
    ],
  },
]);

export default routes;
