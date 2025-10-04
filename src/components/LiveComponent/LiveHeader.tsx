import Wrapper from "../layout/Wrapper";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";

const LiveHeader = () => {
  return (
    <div className="bg-background-secondary">
      <Wrapper>
        <div className="flex items-center justify-between py-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-2.5 border border-black rounded-xl w-fit">
              <FaCircleChevronLeft className="size-5" />
            </div>
            <h3>Fabric Destash Live - Premium Cotton Rolls</h3>
          </div>
          <div className="flex gap-4">
            <p className="bg-[#E00543] text-white px-6 py-1 rounded-full">
              Live
            </p>
            <div className="flex items-center gap-2">
              <FaEye className="size-6" />
              <p>32k Watching</p>
            </div>
          </div>
        </div>
        <div className="text-2xl flex items-center gap-4">
            <span className="p-2 border border-black rounded-lg">
            <MdExitToApp/>
            </span>
            <span className="p-2 bg-[#E00543] text-white rounded-lg">
            <FaHeart />
            </span>
        </div>
        </div>
      </Wrapper>
    </div>
  );
};
export default LiveHeader;
