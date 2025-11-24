/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { useLoginMutation, useSellerLoginMutation } from "@/store/services/authApi";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  // Mutations
  const [loginBuyer, { isLoading: isBuyerLoading }] = useLoginMutation();
  const [loginSeller, { isLoading: isSellerLoading }] = useSellerLoginMutation();

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Login mode (Buyer / Seller)
  const [loginMode, setLoginMode] = useState<"buyer" | "seller">("buyer");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isLoading = isBuyerLoading || isSellerLoading;

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const input = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      let result;

      // API condition
      if (loginMode === "buyer") {
        result = await loginBuyer(input).unwrap();
      } else {
        result = await loginSeller(input).unwrap();
        
      }
console.log("🚀 ~ handleSubmit ~ result:", result)
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err: any) {
      const message =
        err?.data?.message ||
        err?.message ||
        "Login failed. Please check your credentials.";

      toast.error(message);
    }
  };

  // If already logged in
  if (isAuthenticated && user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary">
        <div className="max-w-md mx-auto p-12 bg-[#F9ECF3] rounded-3xl shadow-xl border-2 border-white text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome, <span className="text-primary">{user.name}!</span>
          </h1>
          <p className="text-gray-600 mb-6">You're already logged in.</p>
          <Button onClick={() => navigate("/")} className="w-full">
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <div className="w-7xl mx-auto p-12 bg-[#F9ECF3] rounded-3xl shadow-xl border-2 border-white">

        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome Back, <span className="text-primary">Login!</span>
        </h1>

        {/* Login Tabs */}
        <div className="flex mb-6 bg-white/60 p-1 rounded-lg w-full">
          <button
            type="button"
            onClick={() => setLoginMode("buyer")}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              loginMode === "buyer"
                ? "bg-primary text-white"
                : "bg-transparent text-gray-700"
            }`}
          >
            Buyer Login
          </button>

          <button
            type="button"
            onClick={() => setLoginMode("seller")}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              loginMode === "seller"
                ? "bg-primary text-white"
                : "bg-transparent text-gray-700"
            }`}
          >
            Seller Login
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block font-medium text-gray-800 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium text-gray-800 mb-2">
              Password <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent pr-12 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isLoading}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                disabled={isLoading}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember and Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberPassword}
                onChange={(e) => setRememberPassword(e.target.checked)}
                className="w-4 h-4 text-pink-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <span className="ml-2 text-sm text-gray-700">Remember Password</span>
            </label>

            <Link to="/forgot-password" className="text-sm text-gray-700 hover:text-pink-500">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full text-white py-6 rounded-lg text-base font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          {/* ❌ Google + Apple removed */}

          {/* Sign Up */}
          <p className="text-center text-gray-800 mt-6">
            Don’t have an account?{" "}
            <Link to="/sign-up" className="font-bold hover:text-primary">
              Sign Up
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;
