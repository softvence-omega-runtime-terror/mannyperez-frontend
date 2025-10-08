import { StepCard } from './StepCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PricingInventoryStepProps {
  stepNumber?: number;
  price?: string;
  quantity?: string;
  onPriceChange?: (value: string) => void;
  onQuantityChange?: (value: string) => void;
}

export function PricingInventoryStep({
  stepNumber = 3,
  price = '',
  quantity = '',
  onPriceChange,
  onQuantityChange,
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
        </div>
      </div>
    </StepCard>
  );
}
