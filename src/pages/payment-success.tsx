
import { useGetSinglePaymentQuery } from "@/store/services/payments";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentSuccessPage = () => {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetSinglePaymentQuery(paymentId!);
  const paymentData = data?.data;

  if (isLoading || !paymentData) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  const { paymentType, totalAmount, paymentStatus, contextId, buyerId } = paymentData;

  const renderContentByType = () => {
    switch (paymentType) {
      case "create-event":
        return (
          <Card className="max-w-lg w-full">
            <CardHeader>
              <CardTitle>🎉 Your Live Event is Scheduled!</CardTitle>
              <CardDescription>Your event has been successfully created.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Title:</strong> {contextId.title}</p>
              <p><strong>Description:</strong> {contextId.description}</p>
              <p><strong>Date & Time:</strong> {format(new Date(contextId.startAt), "PPPpp")}</p>
              <p><strong>Duration:</strong> {contextId.durationMinutes} mins</p>
              <p>
                <strong>Status:</strong>{" "}
                <Badge variant={contextId.status === "scheduled" ? "secondary" : "destructive"}>
                  {contextId.status}
                </Badge>
              </p>
              <p><strong>Access Fee:</strong> ${contextId.accessFee}</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => navigate("/live")}>Return to Live Events</Button>
            </CardFooter>
          </Card>
        );

      case "purchase-product":
        return (
          <Card className="max-w-lg w-full">
            <CardHeader>
              <CardTitle>🎉 Purchase Successful!</CardTitle>
              <CardDescription>Your payment has been completed successfully.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Buyer:</strong> {buyerId.name}</p>
              <p><strong>Email:</strong> {buyerId.email}</p>
              <p><strong>Amount Paid:</strong> ${totalAmount}</p>
              <p><strong>Payment Status:</strong> {paymentStatus}</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => navigate("/feed")}>Return to Feed</Button>
            </CardFooter>
          </Card>
        );

      default:
        return (
          <Card className="max-w-lg w-full">
            <CardHeader>
              <CardTitle>🎉 Payment Successful!</CardTitle>
              <CardDescription>Your payment has been completed successfully.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Amount Paid:</strong> ${totalAmount}</p>
              <p><strong>Payment Status:</strong> {paymentStatus}</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => navigate("/feed")}>Return to Feed</Button>
            </CardFooter>
          </Card>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center mb-10">
        <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
        <h1 className="text-4xl font-bold mt-4">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">
          Thank you for completing your payment. Below are the details.
        </p>
      </div>

      {renderContentByType()}
    </div>
  );
};

export default PaymentSuccessPage;
