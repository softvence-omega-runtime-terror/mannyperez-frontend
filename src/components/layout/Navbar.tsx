// src/components/layout/Navbar.tsx
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Wrapper from "./Wrapper";
import SearchInput from "../landing/SectionComponents/SearchInput";
import PrimaryButton from "@/reuseableComponents/PrimaryButton";
import { HiMenu, HiX } from "react-icons/hi";
import { Button } from "../ui/button";
import { useLogoutMutation } from "@/store/services/authApi";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout as logoutSlice } from "@/store/slices/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //  Get user from Redux
  const user = useAppSelector((state) => state.auth.user);
  console.log(user)
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  //  Logout mutation
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      // Send refresh token to backend (optional, depends on backend implementation)
      await logout({
        refreshToken: localStorage.getItem("refreshToken"),
      }).unwrap();
    } catch (error) {
      console.warn("Logout API failed, forcing client logout.", error);
    }

    //  Clear Redux auth state
    dispatch(logoutSlice());

    //  Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");

    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Sellers", path: "/seller" },
    { name: "Live", path: "/live" },
    { name: "Feed", path: "/feed" },
  ];

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

  return (
    <nav className="bg-white shadow-md z-40">
      <Wrapper>
        <div className="flex items-center justify-between py-4">
          {/* LEFT: Logo + Desktop Links */}
          <div className="flex items-center gap-8">
            <NavLink to="/" className="flex items-center">
              <img src="/logoDestash.png" alt="DTFdestash" className="w-14 h-auto" />
            </NavLink>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex lg:space-x-6">
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

          {/* RIGHT: Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <SearchInput
              placeholder="Search listings, sellers..."
              onSearch={(e) => console.log(e)}
            />

            {isAuthenticated ? (
              <PrimaryButton
                type="Outline"
                title="Logout"
                onClick={handleLogout}
              />
            ) : (
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

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((s) => !s)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </Wrapper>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 p-4 space-y-4" role="dialog" aria-modal="true">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "block text-pink-600 font-semibold py-2"
                    : "block text-gray-700 hover:text-pink-600 py-2 transition"
                }
                onClick={() => setIsOpen(false)}
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
                  value="Primary"
                  title="Sign Up"
                  onClick={() => {
                    navigate("/sign-up");
                    setIsOpen(false);
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
