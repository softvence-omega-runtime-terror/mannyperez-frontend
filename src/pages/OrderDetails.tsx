/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/store/hooks";
import {
  useGetSingleOrderQuery,
  useKelaDeliveryMutation,
  useOrderCompleteMutation
} from "@/store/services/buyer/orderApi";
import { selectCurrentUser } from "@/store/slices/authSlice";
import {
  ArrowLeft,
  CheckCircle,
  Loader2,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";



const formatDate = (value?: string) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toLowerCase(); 
};

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
 const currentUser = useAppSelector(selectCurrentUser);



  const { data, isLoading, refetch } = useGetSingleOrderQuery(orderId ?? "", {
    skip: !orderId,
  });
  console.log("🚀 ~ OrderDetails ~ data:", data)
  
  const [OrderComplete, { isLoading: isUpdatingComplete }] =
    useOrderCompleteMutation()

  const [kelaDelivery, { isLoading: isUpdatingDelivery }] =
    useKelaDeliveryMutation()

  const order = (data as any)?.data ?? data;
 
 
  const [showCancelModal, setShowCancelModal] = useState(false);

  const isSeller = (currentUser?.role || "").toLowerCase() === "seller";


  const isBuyer = (currentUser?.role || "").toLowerCase() === "buyer";


  const product = order?.productId || {};
  const price =
    typeof product?.pricingAndInventory?.[0]?.price === "number"
      ? product.pricingAndInventory[0].price
      : parseFloat(product?.pricingAndInventory?.[0]?.price || "0") || 0;

  const shippingCost =
    typeof order?.shippingCost === "number"
      ? order.shippingCost
      : parseFloat(order?.shippingCost || "0") || 0;

  const subtotal = (order?.quantity || 1) * price;
  const totalCalculated = subtotal + shippingCost + (order?.platformFee || 0);
  const total =
    typeof order?.totalAmount === "number" ? order.totalAmount : totalCalculated;



  const handleStatusUpdate = async () => {
    if (!orderId) return;
    const toastId = toast.loading("Updating status...");
    try {
      let res 
   if(isSeller){
res = await kelaDelivery(orderId)
   
   }
    if(isBuyer){
    res = await OrderComplete(orderId)
 
    
   }
     
      if ((res as any)?.data?.success ) {
        toast.success("Status updated", { id: toastId });
       
        refetch();
      } else {
        toast.error((res as  any).error.data.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error((error as  any).error.data.message || error?.data?.message || "Failed to update status", {
        id: toastId,
      });
    }
  };

  const handleCancel = async () => {
    setShowCancelModal(false);
    await handleStatusUpdate();
  };



  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-pink-500" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Order not found.
      </div>
    );
  }

  const image =
    product?.images?.[0] ||
    product?.imageUrls?.[0] ||
    "https://placehold.co/300x200/F1E6FF/EE2A7B?text=Order";

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      <button
        className="mb-4 inline-flex items-center gap-2 text-gray-700 hover:text-pink-600"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-5 w-5" /> Back
      </button>

      <div className="bg-white rounded-2xl shadow border border-box overflow-hidden border-gray-100 p-6 space-y-6">
        <div className="flex flex-wrap flex-col md:flex-row md:items-center md:justify-between gap-4">
       <div className="flex justify-between items-center gap-2 flex-col md:flex-row w-full">
           <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <h2 className="md:text-2xl font-bold  text-gray-800">{order._id}</h2>
            <p className="text-sm text-gray-500">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div><div className="bg-gray-50 md:w-fit w-full rounded-xl p-4 border border-gray-100">
             <h2 className=" capitalize text-base font-medium">Order Status : <span className="text-primary font-semibold text-lg"> {order.orderStatus}</span> </h2>
             <h2 className=" capitalize text-base font-medium">Payment Status : <span className="text-primary font-semibold text-lg"> {order.paymentStatus}</span> </h2>
          </div>
       </div>
       
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col justify-center items-center md:justify-start md:items-start md:flex-row gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <img
                src={image}
                alt={product?.productInformation?.title || "Product"}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product?.productInformation?.title || "Product"}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {product?.productInformation?.description || "No description"}
                </p>
                <div className="mt-3 space-y-1 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span>
                      Qty: {order?.quantity ?? 1} - ${price.toFixed(2)} each
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-gray-500" />
                    <span>
                      {order?.shippingMethod || "Shipping"} - $
                      {shippingCost.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Shipping Information 
              </h4>
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <MapPin className="h-5 w-5 text-pink-500 mt-0.5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">
                    {order?.shippingAddress || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Buyer Information
              </h4>
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {order?.buyerId?.name || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {order?.buyerId?.email || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm h-fit">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Order Summary
            </h4>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Items ({order?.quantity ?? 1})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform fee</span>
                <span>${(order?.platformFee || 0).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center text-base font-semibold">
                <span>Total</span>
                <span className="text-pink-600">${total.toFixed(2)}</span>
              </div>
            </div>

            {isBuyer ||isSeller && (
              <div className="mt-4">
                <button
                  className="w-full py-2 rounded-lg border isUpdatingComplete border-red-500 bg-primary text-white  cursor-pointer "
                  onClick={() => setShowCancelModal(true)}
                  disabled={
                    isUpdatingDelivery || isUpdatingComplete
                  
                  }
                >
                  Update  Order Status
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showCancelModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle className="h-5 w-5" />
              <h4 className="text-lg font-semibold">Update Order Status?</h4>
            </div>
            <p className="text-sm text-gray-600">
              This will mark the order as cancelled. You can{" "}
              <span className="font-semibold">not</span> undo this action.
            </p>
            <div className="flex  flex-col md:flex-row w-full justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg border isUpdatingComplete border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => setShowCancelModal(false)}
              >
               Cancel 
              </button>
              <button
                className="px-4 py-2  rounded-lg bg-primary text-white "
                onClick={handleCancel}
                disabled={isUpdatingDelivery || isUpdatingComplete}
              >
                {isUpdatingDelivery || isUpdatingComplete ? "Updating..." : isBuyer ? 'Complete Delivery ':"Mark Delivered"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
