import React from "react";
import Wrapper from "../layout/Wrapper";
import CategoryCard from "./SectionComponents/CategoryCard";

  const categories = [
    { id: "dtf-transfers", img:"/public/CategoryCard/tshirts.png" , label: "DTF Transfers" },
    { id: "vinyl-sheets", img:"/public/CategoryCard/sheets.png", label: "Vinyl Sheets" },
    { id: "fabrics", img:"/public/CategoryCard/fabrics.svg", label: "Fabrics" },
    { id: "craft-supplies", img:"/public/CategoryCard/supplies.png", label: "Craft Supplies" },
    { id: "equipment", img:"/public/CategoryCard/equipment.png", label: "Equipment" },
    { id: "specialty-items", img:"/public/CategoryCard/star.svg", label: "Specialty Items" },
  ]

const ShopByCategory = () => {
  return (
    <div className="py-10">
        <Wrapper>
      <div className="border-b-[#D9E5E9 ]">
        <h2>Shop by 
          <span className="text-accent">Category</span>
        </h2>
        <p className="py-4">Discover products in your favorite crafting categories.</p> 
      </div>

      <div className="grid grid-cols-6 gap-6 pt-12">
        {
           categories.map((category)=>(
                 <CategoryCard item = {category}/>
           ))
        }
      </div>
        </Wrapper>
    </div>
  );
};

export default ShopByCategory;
