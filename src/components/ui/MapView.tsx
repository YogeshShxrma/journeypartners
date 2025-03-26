import React, { useEffect, useRef, useState } from 'react';
import { BlurContainer } from './BlurContainer';
import { Route, Map as MapIcon, MapPin, LocateFixed } from 'lucide-react';
import { cn } from '@/lib/utils';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Helper component to update map view when props change
const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView([center.lat, center.lng], zoom);
  }, [center, zoom, map]);
  
  return null;
};

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
  center = { lng: 77.1025, lat: 28.7041 }, // Default center (Delhi)
  zoom = 12,
  markers = []
}: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fix Leaflet marker icon issue
  // Leaflet uses image files for markers which need special handling in React
  useEffect(() => {
    // Delete the default icon for Leaflet markers
    delete L.Icon.Default.prototype._getIconUrl;
    
    // Set custom icon paths
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);
  
  // Handle user location
  const handleLocateUser = () => {
    if (!mapContainerRef.current) return;
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        // We'll use the MapUpdater component to update the map view
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

  // Create a custom marker icon with primary color
  const customIcon = new L.Icon({
    iconUrl: "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // Set loading state to false after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
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
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Route className="w-6 h-6 text-primary animate-pulse" />
        </div>
      )}
      
      <div 
        ref={mapContainerRef} 
        className="w-full h-full"
      >
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={zoom}
          style={{ width: '100%', height: '100%' }}
          zoomControl={interactive}
          attributionControl={true}
          doubleClickZoom={interactive}
          scrollWheelZoom={interactive}
          dragging={interactive}
          easeLinearity={0.35}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Add MapUpdater to handle center/zoom changes */}
          <MapUpdater center={center} zoom={zoom} />
          
          {/* Add markers */}
          {markers.length === 0 ? (
            <Marker position={[center.lat, center.lng]} icon={customIcon}>
              <Popup>
                Current location
              </Popup>
            </Marker>
          ) : (
            markers.map((marker, index) => (
              <Marker 
                key={index} 
                position={[marker.lat, marker.lng]}
                icon={customIcon}
              >
                <Popup>
                  Location {index + 1}
                </Popup>
              </Marker>
            ))
          )}
        </MapContainer>
      </div>
      
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
