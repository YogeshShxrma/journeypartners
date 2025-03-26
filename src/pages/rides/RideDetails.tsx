import React, { useState } from 'react';
import { PageTransition } from '@/components/ui/PageTransition';
import { BlurContainer } from '@/components/ui/BlurContainer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapView } from '@/components/ui/MapView';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Car, Clock, CreditCard, MapPin, MessageSquare, User, Clock8, Users, IndianRupee, Percent } from 'lucide-react';
import { toast } from 'sonner';

// Sample ride data
const sampleRide = {
  id: 1,
  driver: 'Sarah Johnson',
  driverImage: '',
  from: 'North Campus',
  to: 'Downtown',
  date: 'Today, August 24',
  time: '9:30 AM',
  arrivalTime: '10:05 AM',
  price: '₹250',
  seats: 3,
  seatsAvailable: 2,
  rating: 4.8,
  reviewCount: 42,
  carModel: 'Honda Civic',
  carColor: 'Blue',
  licensePlate: 'ABC123',
  description: 'Regular commute from campus to downtown. I take this route every weekday morning.',
  passengers: [
    { id: 1, name: 'You' },
    { id: 2, name: 'Rahul M.' }
  ],
  fuelCost: '₹150',
  tollCost: '₹50',
  commission: '₹12.50'
};

// Payment method options
const paymentMethods = [
  { id: 'paytm', name: 'Paytm', icon: '₹' },
  { id: 'gpay', name: 'Google Pay', icon: 'G' },
  { id: 'phonepe', name: 'PhonePe', icon: 'P' },
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' }
];

