import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentCancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center mb-10">
        <AlertCircle className="mx-auto h-20 w-20 text-red-500" />
        <h1 className="text-4xl font-bold mt-4">Payment Cancelled</h1>
        <p className="text-gray-600 mt-2">
          Your payment was not completed. You can return to the feed and try
          again.
        </p>
      </div>

      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle>Payment Status</CardTitle>
          <CardDescription>
            No payment has been processed for this transaction.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button onClick={() => navigate("/feed")}>Return to Feed</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentCancelPage;
