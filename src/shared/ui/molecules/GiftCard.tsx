'use client';

import Image from 'next/image';
import { Plus, Check } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { IconButton } from '../atoms/IconButton';

interface GiftCardProps {
  name: string;
  price: number;
  imageUrl?: string;
  isSelected?: boolean;
  onToggle?: () => void;
  currency?: string;
  className?: string;
}

export function GiftCard({
  name,
  price,
  imageUrl,
  isSelected = false,
  onToggle,
  currency = '$',
  className,
}: GiftCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-card transition-all hover-lift',
        isSelected && 'ring-2 ring-secondary',
        className
      )}
    >
      <div className="aspect-square relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center">
            <span className="text-4xl">🎁</span>
          </div>
        )}
        {onToggle && (
          <IconButton
            variant={isSelected ? 'secondary' : 'default'}
            size="sm"
            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onToggle}
            aria-label={isSelected ? 'Remove from list' : 'Add to list'}
          >
            {isSelected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </IconButton>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-foreground text-sm truncate">{name}</h3>
        <p className="text-secondary text-sm font-semibold mt-1">
          {currency}
          {price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
