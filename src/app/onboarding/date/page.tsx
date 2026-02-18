'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';
import { OnboardingLayout } from '@/shared/ui/organisms/OnboardingLayout';
import { useWeddingStore } from '@/entities/wedding';
import { ROUTES } from '@/shared/config';
import { cn } from '@/shared/lib/utils';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function OnboardingDatePage() {
  const t = useTranslations('onboarding.date');
  const router = useRouter();
  const { onboarding, updateOnboarding, nextStep, prevStep } = useWeddingStore();

  const today = new Date();
  const initialDate = onboarding.date ? new Date(onboarding.date) : null;

  const [currentMonth, setCurrentMonth] = useState(initialDate?.getMonth() ?? today.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate?.getFullYear() ?? today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [hoveredDate, setHoveredDate] = useState<number | null>(null);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateSelect = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    if (date >= today) {
      setSelectedDate(date);
      updateOnboarding({ date: date.toISOString() });
    }
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const isToday = (day: number) => {
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  const handleContinue = () => {
    if (onboarding.date) {
      nextStep();
      router.push(ROUTES.onboarding.location);
    }
  };

  const handleBack = () => {
    prevStep();
    router.push(ROUTES.onboarding.names);
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={4}
      title={t('title')}
      highlightedWord="celebrate"
      subtitle={t('subtitle')}
      onBack={handleBack}
      onContinue={handleContinue}
    >
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          {/* Calendar Container */}
          <div className="relative bg-card rounded-3xl border border-border p-6 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-3 right-3 text-secondary/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="absolute bottom-3 left-3 text-secondary/20">
              <Heart className="w-8 h-8 fill-current" />
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="w-10 h-10 rounded-full bg-muted hover:bg-secondary/20 flex items-center justify-center transition-all hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>

              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground">
                  {MONTHS[currentMonth]} {currentYear}
                </h3>
              </div>

              <button
                type="button"
                onClick={handleNextMonth}
                className="w-10 h-10 rounded-full bg-muted hover:bg-secondary/20 flex items-center justify-center transition-all hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map((day, index) => (
                <div
                  key={index}
                  className="h-10 flex items-center justify-center text-sm font-medium text-subtitle"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty days */}
              {emptyDays.map((_, index) => (
                <div key={`empty-${index}`} className="h-12" />
              ))}

              {/* Days */}
              {days.map((day) => {
                const selected = isDateSelected(day);
                const disabled = isDateDisabled(day);
                const todayDate = isToday(day);
                const hovered = hoveredDate === day;

                return (
                  <button
                    key={day}
                    type="button"
                    disabled={disabled}
                    onClick={() => handleDateSelect(day)}
                    onMouseEnter={() => setHoveredDate(day)}
                    onMouseLeave={() => setHoveredDate(null)}
                    className={cn(
                      'relative h-12 w-full rounded-xl text-base font-medium transition-all duration-200',
                      'flex items-center justify-center',
                      disabled && 'text-muted-foreground/30 cursor-not-allowed',
                      !disabled && !selected && 'text-foreground hover:bg-secondary/20 hover:scale-105',
                      todayDate && !selected && 'ring-1 ring-secondary/50',
                      selected && 'bg-secondary text-secondary-foreground scale-105 shadow-lg shadow-secondary/30',
                      hovered && !disabled && !selected && 'bg-secondary/10'
                    )}
                  >
                    {day}
                    {selected && (
                      <>
                        <Heart className="absolute -top-2 -right-2 w-5 h-5 text-secondary fill-secondary animate-pulse" />
                        <div className="absolute inset-0 rounded-xl bg-secondary/20 animate-ping" style={{ animationDuration: '2s' }} />
                      </>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Date Display */}
            {selectedDate && (
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center justify-center gap-3 text-center">
                  <Heart className="w-6 h-6 text-secondary fill-secondary animate-pulse" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-tertiary mb-1">Your Special Day</p>
                    <p className="text-lg font-semibold text-foreground">
                      {selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <Heart className="w-6 h-6 text-secondary fill-secondary animate-pulse" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
