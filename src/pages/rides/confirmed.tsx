
import React from 'react';
import { PageTransition } from '@/components/ui/PageTransition';
import { BlurContainer } from '@/components/ui/BlurContainer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RideConfirmed() {
  const navigate = useNavigate();
  
  return (
    <PageTransition>
      <div className="min-h-screen px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-md text-center mb-8">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Ride Booked Successfully!</h1>
          <p className="text-muted-foreground">Your ride has been confirmed. The driver has been notified.</p>
        </div>
        
        <BlurContainer className="p-4 mb-4 w-full max-w-md">
          <h2 className="font-medium mb-4">Ride Details</h2>
          
          <div className="flex mb-4">
            <div className="flex flex-col items-center mr-3">
              <div className="h-6 w-6 rounded-full flex items-center justify-center bg-primary/10">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
              </div>
              <div className="h-10 w-0.5 bg-dashed-gradient my-1 border-l border-dashed border-primary/30"></div>
              <div className="h-6 w-6 rounded-full flex items-center justify-center bg-primary/10">
                <MapPin className="h-3 w-3 text-primary" />
              </div>
            </div>
            
            <div className="flex flex-col justify-between grow">
              <div>
                <p className="font-medium">North Campus</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>9:30 AM</span>
                </div>
              </div>
              
              <div>
                <p className="font-medium">Downtown</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>10:05 AM (est.)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>Today, August 24</span>
            </div>
            <Badge variant="outline">₹250</Badge>
          </div>
        </BlurContainer>
        
        <BlurContainer className="p-4 mb-6 w-full max-w-md">
          <h3 className="font-medium mb-3">Payment Options</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Pay for ride</span>
              <Badge variant="outline">₹250</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Pay for fuel</span>
              <Badge variant="outline">₹150</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Split costs with passengers</span>
              <Button variant="outline" size="sm" className="h-7">
                Split Now
              </Button>
            </div>
          </div>
        </BlurContainer>
        
        <div className="w-full max-w-md space-y-3">
          <Button className="w-full" onClick={() => navigate('/rides/browse')}>
            Find More Rides
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate('/rides/1')}>
            View Ride Details <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
