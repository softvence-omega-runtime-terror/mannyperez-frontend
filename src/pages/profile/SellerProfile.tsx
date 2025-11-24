import React from "react";
import { Button } from "@/components/ui/button";
import { Crown, Heart, MessageCircle, Eye, Bookmark } from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";
import CoverImg from "../../assets/pofileImg/Rectangle 21.png";
import ProfileImg from "../../assets/pofileImg/sellerProf.jpg";
import prod1 from "../../assets/pofileImg/profSide1.png";
import prod2 from "../../assets/pofileImg/profSide2.png";
import sideImgA from "../../assets/pofileImg/profileR1.png";
import sideImgB from "../../assets/pofileImg/profileR2.png";
import sideImgC from "../../assets/pofileImg/profSide3.png";
import sideImgD from "../../assets/pofileImg/profSide4.png";
import Footer from "@/components/layout/Footer";

// Sample product data
const products = [
  {
    id: 1,
    title: "Glitter DTF Transfers — A4 Sheets",
    price: "$8 per sheet",
    images: [sideImgA, sideImgB],
    tags: ["#fabricdestash", "#cottonrolls", "#livesale"],
    likes: 234,
    comments: 89,
    views: "3.2k",
  },
  {
    id: 2,
    title: "Glitter DTF Transfers — A4 Sheets",
    price: "$8 per sheet",
    images: [sideImgA, sideImgB],
    tags: ["#fabricdestash", "#cottonrolls", "#livesale"],
    likes: 234,
    comments: 89,
    views: "3.2k",
  },
];

// Media gallery images
const mediaGallery = [prod1, prod2, sideImgC, sideImgD];

export default function SellerProfile() {
  const primaryPink = "#EE2A7B";
  const secondaryPurple = "#D39DFF";

  return (
    <>
      <div className="min-h-screen bg-gray-50 mb-10">
      {/* === Cover Banner === */}
      <div className="relative h-56 bg-gray-200">
        <img src={CoverImg} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* === Profile Header Section === */}
      <Wrapper>
        <div className="w-full px-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between py-4">
            {/* Left: Avatar and Info */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative -mt-24 sm:-mt-20">
                <img
                  src={ProfileImg}
                  alt="Seller Avatar"
                  className="w-48 h-48 rounded-full border-4 border-white object-cover shadow-lg"
                />
              </div>
              <div className="pt-10 sm:pt-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  Cahhssee Cass
                </h1>
                <div
                  className="inline-flex items-center justify-center px-4 py-0.5 text-sm font-semibold rounded-full"
                  style={{ backgroundColor: secondaryPurple, color: "white" }}
                >
                  <Crown size={18} className="text-black mr-2" />
                  Platinum
                </div>
              </div>
            </div>

            {/* Right: Buttons */}
            <div className="flex gap-3 mt-4 sm:mt-0 items-center">
              <Button
                variant="outline"
                className="px-6 py-2 h-10 rounded-full border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold"
              >
                Message
              </Button>
              <Button
                className="px-6 py-2 h-10 rounded-full text-white font-semibold hover:opacity-90"
                style={{ backgroundColor: primaryPink }}
              >
                Follow Seller
              </Button>
            </div>
          </div>

          {/* === Content Area === */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
            {/* === Left: Product Listings === */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition"
                >
                  <h2 className="font-semibold text-lg mb-3 text-gray-900">
                    {product.title}
                  </h2>

                  {/* Images side-by-side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    {product.images.map((img, idx) => (
                      <div key={idx} className="overflow-hidden rounded-lg">
                        <img
                          src={img}
                          alt="Product"
                          className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {product.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 border border-gray-200 px-2 py-1 rounded-md text-gray-600 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                     <p className="text-lg font-semibold text-gray-900 mb-4">
                    {product.price}
                  </p>
                      <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="px-5 py-1.5 rounded-full text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-100"
                      >
                        Message
                      </Button>
                      <Button
                        className="px-5 py-1.5 rounded-full text-sm font-medium text-white hover:opacity-90"
                        style={{ backgroundColor: primaryPink }}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                  <hr className="my-6" />
                  {/* Buttons and Stats */}
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center gap-4 text-gray-500 text-sm mt-3 sm:mt-0">
                      <div className="flex items-center gap-1">
                        <Heart size={15} /> {product.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={15} /> {product.comments}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={15} /> {product.views}
                      </div>
                    </div>

                    <Button className="bg-white text-black hover:text-white"><Bookmark/></Button>
                  </div>
                </div>
              ))}
            </div>

            {/* === Right Sidebar === */}
            <div className="flex flex-col gap-6">
              {/* About Seller */}
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold mb-2">About This Seller</h3>
                <p className="text-gray-600 text-sm">
                  I sell UV DTF all sizes! DTF prints for adults and kids. Straw
                  toppers, focals, iron on patches big and small, and basically
                  everything. ❤️
                </p>
              </div>

              {/* Badges */}
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold mb-2">Badges</h3>
                <span
                  className="inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full"
                  style={{ backgroundColor: secondaryPurple, color: "white" }}
                >
                  Platinum
                </span>
              </div>

              {/* Media Gallery */}
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold mb-2">Media Gallery</h3>
                <div className="grid grid-cols-2 gap-2">
                  {mediaGallery.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="Media"
                      className="w-full h-20 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
    <Footer/>
    </>
  );
}
