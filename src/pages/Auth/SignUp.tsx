import { Button } from "@/components/ui/button";
import React from "react";

const SignUp = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 border rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <input type="text" placeholder="Full Name" className="w-full p-2 mb-3 border rounded" />
        <input type="email" placeholder="Email" className="w-full p-2 mb-3 border rounded" />
        <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" />
        <Button className="w-full">Sign Up</Button>
      </div>
    </div>
  );
};

export default SignUp;
