'use client';

import { useToast } from '@/hooks/use-toast';

export const useShowToast = () => {
  const { toast } = useToast();

  return (options: {
    title: string;
    description?: string;
    variant?: 'default' | 'destructive';
  }) => {
    const toastStyles = getToastStyles(options.variant);

    toast({
      title: options.title,
      description: options.description,
      variant: options.variant || 'default',
      className: toastStyles,
    });
  };
};

// Helper function to return toast styles based on the variant
const getToastStyles = (variant: 'default' | 'destructive' | undefined) => {
  const baseStyles =
    'p-4 rounded-lg text-sm font-medium shadow-md border transition-all duration-300';

  if (variant === 'destructive') {
    return `${baseStyles} bg-[#7F1D1D] text-primary border-[#7F1D1D] `;
  }

  return `${baseStyles} bg-gray-300 text-black border-gray-300 `;
};
