import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ReactNode } from 'react';

interface StepCardProps {
  stepNumber: number;
  title: string;
  subtitle: string;
  isRequired?: boolean;
  badge?: string;
  badgeVariant?: 'default' | 'destructive' | 'outline' | 'secondary';
  children: ReactNode;
}

export function StepCard({
  stepNumber,
  title,
  subtitle,
  isRequired = false,
  badge,
  badgeVariant = 'destructive',
  children,
}: StepCardProps) {
  return (
    <Card className="relative overflow-hidden shadow-sm border-l-4 border-l-transparent hover:border-l-pink-500 transition-colors">
      <CardHeader className="">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600 font-semibold">
              {stepNumber}
            </div>
            <div className="space-y-0.5">
              <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {isRequired && (
              <Badge variant="outline" className="bg-pink-50 text-pink-600 border-pink-200">
                Required
              </Badge>
            )}
            {badge && (
              <Badge variant={badgeVariant} className="font-semibold">
                {badge}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
