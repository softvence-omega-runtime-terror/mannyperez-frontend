// src/components/layout/Navbar.tsx
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Wrapper from "./Wrapper";
import SearchInput from "../landing/SectionComponents/SearchInput";
import PrimaryButton from "@/reuseableComponents/PrimaryButton";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Sellers", path: "/seller" },
    { name: "Live", path: "/live" },
    { name: "Feed", path: "/feed" },
  ];

  // close mobile menu on route change if you navigate programmatically, or when viewport becomes lg+
  useEffect(() => {
    const handleResize = () => {
      // when viewport becomes >= lg (1024px) close the mobile menu
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
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
          {/* LEFT: Logo + Desktop Links (desktop only at lg+) */}
          <div className="flex items-center gap-8">
            <NavLink to="/" className="flex items-center">
              {/* React serves files from public/ at root path */}
              <img src="/logoDestash.png" alt="DTFdestash" className="w-14 h-auto" />
            </NavLink>

            {/* Desktop Nav Links: show only at lg and above */}
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

          {/* RIGHT: Search + Buttons (desktop only at lg+) */}
          <div className="hidden lg:flex items-center gap-4">
            <SearchInput
              placeholder="Search listings, sellers..."
              onSearch={(e) => console.log(e)}
            />
            <PrimaryButton type="Outline" title="Log In" onClick={() => navigate("/login")} />
            <PrimaryButton type="Primary" title="Sign Up" onClick={() => navigate("/sign-up")} />
          </div>

          {/* MOBILE / TABLET MENU BUTTON: visible below lg (i.e. up to 1023px) */}
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

      {/* MOBILE / TABLET MENU CONTENT (visible below lg) */}
      {isOpen && (
        <div
          className="lg:hidden bg-white border-t border-gray-100 p-4 space-y-4"
          role="dialog"
          aria-modal="true"
        >
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

          {/* Mobile Search */}
          <div>
            <SearchInput
              placeholder="Search listings, sellers..."
              onSearch={(e) => console.log(e)}
            />
          </div>

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-3">
            <PrimaryButton
              type="Outline"
              title="Log In"
              onClick={() => {
                navigate("/login");
                setIsOpen(false);
              }}
            />
            <PrimaryButton
              type="Primary"
              title="Sign Up"
              onClick={() => {
                navigate("/sign-up");
                setIsOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
