import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full py-4 bg-white shadow-md">
      <div className="max-w-[1920px] mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold">BrandLogo</Link>
        <div className="flex space-x-6">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/products">Products</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
