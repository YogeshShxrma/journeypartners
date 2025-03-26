import React, { useState, useEffect } from 'react';
import { PageTransition } from '@/components/ui/PageTransition';
import { BlurContainer } from '@/components/ui/BlurContainer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapView } from '@/components/ui/MapView';
import { Navbar } from '@/components/layout/Navbar';
import { 
  Car, 
  MapPin, 
  ArrowRight, 
  Search,
  Repeat,
  Plus,
  CalendarDays,
  User,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setCurrentTime(`${formattedHours}:${formattedMinutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const quickDestinations = [
    { id: 1, name: 'University', icon: '🏫' },
    { id: 2, name: 'Downtown', icon: '🏙️' },
    { id: 3, name: 'Tech Park', icon: '💻' },
    { id: 4, name: 'Library', icon: '📚' },
  ];

  const recentRides = [
    {
      id: 1,
      driver: 'Sarah Johnson',
      from: 'North Campus',
      to: 'Downtown',
      date: 'Today',
      time: '9:30 AM',
      price: '₹250',
    },
    {
      id: 2,
      driver: 'Michael Chen',
      from: 'South Campus',
      to: 'Tech District',
      date: 'Today',
      time: '10:15 AM',
      price: '₹300',
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pb-24">
        <div className="p-5 bg-gradient-to-b from-primary/10 to-transparent">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">RouteMates</h1>
              <p className="text-sm text-muted-foreground">Good morning, Alex</p>
            </div>
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center mb-2">
            <div className="font-medium">{currentTime}</div>
            <Badge className="ml-2">
              <Clock className="h-3 w-3 mr-1" /> Now
            </Badge>
          </div>
        </div>
        
        <div className="px-5 pt-0 pb-6 -mt-5">
          <BlurContainer className="p-5">
            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                <Input
                  type="text"
                  placeholder="From where?"
                  className="pl-10 glass-input"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                <Input
                  type="text"
                  placeholder="To where?"
                  className="pl-10 glass-input"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                />
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 bg-secondary rounded-full flex items-center justify-center"
                  onClick={() => {
                    const temp = fromLocation;
                    setFromLocation(toLocation);
                    setToLocation(temp);
                  }}
                >
                  <Repeat className="h-3 w-3" />
                </button>
              </div>
              
              <div className="flex gap-3">
                <Link to="/rides/browse" className="flex-1">
                  <Button className="w-full flex items-center justify-center">
                    <Search className="mr-2 h-4 w-4" /> Find rides
                  </Button>
                </Link>
                <Link to="/rides/create">
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <Plus className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </BlurContainer>
        </div>
        
        <div className="px-5 mb-6">
          <h2 className="text-lg font-semibold mb-3">Quick Destinations</h2>
          <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
            {quickDestinations.map(destination => (
              <BlurContainer 
                key={destination.id}
                className="flex-shrink-0 w-28 h-28 flex flex-col items-center justify-center text-center p-3 card-hover"
              >
                <div className="text-2xl mb-2">{destination.icon}</div>
                <div className="font-medium text-sm">{destination.name}</div>
              </BlurContainer>
            ))}
            <BlurContainer className="flex-shrink-0 w-28 h-28 flex flex-col items-center justify-center text-center p-3 border-dashed">
              <Plus className="h-6 w-6 text-muted-foreground mb-2" />
              <div className="text-sm text-muted-foreground">Add New</div>
            </BlurContainer>
          </div>
        </div>
        
        <div className="px-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Around You</h2>
            <Button variant="ghost" size="sm" className="text-xs h-7">
              Explore map <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
          <MapView interactive={true} />
        </div>
        
        <div className="px-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Recent Rides</h2>
            <Link to="/rides/history">
              <Button variant="ghost" size="sm" className="text-xs h-7">
                View all <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
          
          {recentRides.length > 0 ? (
            <div className="space-y-3">
              {recentRides.map(ride => (
                <Link to={`/rides/${ride.id}`} key={ride.id}>
                  <BlurContainer className="p-4 card-hover">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center mr-2">
                          <Car className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{ride.from} to {ride.to}</h3>
                          <div className="flex items-center">
                            <CalendarDays className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {ride.date}, {ride.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-base font-semibold text-primary">{ride.price}</div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="ghost" size="sm" className="text-xs h-7">
                        Details <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </BlurContainer>
                </Link>
              ))}
            </div>
          ) : (
            <BlurContainer className="p-6 text-center">
              <Car className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-medium mb-1">No recent rides</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Book a ride to see your history here
              </p>
              <Link to="/rides/browse">
                <Button size="sm">Find a ride</Button>
              </Link>
            </BlurContainer>
          )}
        </div>
        
        <Navbar />
      </div>
    </PageTransition>
  );
};

export default Index;
