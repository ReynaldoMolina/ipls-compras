import { cn } from '@/lib/utils';
import React from 'react';

interface FormInputGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function FormInputGroup({ children, className }: FormInputGroupProps) {
  return (
    <div className={cn('flex flex-col md:flex-row gap-5 w-full', className)}>
      {children}
    </div>
  );
}
