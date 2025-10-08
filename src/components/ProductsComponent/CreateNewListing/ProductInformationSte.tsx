import { StepCard } from './StepCard';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ProductInformationStepProps {
  stepNumber?: number;
  title?: string;
  description?: string;
  tags?: string;
  onTitleChange?: (value: string) => void;
  onDescriptionChange?: (value: string) => void;
  onTagsChange?: (value: string) => void;
}

export function ProductInformationStep({
  stepNumber = 2,
  title = '',
  description = '',
  tags = '',
  onTitleChange,
  onDescriptionChange,
  onTagsChange,
}: ProductInformationStepProps) {
  return (
    <StepCard
      stepNumber={stepNumber}
      title="Product Information"
      subtitle="Tell buyers about your product"
      isRequired
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="product-title" className="text-sm font-medium">
            Product Title<span className="">*</span>
          </Label>
          <Input
            id="product-title"
            placeholder="Glitter DTF Transfers - A4 Sheets"
            value={title}
            onChange={(e) => onTitleChange?.(e.target.value)}
            className="h-11 border border-border placeholder:text-gray-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Description<span className="">*</span>
          </Label>
          <Textarea
            id="description"
            placeholder="High-quality glitter DTF transfers perfect for t-shirts, hoodies, and bags. Bulk discounts available for 10+ sheets."
            value={description}
            onChange={(e) => onDescriptionChange?.(e.target.value)}
            className="min-h-[120px] border border-border placeholder:text-gray-300"
          />
          <p className="text-xs text-muted-foreground">
            Describe quality, uses, and any special offers
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags" className="text-sm font-medium">
            Tags<span className="">*</span>
          </Label>
          <Input
            id="tags"
            placeholder="Glitter DTF Transfers - A4 Sheets"
            value={tags}
            onChange={(e) => onTagsChange?.(e.target.value)}
            className="h-11 border border-border placeholder:text-gray-300"
          />
        </div>
      </div>
    </StepCard>
  );
}