export default function RideDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [isBooking, setIsBooking] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showSplitDialog, setShowSplitDialog] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [splitEvenly, setSplitEvenly] = useState(true);
  const [customSplits, setCustomSplits] = useState([
    { id: 1, name: 'You', percentage: 50 },
    { id: 2, name: 'Rahul M.', percentage: 50 }
  ]);
  
  // In a real app, you would fetch ride details based on params.id
  const ride = sampleRide;
  
  const handleBookRide = () => {
    setIsBooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      toast.success('Ride booked successfully!');
      navigate('/rides/confirmed');
    }, 1500);
  };

  const handlePayFuel = () => {
    setShowPaymentDialog(true);
  };

  const handleCompletePayment = () => {
    setShowPaymentDialog(false);
    toast.success(`Payment of ${ride.fuelCost} processed through ${selectedPaymentMethod}. Commission: ${ride.commission}`);
  };

  const handleSplitCost = () => {
    setShowSplitDialog(true);
  };

  const handleCompleteSplit = () => {
    setShowSplitDialog(false);
    toast.success('Cost split request sent to passengers');
  };

  const updateSplitPercentage = (id, newPercentage) => {
    const newSplits = customSplits.map(split => {
      if (split.id === id) {
        return { ...split, percentage: newPercentage };
      }
      return split;
    });
    setCustomSplits(newSplits);
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen pb-24">
        {/* Header */}
        <div className="relative">
          <MapView interactive={true} className="h-[30vh]" />
          
          <div className="absolute top-4 left-4 z-10">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full h-9 w-9 shadow-md"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Ride details */}
        <div className="px-4 py-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold">{ride.from} to {ride.to}</h1>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{ride.date}</span>
                <span className="mx-1">•</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{ride.time}</span>
              </div>
            </div>
            <div className="text-xl font-bold text-primary">{ride.price}</div>
          </div>
          
          <BlurContainer className="p-4 mb-4">
            {/* Driver profile section */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mr-3">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{ride.driver}</h3>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground">
                      ★ {ride.rating}
                    </span>
                    <span className="mx-1 text-muted-foreground text-xs">•</span>
                    <span className="text-sm text-muted-foreground">
                      {ride.reviewCount} reviews
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-full">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>Chat</span>
              </Button>
            </div>
            
            <div className="border-t border-border pt-3">
              <div className="flex items-center mb-2">
                <Car className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm">
                  {ride.carColor} {ride.carModel} • {ride.licensePlate}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{ride.description}</p>
            </div>
          </BlurContainer>
          
          <BlurContainer className="p-4 mb-4">
            {/* Journey details section */}
            <h3 className="font-medium mb-3">Journey Details</h3>
            
            <div className="flex">
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
                  <p className="font-medium">{ride.from}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{ride.time}</span>
                  </div>
                </div>
                
                <div className="my-2">
                  <Badge variant="outline" className="text-xs">
                    <Clock8 className="h-3 w-3 mr-1" /> 35 min journey
                  </Badge>
                </div>
                
                <div>
                  <p className="font-medium">{ride.to}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{ride.arrivalTime} (est.)</span>
                  </div>
                </div>
              </div>
            </div>
          </BlurContainer>

          {/* New: Passengers section */}
          <BlurContainer className="p-4 mb-4">
            <h3 className="font-medium mb-3">Passengers</h3>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-muted-foreground mr-2" />
                <span>{ride.passengers.length} passengers</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleSplitCost}>
                Split Costs
              </Button>
            </div>
            
            <div className="space-y-2">
              {ride.passengers.map(passenger => (
                <div key={passenger.id} className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center mr-2">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">{passenger.name}</span>
                </div>
              ))}
            </div>
          </BlurContainer>

          {/* Fuel Payment section */}
          <BlurContainer className="p-4 mb-4">
            <h3 className="font-medium mb-3">Fuel & Tolls</h3>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <IndianRupee className="h-4 w-4 text-muted-foreground mr-2" />
                <span>Fuel: {ride.fuelCost}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handlePayFuel}
              >
                Pay Directly
              </Button>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Percent className="h-3 w-3 mr-1" />
              <span>Service fee: {ride.commission} (5% of transaction)</span>
            </div>
          </BlurContainer>
          
          <BlurContainer className="p-4 mb-5">
            <h3 className="font-medium mb-2">Payment Details</h3>
            
            <div className="flex justify-between items-center text-sm mb-2">
              <span>Base fare</span>
              <span>₹200</span>
            </div>
            <div className="flex justify-between items-center text-sm mb-2">
              <span>Service fee</span>
              <span>₹50</span>
            </div>
            <div className="flex justify-between items-center font-medium mt-3 pt-3 border-t">
              <span>Total</span>
              <span className="text-primary">{ride.price}</span>
            </div>
          </BlurContainer>
          
          <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md p-4 border-t">
            <div className="flex justify-between items-center mb-3">
              <div>
                <span className="text-sm text-muted-foreground">Available seats</span>
                <div className="flex items-center">
                  <span className="font-medium">{ride.seatsAvailable}</span>
                  <span className="text-sm text-muted-foreground ml-1">of {ride.seats}</span>
                </div>
              </div>
              <div className="text-xl font-bold text-primary">{ride.price}</div>
            </div>
            
            <Button 
              className="w-full" 
              size="lg"
              disabled={isBooking}
              onClick={handleBookRide}
            >
              {isBooking ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" /> Book this ride
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pay for Fuel</DialogTitle>
            <DialogDescription>
              Pay directly for fuel and tolls. A 5% service fee will be applied.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <h4 className="text-sm font-medium">Select payment method:</h4>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map(method => (
                <Button
                  key={method.id}
                  variant={selectedPaymentMethod === method.id ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setSelectedPaymentMethod(method.id)}
                >
                  <div className="mr-2 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    {method.icon}
                  </div>
                  {method.name}
                </Button>
              ))}
            </div>
            
            <div className="border rounded-lg p-3 mt-2">
              <div className="flex justify-between items-center text-sm mb-2">
                <span>Fuel cost</span>
                <span>{ride.fuelCost}</span>
              </div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span>Tolls</span>
                <span>{ride.tollCost}</span>
              </div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span>Service fee (5%)</span>
                <span>{ride.commission}</span>
              </div>
              <div className="flex justify-between items-center font-medium mt-3 pt-3 border-t">
                <span>Total</span>
                <span className="text-primary">₹212.50</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>Cancel</Button>
            <Button 
              disabled={!selectedPaymentMethod} 
              onClick={handleCompletePayment}
            >
              Pay ₹212.50
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cost Split Dialog */}
      <Dialog open={showSplitDialog} onOpenChange={setShowSplitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Split Ride Costs</DialogTitle>
            <DialogDescription>
              Decide how to split costs among passengers
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Splitting method:</h4>
              <div className="flex items-center space-x-2">
                <Button 
                  variant={splitEvenly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSplitEvenly(true)}
                >
                  Even Split
                </Button>
                <Button 
                  variant={!splitEvenly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSplitEvenly(false)}
                >
                  Custom Split
                </Button>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              {splitEvenly ? (
                <div className="space-y-3">
                  {ride.passengers.map(passenger => (
                    <div key={passenger.id} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center mr-2">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span>{passenger.name}</span>
                      </div>
                      <span className="font-medium">₹125</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {customSplits.map(split => (
                    <div key={split.id} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center mr-2">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span>{split.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={split.percentage}
                          onChange={(e) => updateSplitPercentage(split.id, parseInt(e.target.value))}
                          className="w-24"
                        />
                        <span className="font-medium w-16 text-right">{split.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex justify-between items-center font-medium mt-3 pt-3 border-t">
                <span>Total</span>
                <span className="text-primary">{ride.price}</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSplitDialog(false)}>Cancel</Button>
            <Button onClick={handleCompleteSplit}>
              Send Split Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}
