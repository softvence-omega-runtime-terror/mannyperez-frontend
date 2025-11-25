import { StepCard } from './StepCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PricingInventoryStepProps {
  stepNumber?: number;
  price?: string;
  quantity?: string;
  onPriceChange?: (value: string) => void;
  onQuantityChange?: (value: string) => void;
  errors?: { price?: string; quantity?: string };
}

export function PricingInventoryStep({
  stepNumber = 3,
  price = '',
  quantity = '',
  onPriceChange,
  onQuantityChange,
  errors = {},
}: PricingInventoryStepProps) {
  return (
    <StepCard
      stepNumber={stepNumber}
      title="Pricing & Inventory"
      subtitle="Set your price and stock levels"
      isRequired
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="price" className="text-sm font-medium">
            Price
          </Label>
          <Input
            id="price"
            type="text"
            placeholder="Glitter DTF Transfers - A4 Sheets"
            value={price}
            onChange={(e) => onPriceChange?.(e.target.value)}
            className="h-11 border border-border placeholder:text-gray-300"
          />
          {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity" className="text-sm font-medium">
            Quantity
          </Label>
          <Input
            id="quantity"
            type="text"
            placeholder="Glitter DTF Transfers - A4 Sheets"
            value={quantity}
            onChange={(e) => onQuantityChange?.(e.target.value)}
            className="h-11 border border-border placeholder:text-gray-300"
          />
          {errors.quantity && <p className="text-sm text-red-600 mt-1">{errors.quantity}</p>}
        </div>
      </div>
    </StepCard>
  );
}
