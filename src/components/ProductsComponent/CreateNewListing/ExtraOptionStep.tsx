import { useState } from 'react';
import { StepCard } from './StepCard';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ExtraOptionsStepProps {
  stepNumber?: number;
  hasVariants?: boolean;
  onVariantsToggle?: (value: boolean) => void;
  variants?: { size: string; color: string }[];
  onVariantsChange?: (variants: { size: string; color: string }[]) => void;
}

export function ExtraOptionsStep({
  stepNumber = 4,
  hasVariants = false,
  onVariantsToggle,
  variants = [],
  onVariantsChange,
}: ExtraOptionsStepProps) {
  const [localVariants, setLocalVariants] = useState(variants);

  const handleAddVariant = () => {
    const updated = [...localVariants, { size: '', color: '' }];
    setLocalVariants(updated);
    onVariantsChange?.(updated);
  };

  const handleVariantChange = (index: number, field: 'size' | 'color', value: string) => {
    const updated = [...localVariants];
    updated[index][field] = value;
    setLocalVariants(updated);
    onVariantsChange?.(updated);
  };

  const handleRemoveVariant = (index: number) => {
    const updated = [...localVariants];
    updated.splice(index, 1);
    setLocalVariants(updated);
    onVariantsChange?.(updated);
  };

  return (
    <StepCard
      stepNumber={stepNumber}
      title="Extra Options"
      subtitle="Add variants and shipping details"
    >
      {/* Toggle */}
      <div className="flex items-center justify-between py-4 border border-border px-4 rounded-xl mb-4">
        <div className="space-y-0.5">
          <Label htmlFor="variants-toggle" className="text-sm font-semibold cursor-pointer">
            Product Variants
          </Label>
          <p className="text-sm text-muted-foreground">Add size, color, or type options</p>
        </div>
        <Switch
          className="data-[state=unchecked]:bg-border data-[state=checked]:bg-accent"
          id="variants-toggle"
          checked={hasVariants}
          onCheckedChange={onVariantsToggle}
        />
      </div>

      {/* Variant fields */}
      {hasVariants && (
        <div className="space-y-4">
          {localVariants.map((variant, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                placeholder="Size"
                value={variant.size}
                onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
              />
              <Input
                placeholder="Color"
                value={variant.color}
                onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleRemoveVariant(index)}
                className="text-red-600 hover:bg-red-50"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={handleAddVariant}>
            + Add Variant
          </Button>
        </div>
      )}
    </StepCard>
  );
}
