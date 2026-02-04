'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordion() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
}

interface AccordionProps {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  children: React.ReactNode;
  className?: string;
}

export function Accordion({
  type = 'single',
  defaultValue,
  children,
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(() => {
    if (!defaultValue) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });

  const toggleItem = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        if (type === 'single') {
          return prev.includes(value) ? [] : [value];
        }
        return prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value];
      });
    },
    [type]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn('space-y-3', className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  const { openItems } = useAccordion();
  const isOpen = openItems.includes(value);

  return (
    <div
      className={cn(
        'rounded-xl border border-border/50 overflow-hidden transition-colors',
        isOpen && 'border-secondary/30 bg-card/50',
        className
      )}
      data-state={isOpen ? 'open' : 'closed'}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ value?: string; isOpen?: boolean }>, {
            value,
            isOpen,
          });
        }
        return child;
      })}
    </div>
  );
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
  value?: string;
  isOpen?: boolean;
}

export function AccordionTrigger({
  children,
  className,
  value,
  isOpen,
}: AccordionTriggerProps) {
  const { toggleItem } = useAccordion();

  return (
    <button
      type="button"
      onClick={() => value && toggleItem(value)}
      className={cn(
        'flex w-full items-center justify-between px-5 py-4 text-left',
        'text-secondary font-medium transition-colors',
        'hover:text-tertiary',
        className
      )}
      aria-expanded={isOpen}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          'h-5 w-5 text-subtitle transition-transform duration-300',
          isOpen && 'rotate-180'
        )}
      />
    </button>
  );
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
}

export function AccordionContent({
  children,
  className,
  isOpen,
}: AccordionContentProps) {
  return (
    <div
      className={cn(
        'overflow-hidden transition-all duration-300',
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      )}
    >
      <div className={cn('px-5 pb-4 text-foreground/80 text-sm leading-relaxed', className)}>
        {children}
      </div>
    </div>
  );
}
