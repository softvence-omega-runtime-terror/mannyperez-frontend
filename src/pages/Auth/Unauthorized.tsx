import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

const Unauthorized = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
                <div className="mb-6">
                    <svg
                        className="mx-auto h-16 w-16 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Access Denied
                </h1>
                
                <p className="text-gray-600 mb-6">
                    You don't have permission to access this page.
                </p>

                {user && (
                    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                        <p className="text-sm text-gray-700">
                            <strong>Your role:</strong> {user.role}
                        </p>
                        {!user.isVerified && (
                            <p className="text-sm text-yellow-600 mt-2">
                                ⚠️ Email verification required
                            </p>
                        )}
                    </div>
                )}

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
