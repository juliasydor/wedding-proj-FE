'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';
import { OnboardingLayout } from '@/shared/ui/organisms/OnboardingLayout';
import { GooglePlacesAutocomplete } from '@/shared/ui/molecules/GooglePlacesAutocomplete';
import { useWeddingStore } from '@/entities/wedding';
import { ROUTES } from '@/shared/config';

interface SelectedPlace {
  placeId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export default function OnboardingLocationPage() {
  const t = useTranslations('onboarding.location');
  const router = useRouter();
  const { onboarding, updateOnboarding, nextStep, prevStep } = useWeddingStore();

  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(null);
  const [mapUrl, setMapUrl] = useState<string>('');

  const handlePlaceSelect = (place: SelectedPlace) => {
    setSelectedPlace(place);
    updateOnboarding({
      location: place.address,
      venue: place.name,
    });

    // Generate static map URL
    if (place.lat && place.lng) {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
      if (apiKey) {
        setMapUrl(
          `https://maps.googleapis.com/maps/api/staticmap?center=${place.lat},${place.lng}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${place.lat},${place.lng}&key=${apiKey}`
        );
      }
    }
  };

  const handleContinue = () => {
    if (onboarding.location) {
      nextStep();
      router.push(ROUTES.onboarding.dressCode);
    }
  };

  const handleBack = () => {
    prevStep();
    router.push(ROUTES.onboarding.date);
  };

  // Initialize from stored location
  useEffect(() => {
    if (onboarding.location && !selectedPlace) {
      setSelectedPlace({
        placeId: '',
        name: onboarding.venue || onboarding.location,
        address: onboarding.location,
        lat: 0,
        lng: 0,
      });
    }
  }, [onboarding.location, onboarding.venue, selectedPlace]);

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={4}
      title={t('title')}
      highlightedWord="scene"
      subtitle={t('subtitle')}
      onBack={handleBack}
      onContinue={handleContinue}
    >
      <div className="space-y-6">
        <GooglePlacesAutocomplete
          value={onboarding.location}
          onSelect={handlePlaceSelect}
          placeholder={t('searchPlaceholder')}
        />

        {selectedPlace && (
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-xs font-medium uppercase tracking-wider text-tertiary mb-2">
              {t('selectedLocation')}
            </p>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{selectedPlace.name}</p>
                <p className="text-sm text-subtitle">{selectedPlace.address}</p>
              </div>
            </div>
          </div>
        )}

        {/* Map Preview */}
        <div className="aspect-video bg-card rounded-xl border border-border overflow-hidden relative">
          {mapUrl ? (
            <img
              src={mapUrl}
              alt="Location map"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-quaternary to-primary flex flex-col items-center justify-center gap-3">
              <MapPin className="h-12 w-12 text-secondary" />
              <p className="text-subtitle text-sm">Search for a location to see the map</p>
            </div>
          )}

          {selectedPlace && selectedPlace.lat !== 0 && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${selectedPlace.lat},${selectedPlace.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-foreground hover:bg-card transition-colors"
            >
              Open in Google Maps
            </a>
          )}
        </div>
      </div>
    </OnboardingLayout>
  );
}
