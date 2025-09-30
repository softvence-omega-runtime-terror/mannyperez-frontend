import React from "react";
import Wrapper from "../layout/Wrapper";

const TrendingListing = () => {
  return (
    <div className="py-10">
      <Wrapper>
      <div className="border-b-[#D9E5E9 ]">
        <div className="flex items-center gap-1">
          <img src="/public/FireSVG.svg" alt="" />
        <h2>Trending
          <span className="text-accent">Listing</span> 
        </h2>
        </div>
        <p className="py-4">Most popular items right now from verified sellers.</p>
      </div>
      </Wrapper>
    </div>
  );
};

export default TrendingListing;
