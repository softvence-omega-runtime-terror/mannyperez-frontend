import { StepCard } from './StepCard';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ProductInformationStepProps {
  stepNumber?: number;
  title?: string;
  description?: string;
  tags?: string;
  category?: string;
  onTitleChange?: (value: string) => void;
  onDescriptionChange?: (value: string) => void;
  onTagsChange?: (value: string) => void;
  onCategoryChange?: (value: string) => void;
  errors?: {
    title?: string;
    description?: string;
    tags?: string;
    category?: string;
  };
}

export function ProductInformationStep({
  stepNumber = 2,
  title = '',
  description = '',
  tags = '',
  category = '',
  onTitleChange,
  onDescriptionChange,
  onTagsChange,
  onCategoryChange,
  errors = {},
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
          {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium">
            Category<span className="">*</span>
          </Label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => onCategoryChange?.(e.target.value)}
            className="w-full h-11 border border-border rounded-md px-3 bg-white placeholder:text-gray-300"
          >
            <option value="">Select category</option>
            <option value="DTF">DTF</option>
            <option value="UV">UV</option>
            <option value="SUB">SUB</option>
            <option value="Screen">Screen</option>
            <option value="Finished">Finished</option>
          </select>
          {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
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
          {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
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
          {errors.tags && <p className="text-sm text-red-600 mt-1">{errors.tags}</p>}
        </div>
      </div>
    </StepCard>
  );
}
