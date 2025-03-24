
import React, { ReactNode, forwardRef } from 'react';
import { cn } from "@/lib/utils";

interface BlurContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  intensity?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  borderOpacity?: 'none' | 'sm' | 'md' | 'lg';
}

const blurMap = {
  none: '',
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
};

const borderOpacityMap = {
  none: 'border-opacity-0',
  sm: 'border-opacity-5',
  md: 'border-opacity-10',
  lg: 'border-opacity-20',
};

export const BlurContainer = forwardRef<HTMLDivElement, BlurContainerProps>(
  ({ children, intensity = 'md', borderOpacity = 'md', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white/70 dark:bg-black/70",
          blurMap[intensity],
          "border border-white",
          borderOpacityMap[borderOpacity],
          "dark:border-white/5 rounded-xl",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BlurContainer.displayName = "BlurContainer";
