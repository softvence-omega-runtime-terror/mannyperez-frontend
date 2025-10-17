import TrendingProductCard from "@/reuseableComponents/TrendingProductCard";
import Wrapper from "../layout/Wrapper";
import TrendingProducts from "@/utils/Data/TrendingProducts.json";

const TrendingListing = () => {

  return (
    <div className="py-10 xl:py-20 bg-accent-foreground">
      <Wrapper>
        <div className="space-y-6 xl:space-y-12">
          <div className="border-b border-b-[#D9E5E9]">
            <div className="flex items-center gap-1">
              <img src="/public/FireSVG.svg" alt="" />
              <h2>
                Trending
                <span className="text-accent">Listing</span>
              </h2>
            </div>
            <p className="py-4">
              Most popular items right now from verified sellers.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6">
            {TrendingProducts.map((product) => (
              <TrendingProductCard item={product} />
            ))}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default TrendingListing;
