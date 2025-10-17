import Wrapper from "../layout/Wrapper";
import { SellersGrid } from "./SellerGrid";
import { SellerProfileCard } from "./SellerProfileCard";

const sellers = [
  {
    badge: "spotlight" as const,
    sellerName: "VinylMaster",
    sellerTier: "platinum" as const,
    sellerTitle: "Seller Of The Month",
    listingsCount: "250+",
    salesCount: "1k+",
    description:
      "Specializing in premium DTF transfers, UV prints, and custom designs. Fast shipping and excellent customer service.",
    productImages: [
      "https://images.unsplash.com/photo-1616628188502-8a391f97a2a1",
      "https://images.unsplash.com/photo-1606813902849-1e5d1b4ddc16",
      "https://images.unsplash.com/photo-1504274066651-8d31a536b11a",
    ],
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    badge: "featured" as const,
    sellerName: "VinylMaster",
    sellerTier: "gold" as const,
    sellerTitle: "Seller Of The Month",
    listingsCount: "250+",
    salesCount: "1k+",
    description:
      "Specializing in premium DTF transfers, UV prints, and custom designs. Fast shipping and excellent customer service.",
    productImages: [
  "https://images.unsplash.com/photo-1616628188502-8a391f97a2a1",
  "https://images.unsplash.com/photo-1606813902849-1e5d1b4ddc16", 
  "https://images.unsplash.com/photo-1504274066651-8d31a536b11a"  
],
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const SellerOfTheMonth = () => {
  return (
    <div className="py-20">
      <Wrapper>
        <div className="text-center">
          <h2>Seller of the Month</h2>
          <p>Our top-performing verified sellers this month</p>
        </div>
        <div className="pt-12 px-4 sm:px-6 lg:px-8">
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {sellers.map((seller, index) => (
                <SellerProfileCard key={index} {...seller} />
              ))}
            </div>
            <SellersGrid/>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default SellerOfTheMonth;
