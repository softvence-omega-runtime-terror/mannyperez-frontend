import PrimaryButton from "@/reuseableComponents/PrimaryButton";
import { CiShop } from "react-icons/ci";
import statsData from "@/utils/Data/StatsData.json";
import BannerImg from "../../../public/bannerimage2.png";
import Wrapper from "../layout/Wrapper";

const statsColor = [
  "text-[#00506B]",
  "text-[#00A63E]",
  "text-[#229ECF]",
  "text-[#D82479]",
];

function Hero() {
  return (
    <Wrapper>
      <div className="bg-background-secondary xl:flex  min-h-[500px] sm:min-h-[600px] lg:min-h-[600px] my-6 sm:my-8 lg:my-12 rounded-xl border-2 border-white px-4 sm:px-6 lg:px-10 shadow-lg">
        {/* Image Section */}
        <div className="flex items-center justify-center lg-border  xl:w-[680px] h-full">
          <img 
            src={BannerImg} 
            alt="DTF Destash Banner" 
            className="w-full h-full object-contain "
          />
        </div>

        {/* Content Section */}
        <div className="grid xl:place-items-end px-1 sm:px-3 md:px-5">
          <div className=" xl:place-items-end space-y-3 sm:space-y-4 ">
            <h1 className="text-foreground font-bold xl:text-end">
              DTF Destash <span className="text-accent">Marketplace</span>
            </h1>
            <h5 className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-semibold xl:text-end">
              Buy and sell DTF vinyl, fabric, and craft supplies in live events with verified sellers
            </h5>
            
            {/* Buttons */}
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto md:py-2">
              <PrimaryButton
                type="Outline"
                title="Browse Products"
                className="rounded-full px-4 sm:px-6 py-2.5 sm:py-6 bg-transparent hover:text-accent-foreground text-sm sm:text-base whitespace-nowrap"
              />
              <PrimaryButton
                type="Primary"
                title="Join As A Seller"
                className="rounded-full pl-2 pr-4 sm:pr-5 py-2.5 sm:py-6 gap-2 sm:gap-2.5 text-sm sm:text-base whitespace-nowrap"
                leftIcon={
                  <CiShop className="size-7 sm:size-8 text-accent bg-accent-foreground rounded-full p-1" />
                }
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className=" flex w-fit  sm:gap-0 mb-4 sm:mb-6 lg:mb-8 pt-3 sm:pt-4">
            {statsData.map((item, index) => (
              <div
                key={index}
                className={`w-fit py-4 sm:p-6 grid place-items-center border border-white bg-white/40 hover:bg-accent-foreground first:rounded-l-xl last:rounded-r-xl`}
              >
                <h5 className={`${statsColor[index]} font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl`}>
                  {item.value}
                </h5>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 text-center px-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Hero;