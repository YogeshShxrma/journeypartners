import React from 'react';
import { PageTransition } from '@/components/ui/PageTransition';
import { BlurContainer } from '@/components/ui/BlurContainer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/layout/Navbar';
import {
  User,
  Settings,
  CreditCard,
  Clock,
  Car,
  MapPin,
  ChevronRight,
  LogOut,
  Star,
  Award,
  Shield,
  MessageSquare
} from 'lucide-react';

export default function Profile() {
  // Sample user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    joinDate: 'September 2023',
    verified: true,
    rating: 4.9,
    reviewCount: 28,
    rides: 34,
    driven: 26,
    avatar: null, // In a real app, this would be a URL
  };
  
  // Recent trips
  const recentTrips = [
    {
      id: 1,
      from: 'North Campus',
      to: 'Downtown',
      date: 'Yesterday',
      price: '₹250',
      driver: true,
    },
    {
      id: 2,
      from: 'Downtown',
      to: 'North Campus',
      date: 'August 21',
      price: '₹300',
      driver: false,
    },
  ];
  
  return (
    <PageTransition>
      <div className="min-h-screen pb-24">
        {/* Header */}
        <div className="relative bg-gradient-to-b from-primary/10 to-background pt-12 pb-8 px-4">
          <div className="flex items-center mb-4">
            <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mr-4 border-2 border-white shadow-md">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <User className="h-10 w-10 text-primary" />
              )}
            </div>
            
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center mt-1">
                <Badge variant="primary" className="mr-2">
                  <Star className="h-3 w-3 mr-1" /> {user.rating}
                </Badge>
                {user.verified && (
                  <Badge variant="success">
                    <Shield className="h-3 w-3 mr-1" /> Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="absolute top-6 right-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm"
              onClick={() => {}}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="px-4 mb-6">
          <BlurContainer className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-primary">{user.rides}</div>
                <div className="text-xs text-muted-foreground">Rides taken</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-primary">{user.driven}</div>
                <div className="text-xs text-muted-foreground">Rides given</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-primary">{user.reviewCount}</div>
                <div className="text-xs text-muted-foreground">Reviews</div>
              </div>
            </div>
          </BlurContainer>
        </div>
        
        {/* Membership */}
        <div className="px-4 mb-6">
          <BlurContainer className="p-4 bg-gradient-to-r from-primary/10 to-primary/5">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold">Student Member</h3>
                </div>
                <p className="text-sm text-muted-foreground">Joined {user.joinDate}</p>
              </div>
              <Button size="sm" variant="outline" className="border-primary/20 text-primary">
                Upgrade
              </Button>
            </div>
          </BlurContainer>
        </div>
        
        {/* Recent trips */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Recent Trips</h2>
            <Button variant="ghost" size="sm" className="text-xs h-7">
              View all
              <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
          
          {recentTrips.length > 0 ? (
            <div className="space-y-3">
              {recentTrips.map(trip => (
                <BlurContainer key={trip.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Badge variant={trip.driver ? "success" : "outline"} className="mb-2">
                        {trip.driver ? "Driver" : "Passenger"}
                      </Badge>
                      <h3 className="font-medium">{trip.from} to {trip.to}</h3>
                    </div>
                    <div className="text-base font-semibold text-primary">{trip.price}</div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{trip.date}</span>
                  </div>
                </BlurContainer>
              ))}
            </div>
          ) : (
            <BlurContainer className="p-6 text-center">
              <Car className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-medium mb-1">No trips yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start using RouteMates to see your trip history here
              </p>
              <Button size="sm">Find a ride</Button>
            </BlurContainer>
          )}
        </div>
        
        {/* Quick actions */}
        <div className="px-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
          
          <div className="space-y-2">
            <BlurContainer className="p-3">
              <Button variant="ghost" className="w-full justify-start">
                <CreditCard className="h-5 w-5 mr-3 text-primary" />
                Payment Methods
                <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
              </Button>
            </BlurContainer>
            
            <BlurContainer className="p-3">
              <Button variant="ghost" className="w-full justify-start">
                <MapPin className="h-5 w-5 mr-3 text-primary" />
                Saved Locations
                <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
              </Button>
            </BlurContainer>
            
            <BlurContainer className="p-3">
              <Button variant="ghost" className="w-full justify-start">
                <MessageSquare className="h-5 w-5 mr-3 text-primary" />
                Support & Help
                <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
              </Button>
            </BlurContainer>
            
            <BlurContainer className="p-3">
              <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
                <LogOut className="h-5 w-5 mr-3" />
                Log Out
                <ChevronRight className="ml-auto h-5 w-5 opacity-70" />
              </Button>
            </BlurContainer>
          </div>
        </div>
        
        <Navbar />
      </div>
    </PageTransition>
  );
}
