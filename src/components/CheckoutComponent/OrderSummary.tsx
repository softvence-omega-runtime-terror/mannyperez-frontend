import React from "react";

type SummaryProduct = {
  title: string;
  price: string;
  priceValue?: number;
  imageUrls?: string[];
  description?: string;
  sellerName?: string;
};

interface Props {
  product: SummaryProduct;
}

const OrderSummary: React.FC<Props> = ({ product }) => {
  const imageUrl = product.imageUrls?.[0];

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
      <h3 className="text-xl font-bold mb-4">Order Summary</h3>
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-tr from-pink-400 to-purple-500">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex-grow">
          <h4 className="text-lg font-semibold">{product.title}</h4>
          {/* <p className="text-sm text-gray-500">
            by {product.sellerName || "Seller"}
            <span className="ml-2 text-xs font-semibold text-yellow-800 bg-yellow-100 px-2 py-0.5 rounded-full">
              Gold
            </span>
          </p> */}
          {product.description && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-md font-medium text-gray-600">
            {product.price} each
          </p>
        
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
