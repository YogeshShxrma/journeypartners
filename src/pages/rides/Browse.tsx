
import React, { useState } from 'react';
import { PageTransition } from '@/components/ui/PageTransition';
import { BlurContainer } from '@/components/ui/BlurContainer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { MapView } from '@/components/ui/MapView';
import { Navbar } from '@/components/layout/Navbar';
import { Search, Calendar, Filter, Clock, MapPin, User, Car, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Dummy data for rides
const rides = [
  {
    id: 1,
    driver: 'Sarah Johnson',
    from: 'North Campus',
    to: 'Downtown',
    date: 'Today',
    time: '9:30 AM',
    price: '$3.50',
    seats: 3,
    rating: 4.8,
  },
  {
    id: 2,
    driver: 'Michael Chen',
    from: 'South Campus',
    to: 'Tech District',
    date: 'Today',
    time: '10:15 AM',
    price: '$4.25',
    seats: 2,
    rating: 4.9,
  },
  {
    id: 3,
    driver: 'Emma Rodriguez',
    from: 'East Campus',
    to: 'Shopping Mall',
    date: 'Tomorrow',
    time: '2:45 PM',
    price: '$5.00',
    seats: 4,
    rating: 4.7,
  },
];

export default function Browse() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  return (
    <PageTransition>
      <div className="min-h-screen pb-24">
        {/* Header */}
        <div className="sticky top-0 z-10 px-4 py-4 bg-background/80 backdrop-blur-md border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Find Rides</h1>
            <Button variant="outline" size="icon" className="rounded-full">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search destinations..."
              className="pl-9 glass-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
            <Button
              variant={activeFilter === 'all' ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs px-4"
              onClick={() => setActiveFilter('all')}
            >
              All
            </Button>
            <Button
              variant={activeFilter === 'today' ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs px-4 flex items-center"
              onClick={() => setActiveFilter('today')}
            >
              <Calendar className="h-3 w-3 mr-1" /> Today
            </Button>
            <Button
              variant={activeFilter === 'tomorrow' ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs px-4"
              onClick={() => setActiveFilter('tomorrow')}
            >
              Tomorrow
            </Button>
            <Button
              variant={activeFilter === 'downtown' ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs px-4 whitespace-nowrap"
              onClick={() => setActiveFilter('downtown')}
            >
              Downtown
            </Button>
            <Button
              variant={activeFilter === 'campus' ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs px-4 whitespace-nowrap"
              onClick={() => setActiveFilter('campus')}
            >
              Campus
            </Button>
          </div>
        </div>
        
        {/* Map overview */}
        <div className="px-4 py-3">
          <MapView interactive={false} />
        </div>
        
        {/* Ride listings */}
        <div className="px-4 pt-2 pb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Available Rides</h2>
            <Badge variant="primary">{rides.length} rides</Badge>
          </div>
          
          <div className="space-y-3">
            {rides.map(ride => (
              <Link to={`/rides/${ride.id}`} key={ride.id}>
                <BlurContainer className="p-4 card-hover">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center mr-2">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{ride.driver}</h3>
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground">
                            ★ {ride.rating}
                          </span>
                          <span className="mx-1 text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            <Car className="h-3 w-3 inline mr-0.5" /> {ride.seats} seats
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-base font-semibold text-primary">{ride.price}</div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-2 w-[70%]">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full flex items-center justify-center bg-primary/10 mr-2">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <span className="text-sm truncate">{ride.from}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full flex items-center justify-center bg-primary/10 mr-2">
                          <MapPin className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm truncate">{ride.to}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{ride.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{ride.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-xs h-7">
                      View details <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </BlurContainer>
              </Link>
            ))}
          </div>
        </div>
        
        <Navbar />
      </div>
    </PageTransition>
  );
}
