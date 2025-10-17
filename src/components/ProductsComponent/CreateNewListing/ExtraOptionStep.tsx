import { StepCard } from './StepCard';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ExtraOptionsStepProps {
  stepNumber?: number;
  badge?: string;
  hasVariants?: boolean;
  onVariantsToggle?: (value: boolean) => void;
}

export function ExtraOptionsStep({
  stepNumber = 4,
  hasVariants = false,
  onVariantsToggle,
}: ExtraOptionsStepProps) {
  return (
    <StepCard
      stepNumber={stepNumber}
      title="Extra Options"
      subtitle="Add variants and shipping details"
    >
      <div className="flex items-center justify-between py-4 border border-border px-4 rounded-xl">
        <div className="space-y-0.5">
          <Label htmlFor="variants-toggle" className="text-sm font-semibold cursor-pointer">
            Product Variants
          </Label>
          <p className="text-sm text-muted-foreground">Add size, color, or type options</p>
        </div>
        <Switch
          className='data-[state=unchecked]:bg-border data-[state=checked]:bg-accent'
          id="variants-toggle"
          checked={hasVariants}
          onCheckedChange={onVariantsToggle}
        />
      </div>
    </StepCard>
  );
}
