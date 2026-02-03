'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/shared/lib/utils';

interface TemplateCardProps {
  name: string;
  category: string;
  previewImageUrl: string;
  isNew?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function TemplateCard({
  name,
  category,
  previewImageUrl,
  isNew = false,
  isSelected = false,
  onClick,
  className,
}: TemplateCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-3xl bg-card transition-all hover-lift text-left',
        isSelected && 'ring-2 ring-secondary',
        className
      )}
    >
      <div className="aspect-[3/4] relative">
        <Image
          src={previewImageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 80vw, 40vw"
        />
        {isNew && (
          <Badge className="absolute right-2 top-2 bg-secondary text-secondary-foreground">
            NEW
          </Badge>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="font-semibold text-white text-lg">{name}</h3>
        <p className="text-white/70 text-sm capitalize">{category}</p>
      </div>
    </button>
  );
}
