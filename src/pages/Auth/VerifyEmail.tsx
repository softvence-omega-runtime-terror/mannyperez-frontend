/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useVerifyEmailMutation } from "@/store/services/authApi";
import { setCredentials } from "@/store/slices/authSlice";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const verifyEmail = () => {
    const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const location = useLocation();
    const navigate = useNavigate();

    // Get email from navigation state
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
        } else {
            // If no email in state, redirect back or handle accordingly
            navigate("/login");
        }
    }, [location.state, navigate]);

    // Form state
    const [formData, setFormData] = useState({
        code: "",
    });

    // Validation errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Code validation
        if (!formData.code) {
            newErrors.code = "Verification code is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        try {
            const result = await verifyEmail({
                email: email || "",
                code: formData.code,
            }).unwrap();

            if (result) {
                const payload = (result as any)?.data ?? result;
                const token = payload?.approvalToken ?? payload?.token;
                const refreshToken = payload?.refreshToken ?? null;
                const verifiedUser = payload?.user;
                if (verifiedUser && token) {
                    dispatch(setCredentials({ user: verifiedUser, accessToken: token, approvalToken: payload?.approvalToken, refreshToken }));
                }
                navigate("/feed");
            }

         
        } catch (err: any) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const errorMessage =
                err?.data?.message ||
                err?.message ||
                "Verification failed. Please check your code and try again.";
        }
    };

    // If already authenticated, show welcome message
    if (isAuthenticated && user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-secondary">
                <div className="max-w-md mx-auto p-12 bg-[#F9ECF3] rounded-3xl shadow-xl border-2 border-white text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Verify Your Email
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
            <div className="flex flex-col gap-22 w-7xl mx-auto p-12 bg-[#F9ECF3] rounded-3xl shadow-xl border-2 border-white">
                <div>
                    <h1 className="text-4xl font-bold text-center mb-8">
                        Verify Your Email
                    </h1>
                    <p className="text-center">We've sent a verification link to your email</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>

                        <input
                            type="number"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder="123456"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${errors.code ? "border-red-500" : "border-gray-300"
                                }`}
                            disabled={isLoading}
                        />
                        {errors.code && (
                            <p className="text-red-500 text-sm mt-1">{errors.code}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full text-white py-6 rounded-lg text-base font-medium"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                                Verifying...
                            </span>
                        ) : (
                            "Verify Email"
                        )}
                    </Button>

                    <p className="text-center text-gray-800 mt-6">
                        Didn't receive an email? Check your spam folder or <br />

                        <Link to="/signup" className="font-bold hover:text-primary transition">
                            Contact Support
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default verifyEmail;
