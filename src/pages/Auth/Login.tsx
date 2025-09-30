import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 border rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input type="email" placeholder="Email" className="w-full p-2 mb-3 border rounded" />
        <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" />
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Login;
