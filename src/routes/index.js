import { jsx as _jsx } from "react/jsx-runtime";
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
const routes = createBrowserRouter([
    {
        path: "/",
        element: _jsx(App, {}), // root layout
        children: [
            { path: "/", element: _jsx(Landing, {}) },
            { path: "/seller", element: _jsx(Seller, {}) },
            {
                path: "/feed",
                element: _jsx(Feed, {}), // Feed layout with left & right columns
                children: [
                    { path: "", element: _jsx(FeedHome, {}) }, // default content for left column
                    { path: "messages/:postId", element: _jsx(MessagingPage, {}) },
                    { path: "post/:id", element: _jsx("div", { children: "Feed Posts." }) }, // example nested route
                ]
            },
            { path: "/login", element: _jsx(Login, {}) },
            { path: "/sign-up", element: _jsx(SignUp, {}) },
            { path: "/", element: _jsx(Landing, {}) },
            { path: "/seller", element: _jsx(Seller, {}) },
            { path: "/live", element: _jsx(Live, {}) },
            { path: "/login", element: _jsx(Login, {}) },
            { path: "/sign-up", element: _jsx(SignUp, {}) },
        ],
    },
]);
export default routes;
