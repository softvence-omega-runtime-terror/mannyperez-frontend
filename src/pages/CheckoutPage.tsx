/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckoutSidebar from "@/components/CheckoutComponent/CheckoutSidebar";
import OrderSummary from "@/components/CheckoutComponent/OrderSummary";
import ShippingMethod, {
  SHIPPING_OPTIONS,
} from "@/components/CheckoutComponent/ShippingMethod";
import { useCreateOrderMutation } from "@/store/services/orderApi";
import { useGetProductByIdQuery } from "@/store/services/productsApi";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

type CheckoutForm = {
  shippingAddress: string;
};

// const PLATFORM_FEE = 1;

const CheckoutPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id!;

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });

  const [createOrder, { isLoading: isPlacingOrder }] = useCreateOrderMutation();
  const [selectedShippingId, setSelectedShippingId] = useState<number>(
    SHIPPING_OPTIONS[0].id
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CheckoutForm>({
    mode: "onChange",
    defaultValues: {
      shippingAddress: "",
    },
  });

  const selectedShipping = useMemo(
    () =>
      SHIPPING_OPTIONS.find((opt) => opt.id === selectedShippingId) ||
      SHIPPING_OPTIONS[0],
    [selectedShippingId]
  );

  const shippingCostNumber = useMemo(() => {
    const numeric = parseFloat(selectedShipping.price.replace(/[^0-9.]/g, ""));
    return Number.isNaN(numeric) ? 0 : numeric;
  }, [selectedShipping]);
  const priceFromApi = (product as any)?.pricingAndInventory?.[0]?.price ?? 0;
  const productPriceNumber = useMemo(() => {
    return typeof priceFromApi === "number"
      ? priceFromApi
      : parseFloat(priceFromApi || "0") || 0;
  }, [priceFromApi]);

  const onSubmit = async (form: CheckoutForm) => {
    const id = toast.loading("Placing order...");
    try {
      const res = await createOrder({
        productId: productId,
        shippingAddress: form.shippingAddress,
        shippingMethod: selectedShipping.name,
        shippingCost: shippingCostNumber,
        priceId: product?.pricingAndInventory?.[0]._id ?? "",
        isDue: false,
      });

      if ((res as any).data?.success) {
        toast.success("Order placed successfully! Routing To Payment Page", {
          id,
        });
        const url = (res as any)?.data?.data?.stripeUrl;

        if (url) {
          window.location.assign(url);
        }
      } else {
        toast.error("Failed to place order. Please try again.", { id });
      }
    } catch (error: any) {
      const message =
        error?.data?.message ||
        error?.message ||
        "Failed to place order. Please try again.";
      toast.error(message, { id });
    }
  };

  const derivedProduct = {
    title:
      (product as any)?.productInformation?.title ||
      (product as any)?.title ||
      "Product",
    price:
      typeof productPriceNumber === "number"
        ? `$${productPriceNumber.toFixed(2)}`
        : "$0.00",
    imageUrls: (product as any)?.images ||
      (product as any)?.imageUrls ||
      (product as any)?.media || ["/dummy/image_d19c84.png"],
    description:
      (product as any)?.productInformation?.description ||
      (product as any)?.description ||
      "No description provided.",
    sellerName:
      (product as any)?.sellerId?.name ||
      (product as any)?.sellerId?.userName ||
      "Seller",
  };

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9 space-y-6">
          {isLoading && (
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              Loading product...
            </div>
          )}

          {isError && (
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100 text-red-600">
              Failed to load product.
            </div>
          )}

          {!isLoading && !isError && <OrderSummary product={derivedProduct} />}

          <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
            <ShippingMethod
              initialSelectionId={selectedShippingId}
              onShippingSelect={(id) => setSelectedShippingId(id)}
            />

            <form className="space-y-4 mt-8" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800 mb-2 ">
                  Shipping Address
                </h1>
                <textarea
                  className={`w-full rounded-lg border px-3 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                    errors.shippingAddress
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  rows={4}
                  placeholder="Street, City, State, ZIP / Postal Code"
                  {...register("shippingAddress", {
                    required: "Shipping address is required",
                    minLength: {
                      value: 6,
                      message: "Please enter a valid address",
                    },
                  })}
                />
                {errors.shippingAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.shippingAddress.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-3">
          <CheckoutSidebar
            subtotal={productPriceNumber}
            shipping={shippingCostNumber}
            // platformFee={PLATFORM_FEE}
            isSubmitting={isPlacingOrder}
            onPlaceOrder={() => {
              if (!isValid) {
                toast.warning(
                  "Please add a shipping address before placing the order."
                );
                return;
              }
              handleSubmit(onSubmit)();
            }}
          />
          <div className="mt-2  bg-white p-2 rounded-lg   border-box">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
              <p className="text-xs uppercase text-gray-500 font-semibold mb-1">
                Seller
              </p>
              <p className="text-md font-semibold text-gray-800">
                {derivedProduct.sellerName}
              </p>
              <p className="text-xs text-wrap text-gray-500 mt-1">
                ID: {(product as any)?._id || productId}
              </p>
            </div>
            <div className="bg-gray-50 mt-2  border border-gray-200 rounded-lg p-4">
              <p className="text-xs uppercase text-gray-500 font-semibold mb-1">
                Selected Shipping
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {selectedShipping.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Cost: ${shippingCostNumber.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
