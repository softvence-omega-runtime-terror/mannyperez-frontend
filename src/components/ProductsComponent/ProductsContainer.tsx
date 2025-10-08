
import Wrapper from "../layout/Wrapper";
import CreateNewListing from "./CreateNewListing";
import { MyLiveEvent } from "./MyLiveEvent";

import ProductPost from "./ProductPost";
import QuickStats from "./QuickStats";
import RecentActivity from "./RecentActivity";

const ProductsContainer = () => {
  return (
    <Wrapper>
    <div className="lg:flex gap-6 px-6 lg:px-0 space-y-6">
      <div className="flex-2 space-y-6">
      <div className="flex gap-6">
        <CreateNewListing/>
      </div>
        <MyLiveEvent/>
        <ProductPost/>
      </div>
      <div className="flex-1 space-y-6">
        <QuickStats/>
        <RecentActivity/>
      </div>
    </div>
    </Wrapper>
  );
};

export default ProductsContainer;