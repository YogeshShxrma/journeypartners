
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BlurContainer } from './BlurContainer';
import { Route, Map as MapIcon, MapPin, LocateFixed } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface MapLocation {
  lng: number;
  lat: number;
}

interface MapViewProps {
  className?: string;
  interactive?: boolean;
  showFullscreen?: boolean;
  darkMode?: boolean;
  center?: MapLocation;
  zoom?: number;
  markers?: MapLocation[];
}

// Default map styling for light/dark mode
const mapStyles = {
  light: [],
  dark: [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ]
};

// Google Maps API Key - Replace this with your own API key
// In a real app, this should be in an environment variable
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

export function MapView({ 
  className, 
  interactive = false,
  showFullscreen = false,
  darkMode = false,
  center = { lng: -96.7970, lat: 32.7767 }, // Default center (Dallas)
  zoom = 12,
  markers = []
}: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    setIsLoading(false);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Handle user location
  const handleLocateUser = () => {
    if (!map) return;
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        const userLocation = { lat: latitude, lng: longitude };
        
        map.panTo(userLocation);
        map.setZoom(14);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  };

  // Handle fullscreen
  const handleFullscreen = () => {
    if (!mapContainerRef.current) return;
    
    if (!document.fullscreenElement) {
      mapContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <BlurContainer 
      className={cn(
        "overflow-hidden relative", 
        interactive ? "h-[300px] md:h-[400px]" : "h-[200px]",
        className
      )}
    >
      {(isLoading || !isLoaded) && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Route className="w-6 h-6 text-primary animate-pulse" />
        </div>
      )}
      
      <div 
        ref={mapContainerRef} 
        className="w-full h-full"
      >
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={{ lat: center.lat, lng: center.lng }}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              disableDefaultUI: !interactive,
              zoomControl: interactive,
              styles: darkMode ? mapStyles.dark : mapStyles.light,
              fullscreenControl: false,
            }}
          >
            {/* Add markers */}
            {markers.length === 0 ? (
              <Marker
                position={{ lat: center.lat, lng: center.lng }}
                icon={{
                  url: "data:image/svg+xml;utf8," + encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  `),
                  scaledSize: new google.maps.Size(32, 32),
                  anchor: new google.maps.Point(16, 32),
                }}
              />
            ) : (
              markers.map((marker, index) => (
                <Marker
                  key={index}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  icon={{
                    url: "data:image/svg+xml;utf8," + encodeURIComponent(`
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    `),
                    scaledSize: new google.maps.Size(32, 32),
                    anchor: new google.maps.Point(16, 32),
                  }}
                />
              ))
            )}
          </GoogleMap>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-24 pointer-events-none" />
      
      {interactive && isLoaded && (
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button 
            className="btn-icon bg-background shadow-lg hover:bg-primary hover:text-white transition-colors"
            onClick={handleLocateUser}
          >
            <LocateFixed className="w-4 h-4" />
          </button>
          {showFullscreen && (
            <button 
              className="btn-icon bg-background shadow-lg hover:bg-primary hover:text-white transition-colors"
              onClick={handleFullscreen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            </button>
          )}
        </div>
      )}
    </BlurContainer>
  );
}
