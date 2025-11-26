import PrimaryButton from "@/reuseableComponents/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useLogoutMutation } from "@/store/services/authApi";
import { logout as logoutSlice } from "@/store/slices/authSlice";
import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import SearchInput from "../landing/SectionComponents/SearchInput";
import { Button } from "../ui/button";
import Wrapper from "./Wrapper";

import {
  Bookmark,
  CreditCard,
  LogOut,
  MapPin,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";

import AddressBookModal from "./AddressBookModal";
import SettingsModal from "./SettingsModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isAddressBookOpen, setIsAddressBookOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isAuthenticated, accessToken } = useAppSelector((state) => state.auth);

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout(accessToken ? { token: accessToken } : undefined).unwrap();
    } catch (error) {
      console.warn("Logout API failed, forcing client logout.", error);
    }

    dispatch(logoutSlice());

    navigate("/login");
  };

  const commonLinks = [
    { name: "Home", path: "/" },
    { name: "Sellers", path: "/seller" },
    { name: "Live", path: "/live" },
    { name: "Feed", path: "/feed" },
  ];

  const sellerExtraLinks = [
    { name: "Products", path: "/seller/products" },
    { name: "Promotions", path: "/seller/promotions" },
  ];

  const navLinks =
    isAuthenticated && user?.role === "seller"
      ? [...commonLinks, ...sellerExtraLinks]
      : commonLinks;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  const sellerDropdownLinks = [
    { icon: User, label: "Profile", path: "/seller/profile", },
    { icon: Bookmark, label: "Saved Items", path: "/seller/saved-items" },
    {
      icon: MapPin,
      label: "Address Book",
      action: () => setIsAddressBookOpen(true),
    },
 
    {
      icon: Settings,
      label: "Settings",
      action: () => setIsSettingsOpen(true),
    },
  ];

  const buyerDropdownLinks = [
    { icon: User, label: "Profile", path: "/profile" },
    { icon: ShoppingBag, label: "My Orders", path: "/buyer/orders" },
    { icon: Bookmark, label: "Saved Items", path: "/saved-items" },
    {
      icon: MapPin,
      label: "Address Book",
      action: () => setIsAddressBookOpen(true),
    },
    {
      icon: Settings,
      label: "Settings",
      action: () => setIsSettingsOpen(true),
    },
  ];

  const dropdownLinks =
    user?.role === "seller" ? sellerDropdownLinks : buyerDropdownLinks;

  return (
    <nav className="bg-white shadow-md z-40">
      <Wrapper>
        <div className="flex items-center justify-between py-4">
          {/* LEFT */}
          <div className="flex items-center gap-8">
            <NavLink to="/" className="flex items-center">
              <img
                src="/logoDestash.png"
                alt="DTFdestash"
                className="w-14 h-auto"
              />
            </NavLink>

            {/* Desktop Nav */}
            <div className="hidden lg:flex lg:space-x-6">
              {user?.role === "admin" && (
                          <button
                            onClick={() => {
                              setIsDropdownOpen(false);
                              navigate("/admin");
                            }}
                            className="w-full cursor-pointer flex items-center hover:bg-gray-50 rounded-lg text-left"
                          >
                            
                            <span className="text-gray-800">Dashboard</span>
                          </button>
                        )}

              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-pink-600 font-semibold"
                      : "text-gray-700 hover:text-pink-600 transition"
                  }
                >
                  {link.name}
                  
                </NavLink>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden lg:flex items-center gap-5">
            <SearchInput
              placeholder="Search listings, sellers..."
              onSearch={(e) => console.log(e)}
            />

            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-10 cursor-pointer h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-pink-500 transition"
                >
                  <img
                    src={
                      user?.img ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`
                    }
                    alt={user?.name || "User"}
                    className="w-full h-full object-cover"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border-2 border-pink-500 z-50">
                    <div className="p-4 space-y-3 text-center">
                      {/* Avatar */}
                      <div className="flex flex-col items-center">
                        <img
                          src={
                            user?.img ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`
                          }
                          alt={user?.name || "User"}
                          className="w-16 h-16 rounded-full object-cover mb-2"
                        />
                        <span className="font-semibold text-gray-800">
                          {user?.fullName}
                        </span>
                      </div>

                      <div className="space-y-1 mt-2">

                        {/*  ADDED ADMIN DASHBOARD BUTTON */}
                        {user?.role === "admin" && (
                          <button
                            onClick={() => {
                              setIsDropdownOpen(false);
                              navigate("/admin");
                            }}
                            className="w-full cursor-pointer flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left"
                          >
                            <Settings className="w-5 h-5 text-gray-700" />
                            <span className="text-gray-800">Dashboard</span>
                          </button>
                        )}

                        {/* Original dropdown links */}
                        {dropdownLinks.map(({ icon: Icon, label, path, action }) => (
                          <button
                            key={label}
                            onClick={() => {
                              setIsDropdownOpen(false);
                              if (action) action();
                              else if (path) navigate(path);
                            }}
                            className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left"
                          >
                            <Icon className="w-5 h-5 text-gray-700" />
                            <span className="text-gray-800">{label}</span>
                          </button>
                        ))}

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-left mt-2 pt-3 border-t border-gray-200"
                        >
                          <LogOut className="w-5 h-5 text-pink-500" />
                          <span className="text-pink-500 font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!isAuthenticated && (
              <>
                <PrimaryButton
                  type="Outline"
                  title="Log In"
                  onClick={() => navigate("/login")}
                />
                <PrimaryButton
                  type="Primary"
                  title="Sign Up"
                  onClick={() => navigate("/sign-up")}
                />
              </>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <div className="lg:hidden flex items-center">
            <button
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen((s) => !s)}
              className="text-gray-700"
            >
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </Wrapper>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 p-4 space-y-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "block text-pink-600 font-semibold py-2"
                    : "block text-gray-700 hover:text-pink-600 py-2 transition"
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <SearchInput
            placeholder="Search listings, sellers..."
            onSearch={(e) => console.log(e)}
          />

          <div className="flex flex-col gap-3">
            {isAuthenticated ? (
              <PrimaryButton
                type="Outline"
                title="Logout"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              />
            ) : (
              <>
                <PrimaryButton
                  type="Outline"
                  title="Log In"
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                />
                <Button
                  onClick={() => {
                    navigate("/sign-up");
                    setIsOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {isAddressBookOpen && <AddressBookModal onClose={() => setIsAddressBookOpen(false)} />}
      {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
    </nav>
  );
};

export default Navbar;
