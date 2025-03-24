
import React, { useEffect, useRef, useState } from 'react';
import { BlurContainer } from './BlurContainer';
import { Route, Map, MapPin, LocateFixed } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapViewProps {
  className?: string;
  interactive?: boolean;
  showFullscreen?: boolean;
  darkMode?: boolean;
}

export function MapView({ 
  className, 
  interactive = false,
  showFullscreen = false,
  darkMode = false
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <BlurContainer 
      className={cn(
        "overflow-hidden relative", 
        interactive ? "h-[300px] md:h-[400px]" : "h-[200px]",
        className
      )}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Route className="w-6 h-6 text-primary animate-pulse" />
        </div>
      ) : (
        <>
          <div 
            ref={mapRef} 
            className={cn(
              "w-full h-full bg-cover bg-center", 
              darkMode ? "bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-96.7970,32.7767,12,0/600x400?access_token=pk.eyJ1IjoibG92YWJsZWFpIiwiYSI6ImNsbGkwZXd4ZjFtOXgzZm16aWR1OWsxN2kifQ.Qn3gBTRkViBLpBISgwSvug')]" : 
                        "bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-96.7970,32.7767,12,0/600x400?access_token=pk.eyJ1IjoibG92YWJsZWFpIiwiYSI6ImNsbGkwZXd4ZjFtOXgzZm16aWR1OWsxN2kifQ.Qn3gBTRkViBLpBISgwSvug')]"
            )}
          />
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-24 pointer-events-none" />
          
          {interactive && (
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <button className="btn-icon bg-background shadow-lg hover:bg-primary hover:text-white transition-colors">
                <LocateFixed className="w-4 h-4" />
              </button>
              {showFullscreen && (
                <button className="btn-icon bg-background shadow-lg hover:bg-primary hover:text-white transition-colors">
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
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <MapPin className="w-7 h-7 text-primary" />
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 w-2 h-2 bg-primary rounded-full animate-pulse-slow"></span>
            </div>
          </div>
        </>
      )}
    </BlurContainer>
  );
}
