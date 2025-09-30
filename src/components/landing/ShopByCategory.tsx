import React from "react";
import Wrapper from "../layout/Wrapper";

const ShopByCategory = () => {
  return (
    <div className="py-20">
        <Wrapper>
      <div className="border-b-[#D9E5E9 ]">
        <h2>Shop by 
          <span className="text-accent">Category</span>
        </h2>
        <p className="py-4">Discover products in your favorite crafting categories.</p> 
      </div>
        </Wrapper>
    </div>
  );
};

export default ShopByCategory;
