import PrimaryButton from "@/reuseableComponents/PrimaryButton";
import { CiShop } from "react-icons/ci";
import statsData from "@/utils/Data/StatsData.json";
import BannerImg from "../../../public/bannerimg.png";
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
    <div className="bg-background-secondary grid grid-cols-2 min-h-[600px] my-12 rounded-xl border-2 border-white px-10">
      <div className="">
        <img src={BannerImg} alt="" />
      </div>
      <div className="grid  place-items-end">
        <div className="place-items-end space-y-4">
          <h1 className="text-foreground">
            DTF Destash <span className="text-accent">Marketplace</span>
          </h1>
          <h5>
            Buy and sell DTF vinyl, fabric, and craft supplies in live events
            with verified sellers
          </h5>
          <div className="flex items-center gap-4 pt-8">
            <PrimaryButton
              type="Outline"
              title="Browse Products"
              className="rounded-full px-6 bg-transparent hover:text-accent-foreground"
            />
            <PrimaryButton
              type="Primary"
              title="Join As A Seller"
              className="rounded-full pl-2  pr-5 gap-2.5"
              leftIcon={
                <CiShop className="size-8 text-accent bg-accent-foreground rounded-full p-1" />
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center w-full mb-8">
          {statsData.map((item, index) => (
            <div
              key={index}
              className="w-full py-8 grid place-items-center border border-white first:rounded-l-xl last:rounded-r-xl bg-white/40"
            >
              <h5 className={` ${statsColor[index]} font-semibold`}>
                {item.value}
              </h5>
              <p className="text-lg">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Wrapper>
  );
}

export default Hero;
