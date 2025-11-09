import React from "react";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import Wrapper from "@/components/layout/Wrapper";

export default function SellerProfile() {
  // Define the deep pink color used in the design
  const primaryPink = '#EE2A7B'; 
  const secondaryPurple = '#D39DFF'; // Used for the badge background/text

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* === Cover Banner === */}
      <div className="relative h-56 bg-gray-200">
        <img
          src="https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1500&h=400&fit=crop"
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* === Profile Header Section === */}
    <Wrapper>
    <div className="w-full px-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between py-4">
          
          {/* Left: Avatar and Info */}
          <div className="flex items-center gap-4 sm:gap-6 -mt-16 sm:-mt-12">
            
            {/* Avatar positioned over the banner */}
            <div className="relative">
              <img
                // NOTE: Replaced the local path with a dynamic URL for demonstration
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" 
                alt="Seller Avatar"
                // Size: w-24 h-24 is a good approximation
                className="w-48 h-48 rounded-full border-4 border-white object-cover shadow-lg"
              />
            </div>
            
            <div className="pt-10 sm:pt-0"> {/* Padding to align text with avatar center */}
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                Cahhssee Cass
              </h1>
              
              {/* Platinum Badge - Styled to match image */}
              <div 
                className="inline-flex items-center justify-center px-4 py-0.5 text-sm font-semibold rounded-full"
                style={{ backgroundColor: secondaryPurple, color: 'white' }}
              >
                Platinum
              </div>
            </div>
          </div>

          {/* Right: Buttons */}
          <div className="flex gap-3 mt-4 sm:mt-0 items-center">
            {/* Message Button (Light Outline) */}
            <Button
              variant="outline"
              className="px-6 py-2 h-10 rounded-full border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold"
            >
              Message
            </Button>
            
            {/* Follow Seller Button (Solid Pink) */}
            <Button 
              className="px-6 py-2 h-10 rounded-full text-white font-semibold"
              style={{ backgroundColor: primaryPink, hover: '#D4236A' }}
            >
              Follow Seller
            </Button>
          </div>
        </div>
      </div>
      
      {/* === Content Area (Below Header) === */}
      <div className="max-w-7xl mx-auto px-6 mt-6 pb-12">
        {/*
          NOTE: This is where the product listings, About Seller, and Media Gallery
          from the screenshot would go. You would place your existing product loop and
          seller info components here.
        */}
        <p className="text-gray-500 text-center py-12 border border-dashed rounded-lg">
          Product Listings and Seller Information sections go here.
        </p>
      </div>
    </Wrapper>
    </div>
  );
}