import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
}

export const FeaturedProductCard = ({ image, title, description, price }: ProductCardProps) => {
  const handleAddToCart = () => {
    
  };

  const handleBuyNow = () => {
    
  };

  return (
    <Card className="group overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-lg py-0">
      <div className="aspect-square overflow-hidden bg-primary">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 pt-0">
        <h3 className="mb-2 text-lg font-semibold text-card-foreground">
          {title}
        </h3>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-card-foreground">{price}</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleAddToCart}
              className="transition-colors hover:bg-secondary"
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleBuyNow}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
