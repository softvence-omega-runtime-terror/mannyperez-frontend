
import Wrapper from "../layout/Wrapper";
import CreateNewListing from "./CreateNewListing";
import MyLiveEvent from "./MyLiveEvent";
import ProductPost from "./ProductPost";
import QuickStats from "./QuickStats";
import RecentActivity from "./RecentActivity";

const ProductsContainer = () => {
  return (
    <Wrapper>
    <div className="flex gap-6">
      <div className="flex-2">
      <div className="flex gap-6">
        <CreateNewListing/>
      </div>
        <MyLiveEvent/>
        <ProductPost/>
      </div>
      <div className="flex-1">
        <QuickStats/>
        <RecentActivity/>
      </div>
    </div>
    </Wrapper>
  );
};

export default ProductsContainer;