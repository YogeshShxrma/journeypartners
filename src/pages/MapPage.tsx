import React, { useState, useEffect } from 'react';
import { PageTransition } from '@/components/ui/PageTransition';
import { MapView } from '@/components/ui/MapView';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Search } from 'lucide-react';
import { BlurContainer } from '@/components/ui/BlurContainer';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

// Sample locations that might be interesting to users (updated for India)
const interestingLocations = [
  { name: "Delhi", lng: 77.1025, lat: 28.7041 },
  { name: "Mumbai", lng: 72.8777, lat: 19.0760 },
  { name: "Bangalore", lng: 77.5946, lat: 12.9716 },
  { name: "Chennai", lng: 80.2707, lat: 13.0827 },
];

export default function MapPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState({ lng: 77.1025, lat: 28.7041 }); // Default to Delhi
  const [zoom, setZoom] = useState(12);
  const [userLocation, setUserLocation] = useState<{ lng: number, lat: number } | null>(null);

  // Get user's location when the component mounts
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setUserLocation({ lng: longitude, lat: latitude });
        setCurrentLocation({ lng: longitude, lat: latitude });
        setZoom(14);
        toast.success("Location detected successfully");
      },
      (error) => {
        console.error('Error getting user location:', error);
        toast.error("Couldn't get your location. Using default location.");
      }
    );
  }, []);

  // Filter locations based on search query
  const filteredLocations = searchQuery 
    ? interestingLocations.filter(loc => 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) 
    : interestingLocations;

  return (
    <PageTransition>
      <div className="min-h-screen pb-24">
        {/* Header */}
        <div className="sticky top-0 z-10 px-4 py-4 bg-background/80 backdrop-blur-md border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold">Explore Map</h1>
            </div>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search locations..."
              className="pl-9 glass-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Main map */}
        <div className="relative">
          <MapView 
            interactive={true} 
            showFullscreen={true}
            center={currentLocation}
            zoom={zoom}
            className="h-[60vh]"
          />
        </div>
        
        {/* Nearby locations */}
        <div className="px-4 py-4">
          <h2 className="text-lg font-semibold mb-3">Explore India</h2>
          <div className="grid grid-cols-2 gap-3">
            {filteredLocations.map((location, index) => (
              <BlurContainer 
                key={index}
                className="p-3 card-hover"
                onClick={() => {
                  setCurrentLocation({ lng: location.lng, lat: location.lat });
                  setZoom(15);
                  toast.info(`Exploring ${location.name}`);
                }}
              >
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{location.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {userLocation ? 
                        `${Math.round(
                          getDistance(
                            userLocation.lat, 
                            userLocation.lng, 
                            location.lat, 
                            location.lng
                          ) * 10
                        ) / 10} km away` : 
                        'Calculating distance...'}
                    </p>
                  </div>
                </div>
              </BlurContainer>
            ))}
          </div>
        </div>
        
        <Navbar />
      </div>
    </PageTransition>
  );
}

// Helper function to calculate distance between two coordinates in kilometers
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI/180);
}
