'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useShowToast } from '@/components/Toast/ToastShad';

// Define validation schema for the form using Zod
const propertySchema = z.object({
  propertyType: z.string().min(1, 'Property Type is required'),
  image: z.string().url('Invalid image URL').min(1, 'Image URL is required'),
  address: z.string().min(1, 'Address is required'),
  price: z.number().positive('Price must be a positive number'),
  bedrooms: z.number().positive('Bedrooms must be a positive number'),
  bathrooms: z.number().positive('Bathrooms must be a positive number'),
  squareFeet: z.number().positive('Size must be a positive number'),
  status: z.string().min(1, 'Status is required'),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

interface AddPropertyPopupProps {
  onClose: () => void;
  refreshProperties: () => void;
}

const AddPropertyPopup: React.FC<AddPropertyPopupProps> = ({
  onClose,
  refreshProperties,
}) => {
  const showToast = useShowToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
  });

  const handleAddProperty = async (data: PropertyFormValues) => {
    try {
      const response = await fetch('http://localhost:5000/realEstateListings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showToast({
          title: 'Property Added Successfully!',
          description: 'The property has been added.',
        });
        refreshProperties();
        onClose();
        reset(); // Reset form after successful submission
      } else {
        showToast({
          title: 'Error Adding Property',
          description: 'There was an issue adding the property.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      showToast({
        title: 'Error',
        description: `An error occurred while adding the property. ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-md sm:w-[400px] p-6'>
        <h2 className='text-2xl font-semibold text-gray-600 mb-4'>
          Add New Property
        </h2>
        <form onSubmit={handleSubmit(handleAddProperty)} className='space-y-4'>
          <div>
            <Input
              placeholder='Enter property type'
              {...register('propertyType')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.propertyType && (
              <p className='text-red-500 text-sm'>
                {errors.propertyType.message}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter image URL'
              {...register('image')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.image && (
              <p className='text-red-500 text-sm'>{errors.image.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter full address'
              {...register('address')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.address && (
              <p className='text-red-500 text-sm'>{errors.address.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter price'
              {...register('price', { valueAsNumber: true })}
              className='bg-gray-100 text-gray-700'
              type='number'
            />
            {errors.price && (
              <p className='text-red-500 text-sm'>{errors.price.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter number of bedrooms'
              {...register('bedrooms', { valueAsNumber: true })}
              className='bg-gray-100 text-gray-700'
              type='number'
            />
            {errors.bedrooms && (
              <p className='text-red-500 text-sm'>{errors.bedrooms.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter number of bathrooms'
              {...register('bathrooms', { valueAsNumber: true })}
              className='bg-gray-100 text-gray-700'
              type='number'
            />
            {errors.bathrooms && (
              <p className='text-red-500 text-sm'>{errors.bathrooms.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter size in sqft'
              {...register('squareFeet', { valueAsNumber: true })}
              className='bg-gray-100 text-gray-700'
              type='number'
            />
            {errors.squareFeet && (
              <p className='text-red-500 text-sm'>
                {errors.squareFeet.message}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter property status'
              {...register('status')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.status && (
              <p className='text-red-500 text-sm'>{errors.status.message}</p>
            )}
          </div>
          <div className='flex justify-end space-x-4'>
            <Button
              type='button'
              className='bg-gray-300 text-gray-700 hover:bg-gray-400'
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='bg-secondary text-white hover:bg-secondary/90'
            >
              Add Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyPopup;
