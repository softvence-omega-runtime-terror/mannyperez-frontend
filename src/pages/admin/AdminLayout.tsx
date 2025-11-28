import { useAppSelector } from "@/store/hooks";
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAuthenticated, accessToken } = useAppSelector((state) => state.auth);
  console.log(user, "from admin")

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* MOBILE OVERLAY (BACKDROP BLUR) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 backdrop-blur-[2px] bg-black/10 z-20 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-30
          h-screen w-72 bg-white border-r border-gray-200 p-6
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Admin</h1>
          <p className="text-xs text-gray-500">Control Center</p>
        </div>

        <nav className="space-y-1">
          {[
            { to: "/admin", label: "Dashboard" },
            { to: "/admin/users", label: "Users" },
            { to: "/admin/listings", label: "Listings" },
            { to: "/admin/incidents", label: "Incidents" },
            { to: "/admin/settings", label: "Settings" },
            { to: "/admin/payouts", label: "Payout" },
            { to: "/admin/reports", label: "Reports" },
            { to: "/admin/categories", label: "Categories" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-pink-50 text-pink-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 border-t pt-4 text-xs text-gray-500">
          <p>
            Environment:{" "}
            <span className="font-medium text-gray-700">Development</span>
          </p>
          <p className="mt-2">
            Version: <span className="font-medium text-gray-700">0.1.0</span>
          </p>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Admin Dashboard
              </h2>
              <p className="text-sm text-gray-500">Overview & management</p>
            </div>
          </div>

          {/* PROFILE */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden">
              <img src="/dummy/profile.jpg" className="w-full h-full object-cover" />
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-800">Admin</div>
              <div className="text-xs text-gray-500">admin@demo.com</div>
            </div>
          </div>
        </header>

        {/* DYNAMIC PAGE CONTENT USING OUTLET */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
