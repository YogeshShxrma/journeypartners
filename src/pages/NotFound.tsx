
import React from 'react';
import { PageTransition } from '@/components/ui/PageTransition';
import { BlurContainer } from '@/components/ui/BlurContainer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-5">
        <BlurContainer className="w-full max-w-md p-8 flex flex-col items-center text-center">
          <div className="text-7xl font-bold mb-6">404</div>
          <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="w-full flex flex-col space-y-3">
            <Link to="/">
              <Button className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to RouteMates
              </Button>
            </Link>
          </div>
        </BlurContainer>
      </div>
    </PageTransition>
  );
};

export default NotFound;
