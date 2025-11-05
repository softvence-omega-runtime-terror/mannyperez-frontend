import Footer from "@/components/layout/Footer";
import UserNavbar from "@/components/layout/UserNavbar";
import ProductsContainer from "@/components/ProductsComponent/ProductsContainer";



const Products = () => {

  return (
    <div className="">
      <UserNavbar/>
      <div className="py-6">
        <ProductsContainer/>
      </div>
      <Footer/>
    </div>
  );
};

export default Products;