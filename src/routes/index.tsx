// import { createBrowserRouter, redirect } from "react-router-dom";
// import App from "@/App";
// import Landing from "@/pages/Landing";
// import Seller from "@/pages/Seller";
// import Login from "@/pages/Auth/Login";
// import SignUp from "@/pages/Auth/SignUp";
// import Feed from "@/pages/Feed";
// import FeedHome from "@/pages/FeedHome";
// import MessagingPage from "@/pages/MessagePage";
// import Live from "@/pages/Live";
// import Products from "@/pages/Products";
// import NewListingSteps from "@/components/ProductsComponent/CreateNewListing/NewListingStepsContainer";
// import VerifyEmail from "@/pages/Auth/VerifyEmail";
// import Unauthorized from "@/pages/Auth/Unauthorized";
// import { store } from "@/store";

// // Simple auth check function
// const checkAuth = (options?: {
//   requireAuth?: boolean;
//   requireGuest?: boolean;
//   allowedRoles?: string[];
//   requireVerified?: boolean;
// }) => {
//   const { user, isAuthenticated } = store.getState().auth;

//   // Check if guest required (login, signup pages)
//   if (options?.requireGuest && isAuthenticated) {
//     return redirect("/");
//   }

//   // Check if auth required
//   if (options?.requireAuth && !isAuthenticated) {
//     return redirect("/login");
//   }

//   // Check if user is blocked or deleted
//   if (isAuthenticated && user) {
//     if (user.isBlocked || user.isDeleted) {
//       // Clear auth and redirect to login
//       return redirect("/login");
//     }

//     // Check roles
//     if (options?.allowedRoles && !options.allowedRoles.includes(user.role)) {
//       return redirect("/unauthorized");
//     }

//     // Check verification
//     if (options?.requireVerified && !user.isVerified) {
//       return redirect("/verify-email");
//     }
//   }

//   return null;
// };

// const routes = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       // Public routes
//       { 
//         path: "/", 
//         element: <Landing /> 
//       },
      
//       // Auth routes (guest only)
//       { 
//         path: "/login", 
//         element: <Login />,
//         loader: () => checkAuth({ requireGuest: true })
//       },
//       { 
//         path: "/sign-up", 
//         element: <SignUp />,
//         loader: () => checkAuth({ requireGuest: true })
//       },
//       { 
//         path: "/verify-email", 
//         element: <VerifyEmail /> 
//       },
      
//       // Unauthorized page
//       { 
//         path: "/unauthorized", 
//         element: <Unauthorized /> 
//       },

//       // Protected routes
//       {
//         path: "/feed",
//         element: <Feed />,
//         loader: () => checkAuth({ requireAuth: false }),
//         children: [
//           { path: "", element: <FeedHome /> },
//           { path: "messages/:postId", element: <MessagingPage /> },
//           { path: "post/:id", element: <div>Feed Posts.</div> },
//         ],
//       },
      
//       { 
//         path: "/products", 
//         element: <Products />,
//         loader: () => checkAuth({ requireAuth: true, requireVerified: true })
//       },

//       { 
//         path: "/seller", 
//         element: <Seller />,
//         loader: () => checkAuth({ requireAuth: false, allowedRoles: ["seller", "admin"] })
//       },

//       { 
//         path: "/new-listing", 
//         element: <NewListingSteps />,
//         loader: () => checkAuth({ requireAuth: true, allowedRoles: ["seller", "admin"], requireVerified: true })
//       },

//       { 
//         path: "/live", 
//         element: <Live />,
//         loader: () => checkAuth({ requireAuth: false })
//       },
//     ],
//   },
// ]);

// export default routes;


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
import CheckoutPage from "@/pages/CheckoutPage"; // <-- Added
import { store } from "@/store";

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
      // Public routes
      { path: "/", element: <Landing /> },

      // Auth routes (guest only)
      { 
        path: "/login", 
        element: <Login />,
        loader: () => checkAuth({ requireGuest: true })
      },
      { 
        path: "/sign-up", 
        element: <SignUp />,
        loader: () => checkAuth({ requireGuest: true })
      },
      { path: "/verify-email", element: <VerifyEmail /> },

      // Unauthorized page
      { path: "/unauthorized", element: <Unauthorized /> },

      // Protected routes
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

      // Checkout route (new)
      {
        path: "/checkout/:id",
        element: <CheckoutPage />,
        loader: () => checkAuth({ requireAuth: false }) // Optional: only logged-in users
      },

      // Other routes
      { 
        path: "/products", 
        element: <Products />,
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
        path: "/live", 
        element: <Live />,
        loader: () => checkAuth({ requireAuth: false })
      },
    ],
  },
]);

export default routes;
