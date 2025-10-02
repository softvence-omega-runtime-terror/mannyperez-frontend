import { useState } from "react";
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

  return (
    <nav className=" bg-white shadow-md">
      <Wrapper>
        <div className="flex items-center justify-between py-4">
          {/* Logo + Desktop Links */}
          <div className="flex items-center gap-5">
            <NavLink to="/" className="flex items-center">
              <img
                src="/public/logoDestash.png"
                alt="DTFdestash"
                className="size-14 w-auto"
              />
            </NavLink>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex lg:space-x-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-accent font-semibold"
                      : "text-gray-700 hover:text-accent transition"
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-5">
            <SearchInput
              placeholder="Search listings, sellers..."
              onSearch={(e) => console.log(e)}
            />
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
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center ">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </Wrapper>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "block text-accent font-semibold"
                  : "block text-gray-700 hover:text-accent transition"
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}

          <SearchInput
            placeholder="Search listings, sellers..."
            onSearch={(e) => console.log(e)}
          />

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
