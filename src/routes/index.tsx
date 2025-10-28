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
import VerifyEmail from "@/pages/Auth/VerifyEmail";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PublicRoute from "@/components/auth/PublicRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Public routes (accessible to everyone)
      { path: "/", element: <Landing /> },
      
      // Public routes (only accessible when NOT logged in)
      { 
        path: "/login", 
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ) 
      },
      { 
        path: "/sign-up", 
        element: (
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        ) 
      },
      { path: "/verify-email", element: <VerifyEmail /> },


      // Protected routes (requires authentication)
      {
        path: "/feed",
        element: (
          <ProtectedRoute allowedRoles={['buyer']}>
            <Feed />
          </ProtectedRoute>
        ),
        children: [
          { path: "", element: <FeedHome /> },
          { path: "messages/:postId", element: <MessagingPage /> },
          { path: "post/:id", element: <div>Feed Posts.</div> },
        ],
      },
      
      // Products page - requires verified account
      { 
        path: "/products", 
        element: (
          <ProtectedRoute requireVerified>
            <Products />
          </ProtectedRoute>
        ) 
      },

      // Seller routes - only for sellers and admins
      { 
        path: "/seller", 
        element: (
          <ProtectedRoute allowedRoles={["seller", "admin"]}>
            <Seller />
          </ProtectedRoute>
        ) 
      },

      // New listing - only sellers can create listings
      { 
        path: "/new-listing", 
        element: (
          <ProtectedRoute allowedRoles={["seller", "admin"]} requireVerified>
            <NewListingSteps />
          </ProtectedRoute>
        ) 
      },

      // Live streams - requires authentication
      { 
        path: "/live", 
        element: (
          <ProtectedRoute>
            <Live />
          </ProtectedRoute>
        ) 
      },
    ],
  },
]);

export default routes;
