import Wrapper from "../layout/Wrapper";
import { FeaturedProductCard } from "./FeaturedProductCard";

const products = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Premium Cotton Roll – Navy Blue",
    description: "High-quality 100% cotton fabric, perfect for quilting and crafting projects.",
    price: "$24.99",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1617036945611-d53f1c2db9d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Premium Cotton Roll – Navy Blue",
    description: "High-quality 100% cotton fabric, perfect for quilting and crafting projects.",
    price: "$24.99",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1620799139464-490b2dd8b15a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Premium Cotton Roll – Navy Blue",
    description: "High-quality 100% cotton fabric, perfect for quilting and crafting projects.",
    price: "$24.99",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1602810318383-e6a59b6fc56b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Premium Cotton Roll – Navy Blue",
    description: "High-quality 100% cotton fabric, perfect for quilting and crafting projects.",
    price: "$24.99",
  },
];





const FeaturedProducts = () => {
  return (
    <div className="py-14">
        <Wrapper>
    <div className="space-y-6">
      <h3>FeaturedProducts</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <FeaturedProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
    </div>
        </Wrapper>
    </div>
  );
};
export default FeaturedProducts;
