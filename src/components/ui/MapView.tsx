
import React, { useEffect, useRef, useState } from 'react';
import { BlurContainer } from './BlurContainer';
import { Route, Map, MapPin, LocateFixed } from 'lucide-react';
import { cn } from '@/lib/utils';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Mapbox public token - in a real app, you would store this in environment variables
// This is a public token so it's ok to include in the code
mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZWFpIiwiYSI6ImNsbGkwZXd4ZjFtOXgzZm16aWR1OWsxN2kifQ.Qn3gBTRkViBLpBISgwSvug';

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
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: darkMode ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11',
      center: [center.lng, center.lat],
      zoom: zoom,
      attributionControl: false
    });

    // Add navigation control if interactive
    if (interactive) {
      mapRef.current.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        'bottom-right'
      );
    }

    // Add markers
    if (markers.length === 0) {
      // Add default center marker if no markers provided
      new mapboxgl.Marker({
        color: '#f43f5e', // primary color
      })
        .setLngLat([center.lng, center.lat])
        .addTo(mapRef.current);
    } else {
      // Add all provided markers
      markers.forEach(marker => {
        new mapboxgl.Marker({
          color: '#f43f5e', // primary color
        })
          .setLngLat([marker.lng, marker.lat])
          .addTo(mapRef.current);
      });
    }

    // Map loaded event
    mapRef.current.on('load', () => {
      setIsLoading(false);
    });

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [center.lng, center.lat, zoom, darkMode, interactive, markers]);

  // Handle user location
  const handleLocateUser = () => {
    if (!mapRef.current) return;
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        mapRef.current?.flyTo({
          center: [longitude, latitude],
          zoom: 14,
          essential: true
        });
        
        // Add marker at user location
        new mapboxgl.Marker({
          color: '#f43f5e',
        })
          .setLngLat([longitude, latitude])
          .addTo(mapRef.current!);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  };

  // Handle fullscreen
  const handleFullscreen = () => {
    if (!mapRef.current) return;
    if (mapContainerRef.current) {
      if (!document.fullscreenElement) {
        mapContainerRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
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
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Route className="w-6 h-6 text-primary animate-pulse" />
        </div>
      )}
      
      <div 
        ref={mapContainerRef} 
        className="w-full h-full"
      />
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-24 pointer-events-none" />
      
      {interactive && (
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
