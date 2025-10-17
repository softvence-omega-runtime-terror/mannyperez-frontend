import React from "react";
import Wrapper from "../layout/Wrapper";
import CategoryCard from "./SectionComponents/CategoryCard";

const categories = [
  { id: "dtf-transfers", img: "/public/CategoryCard/tshirts.png", label: "DTF Transfers" },
  { id: "vinyl-sheets", img: "/public/CategoryCard/sheets.png", label: "Vinyl Sheets" },
  { id: "fabrics", img: "/public/CategoryCard/fabrics.svg", label: "Fabrics" },
  { id: "craft-supplies", img: "/public/CategoryCard/supplies.png", label: "Craft Supplies" },
  { id: "equipment", img: "/public/CategoryCard/equipment.png", label: "Equipment" },
  { id: "specialty-items", img: "/public/CategoryCard/star.svg", label: "Specialty Items" },
]

const ShopByCategory = () => {
  return (
    <div className="py-10 xl:py-20">
      <Wrapper>
        {/* Header Section */}
        <div className="border-b border-b-[#D9E5E9]">
          <h2 className="">
            Shop by{" "}
            <span className="text-accent">Category</span>
          </h2>
          <p className="py-4">
            Discover products in your favorite crafting categories.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 md:gap-5 lg:gap-6 pt-8 sm:pt-10 lg:pt-12">
          {categories.map((category) => (
            <CategoryCard key={category.id} item={category} />
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default ShopByCategory;