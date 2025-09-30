import React from "react";
import { NavLink } from "react-router-dom";
import Wrapper from "./Wrapper";
import SearchInput from "../landing/SearchInput";
import PrimaryButton from "@/reuseableComponents/PrimaryButton";

const Navbar = () => {
  return (
    <nav className="w-full py-4 bg-white shadow-md">
      <Wrapper>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <NavLink to="/" className="text-2xl font-bold">
              <img src="/public/DTFdestash.png" className="size-20" alt="" />
            </NavLink>
            <div className="flex space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-accent font-semibold" : ""
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/seller"
                className={({ isActive }) =>
                  isActive ? "text-accent font-semibold" : ""
                }
              >
                Sellers
              </NavLink>
              <NavLink
                to="/live"
                className={({ isActive }) =>
                  isActive ? "text-accent font-semibold" : ""
                }
              >
                Live
              </NavLink>
            </div>
          </div>
          <div className="flex items-center justify-center gap-5">
            <SearchInput
              placeholder="Search listigs,sellers..."
              onSearch={(e) => console.log(e)}
            />

            <PrimaryButton type="Outline" title="Log In" className="hover:text-primary-foreground" />
            <PrimaryButton type="Primary" title="Sign Up" className="" />
          </div>
        </div>
      </Wrapper>
    </nav>
  );
};

export default Navbar;
