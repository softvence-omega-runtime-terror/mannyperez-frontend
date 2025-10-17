import { Star, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import PrimaryButton from "@/reuseableComponents/PrimaryButton";

interface SellerProfileCardProps {
  badge?: "spotlight" | "featured";
  sellerName: string;
  sellerTier: "platinum" | "gold";
  sellerTitle: string;
  listingsCount: string;
  salesCount: string;
  description: string;
  productImages: string[];
  profileImage: string;
}

export function SellerProfileCard({
  badge,
  sellerName,
  sellerTier,
  sellerTitle,
  listingsCount,
  salesCount,
  description,
  productImages,
  profileImage,
}: SellerProfileCardProps) {
  return (
    <div className=" bg-[#FFF8E6] rounded-2xl p-10 space-y-10 shadow-sm hover:shadow-md transition-shadow">
      {/* Badge */}
      <div className="relative w-full h-10">
        {badge && (
          <div
            className={`absolute ${
              badge === "spotlight" ? "left-0" : "right-0"
            } bg-[#FACC15] text-gray-900 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5`}
          >
            <Star className="size-4 fill-current" />
            {badge === "spotlight" ? "Spotlight" : "Featured"}
          </div>
        )}
      </div>

      <div className="space-y-5">
        {/* Profile Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={profileImage || "/placeholder.svg"}
              alt={sellerName}
              className="object-cover"
            />
          </div>
          <div className="">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-gray-900 text-2xl">
                {sellerName}
              </h4>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium ${
                  sellerTier === "platinum"
                    ? "bg-purple-100 text-purple-700 border border-purple-300"
                    : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                }`}
              >
                <BadgeCheck className="size-5" />
                {sellerTier === "platinum" ? "Platinum" : "Gold"}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-0.5">{sellerTitle}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-accent hover:text-[#E91E8C] hover:bg-pink-50 font-medium text-lg flex-shrink-0"
          >
            + Follow
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-3">
          <p className="text-2xl font-bold text-gray-900">
            {listingsCount} Listings • {salesCount} Sales
          </p>
        </div>

        {/* Description */}
        <p className="">
          {description}
        </p>
      </div>
      {/* Product Images */}
      <div className="grid grid-cols-3 gap-2 ">
        {productImages.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Product ${index + 1}`}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* View Profile Button */}
      <PrimaryButton type="Primary" title="View Profile" className="w-full"/>
    </div>
  );
}
