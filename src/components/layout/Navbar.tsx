
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Car, User, MapPin } from 'lucide-react';
import { BlurContainer } from '../ui/BlurContainer';

export function Navbar() {
  const location = useLocation();
  
  const routes = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/rides/browse', icon: Car, label: 'Rides' },
    { path: '/map', icon: MapPin, label: 'Map' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];
  
  return (
    <div className="fixed bottom-5 left-0 right-0 z-50 flex justify-center px-4">
      <BlurContainer className="px-2 py-1 flex items-center justify-around w-full max-w-xs shadow-lg">
        {routes.map(route => (
          <Link 
            key={route.path} 
            to={route.path}
            className={cn(
              "nav-item flex flex-col items-center",
              location.pathname === route.path && "active"
            )}
          >
            <route.icon className={cn(
              "w-5 h-5 mb-1 transition-transform duration-300",
              location.pathname === route.path ? "text-primary scale-110" : "text-muted-foreground"
            )} />
            <span className="text-[10px] font-medium">{route.label}</span>
          </Link>
        ))}
      </BlurContainer>
    </div>
  );
}
