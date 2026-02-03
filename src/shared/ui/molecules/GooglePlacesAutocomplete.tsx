'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/shared/lib/utils';

declare global {
  interface Window {
    google: typeof google;
    initGoogleMaps: () => void;
  }
}

interface PlaceResult {
  placeId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

interface GooglePlacesAutocompleteProps {
  value?: string;
  onSelect: (place: PlaceResult) => void;
  placeholder?: string;
  className?: string;
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export function GooglePlacesAutocomplete({
  value = '',
  onSelect,
  placeholder = 'Search venue or city...',
  className,
}: GooglePlacesAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Load Google Maps script
  useEffect(() => {
    if (window.google?.maps?.places) {
      setIsScriptLoaded(true);
      return;
    }

    if (!GOOGLE_MAPS_API_KEY) {
      console.warn('Google Maps API key not configured');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Initialize services when script is loaded
  useEffect(() => {
    if (isScriptLoaded && window.google?.maps?.places) {
      autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();

      // Create a hidden map element for PlacesService
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 0, lng: 0 },
          zoom: 1,
        });
        placesServiceRef.current = new window.google.maps.places.PlacesService(map);
      }
    }
  }, [isScriptLoaded]);

  // Fetch suggestions
  const fetchSuggestions = useCallback(
    async (input: string) => {
      if (!autocompleteServiceRef.current || input.length < 3) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await new Promise<google.maps.places.AutocompletePrediction[]>(
          (resolve, reject) => {
            autocompleteServiceRef.current!.getPlacePredictions(
              {
                input,
                types: ['establishment', 'geocode'],
              },
              (predictions, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                  resolve(predictions);
                } else {
                  resolve([]);
                }
              }
            );
          }
        );
        setSuggestions(response);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setShowSuggestions(true);
    fetchSuggestions(newValue);
  };

  // Handle place selection
  const handleSelectPlace = useCallback(
    (prediction: google.maps.places.AutocompletePrediction) => {
      if (!placesServiceRef.current) return;

      setIsLoading(true);
      placesServiceRef.current.getDetails(
        {
          placeId: prediction.place_id,
          fields: ['name', 'formatted_address', 'geometry', 'place_id'],
        },
        (place, status) => {
          setIsLoading(false);
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
            const result: PlaceResult = {
              placeId: place.place_id || prediction.place_id,
              name: place.name || prediction.structured_formatting.main_text,
              address: place.formatted_address || prediction.description,
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0,
            };
            setInputValue(result.address);
            setSuggestions([]);
            setShowSuggestions(false);
            onSelect(result);
          }
        }
      );
    },
    [onSelect]
  );

  // Fallback for when Google Maps API is not available
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className={cn('space-y-2', className)}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtitle" />
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              onSelect({
                placeId: '',
                name: e.target.value,
                address: e.target.value,
                lat: 0,
                lng: 0,
              });
            }}
            placeholder={placeholder}
            className="pl-10 bg-input-bg border-0"
          />
        </div>
        <p className="text-xs text-subtitle">
          Enter your wedding location manually
        </p>
      </div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      {/* Hidden map element for PlacesService */}
      <div ref={mapRef} style={{ display: 'none' }} />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtitle" />
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className="pl-10 pr-10 bg-input-bg border-0"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtitle animate-spin" />
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-card rounded-xl border border-border shadow-lg overflow-hidden">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.place_id}
              type="button"
              onClick={() => handleSelectPlace(suggestion)}
              className="w-full flex items-start gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
            >
              <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">
                  {suggestion.structured_formatting.main_text}
                </p>
                <p className="text-sm text-subtitle">
                  {suggestion.structured_formatting.secondary_text}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
