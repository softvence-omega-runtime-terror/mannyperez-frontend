/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useLoginMutation, useSellerLoginMutation } from "@/store/services/authApi";
import { setCredentials } from "@/store/slices/authSlice";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type LoginForm = {
  email: string;
  password: string;
  rememberPassword: boolean;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginBuyer, { isLoading: isBuyerLoading }] = useLoginMutation();
  const [loginSeller, { isLoading: isSellerLoading }] = useSellerLoginMutation();

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const [loginMode, setLoginMode] = useState<"buyer" | "seller">("buyer");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
      rememberPassword: false,
    },
  });

  const isLoading = isBuyerLoading || isSellerLoading;


  const onSubmit = async (data: LoginForm) => {
    try {
      const input = {
        email: data.email.trim().toLowerCase(),
        password: data.password,
      };

      let result;

      if (loginMode === "buyer") {
        result = await loginBuyer(input).unwrap();
      } else {
        result = await loginSeller(input).unwrap();
      }

 

      const payload = (result as any)?.data ?? result;
 

      const accessToken = payload?.approvalToken ?? payload?.token;
      const refreshToken = payload?.refreshToken ?? null;

      if (payload.user && accessToken) {
        // also drop tokens into localStorage for manual fallback
        if (accessToken) localStorage.setItem("auth.accessToken", accessToken);
        if (refreshToken) localStorage.setItem("auth.refreshToken", refreshToken);
        localStorage.setItem("auth.user", JSON.stringify(payload.user));

        dispatch(
          setCredentials({
            user: payload.user,
            accessToken,
            refreshToken,
            approvalToken: payload?.approvalToken,
          })
        );
        toast.success("Logged in successfully!");
           navigate("/");
        return;
      }

    


  
   
    } catch (err: any) {
      console.log("Error:", err);

      const message =
        err?.data?.message ||
        err?.message ||
        "Login failed. Please check your credentials.";

      toast.error(message);

      // show error in UI field
      setError("email", { message });
    }
  };

  // Already authenticated UI
  if (isAuthenticated && user) {
    return (
      <div className="flex items-center justify-center min-h-[80dvh] bg-secondary">
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
        <div className="flex mb-6 bg-white/60 p-1 gap-2 rounded-lg w-full">
          <button
            type="button"
            onClick={() => setLoginMode("buyer")}
            className={`flex-1 py-3 cursor-pointer rounded-lg font-semibold transition ${
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
            className={`flex-1 py-3 cursor-pointer rounded-lg font-semibold transition ${
              loginMode === "seller"
                ? "bg-primary text-white"
                : "bg-transparent text-gray-700"
            }`}
          >
            Seller Login
          </button>
        </div>

        {/* FORM (HOOK FORM) */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block font-medium text-gray-800 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
                onChange: () => clearErrors("email"),
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
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
                placeholder="••••••••••••"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 pr-12 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isLoading}
                {...register("password", {
                  required: "Password is required",
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-pink-500 border-gray-300 rounded"
                {...register("rememberPassword")}
              />
              <span className="ml-2 text-sm text-gray-700">
                Remember Password
              </span>
            </label>

            <Link
              to="/forgot-password"
              className="text-sm text-gray-700 hover:text-pink-500"
            >
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
