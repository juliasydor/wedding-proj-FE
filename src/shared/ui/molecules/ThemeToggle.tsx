'use client';

import { useThemeStore, type ThemeMode } from '@/shared/store/themeStore';
import { cn } from '@/shared/lib/utils';

// Véu (Veil) Icon - represents the bride
function VeuIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Veil/headpiece shape */}
      <path d="M12 2C8 2 5 5 5 9c0 2 1 4 3 5.5" />
      <path d="M12 2c4 0 7 3 7 7 0 2-1 4-3 5.5" />
      <path d="M8 14.5c-2 1.5-4 4-4 7.5h16c0-3.5-2-6-4-7.5" />
      <path d="M12 2v5" />
      {/* Decorative dots on veil */}
      <circle cx="9" cy="18" r="0.5" fill="currentColor" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
      <circle cx="15" cy="18" r="0.5" fill="currentColor" />
      <circle cx="10" cy="20" r="0.5" fill="currentColor" />
      <circle cx="14" cy="20" r="0.5" fill="currentColor" />
    </svg>
  );
}

// Gravata (Tie) Icon - represents the groom
function GravataIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Tie knot */}
      <path d="M9 3h6l-1 3h-4l-1-3z" fill="currentColor" />
      {/* Tie body */}
      <path d="M10 6l-2 15 4 1 4-1-2-15" fill="currentColor" opacity="0.3" />
      <path d="M10 6l-2 15 4 1 4-1-2-15h-4z" />
      {/* Collar lines */}
      <path d="M6 3l3 3" />
      <path d="M18 3l-3 3" />
    </svg>
  );
}

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ className, size = 'md' }: ThemeToggleProps) {
  const { mode, toggle } = useThemeStore();

  const sizeClasses = {
    sm: 'w-14 h-7',
    md: 'w-16 h-8',
    lg: 'w-20 h-10',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const thumbSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const thumbTranslate = {
    sm: mode === 'gravata' ? 'translate-x-7' : 'translate-x-0',
    md: mode === 'gravata' ? 'translate-x-8' : 'translate-x-0',
    lg: mode === 'gravata' ? 'translate-x-10' : 'translate-x-0',
  };

  return (
    <button
      onClick={toggle}
      className={cn(
        'relative rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2',
        mode === 'veu'
          ? 'bg-gradient-to-r from-secondary/80 to-tertiary/80 focus:ring-secondary'
          : 'bg-gradient-to-r from-[#0A0524] to-[#0133E6] focus:ring-[#0133E6]',
        sizeClasses[size],
        className
      )}
      aria-label={`Mudar para tema ${mode === 'veu' ? 'gravata' : 'véu'}`}
    >
      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <VeuIcon
          className={cn(
            iconSizes[size],
            'transition-opacity duration-300',
            mode === 'veu' ? 'opacity-0' : 'opacity-40 text-white'
          )}
        />
        <GravataIcon
          className={cn(
            iconSizes[size],
            'transition-opacity duration-300',
            mode === 'gravata' ? 'opacity-0' : 'opacity-40 text-white'
          )}
        />
      </div>

      {/* Sliding thumb with active icon */}
      <div
        className={cn(
          'absolute top-1 left-1 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-300 ease-out',
          thumbSizes[size],
          thumbTranslate[size]
        )}
      >
        {mode === 'veu' ? (
          <VeuIcon className={cn(iconSizes[size], 'text-secondary')} />
        ) : (
          <GravataIcon className={cn(iconSizes[size], 'text-[#0133E6]')} />
        )}
      </div>
    </button>
  );
}

// Compact version for navbar
export function ThemeToggleCompact({ className }: { className?: string }) {
  const { mode, toggle } = useThemeStore();

  return (
    <button
      onClick={toggle}
      className={cn(
        'relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
        mode === 'veu'
          ? 'bg-secondary/20 hover:bg-secondary/30 text-secondary'
          : 'bg-[#0133E6]/20 hover:bg-[#0133E6]/30 text-[#0133E6]',
        className
      )}
      aria-label={`Tema atual: ${mode === 'veu' ? 'Véu' : 'Gravata'}. Clique para alternar.`}
    >
      {mode === 'veu' ? (
        <VeuIcon className="w-5 h-5" />
      ) : (
        <GravataIcon className="w-5 h-5" />
      )}
    </button>
  );
}
