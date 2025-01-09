'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useShowToast } from '@/components/Toast/ToastShad';
import { Property } from './PropertyList';

// Validation schema with preprocessing for numeric fields
const propertySchema = z.object({
  propertyType: z.string().min(1, 'Property Type is required'),
  image: z.string().url('Invalid image URL').min(1, 'Image URL is required'),
  address: z.string().min(1, 'Address is required'),
  price: z.coerce.number().min(1, 'Price is required'), // Coerce strings to numbers
  bedrooms: z.coerce.number().min(1, 'Bedrooms are required'),
  bathrooms: z.coerce.number().min(1, 'Bathrooms are required'),
  squareFeet: z.coerce.number().min(1, 'Size is required'),
  status: z.string().min(1, 'Status is required'),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

interface UpdatePropertyPopupProps {
  property: Property;
  onClose: () => void;
  refreshProperties: () => void;
}

const UpdatePropertyPopup: React.FC<UpdatePropertyPopupProps> = ({
  property,
  onClose,
  refreshProperties,
}) => {
  const showToast = useShowToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      propertyType: property.propertyType,
      image: property.image,
      address: property.address,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      squareFeet: property.squareFeet,
      status: property.status,
    },
  });

  // Handle form submission
  const handleUpdateProperty = async (data: PropertyFormValues) => {
    try {
      const response = await fetch(
        `http://localhost:5000/realEstateListings/${property.id}`,
        {
          method: 'PATCH', // Use PATCH to update only specific fields
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        showToast({
          title: 'Property Updated Successfully!',
          description: 'The property details have been updated.',
        });
        refreshProperties();
        onClose();
      } else {
        showToast({
          title: 'Error Updating Property',
          description: 'There was an issue updating the property.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      showToast({
        title: 'Error',
        description: `An error occurred while updating the property. ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-md sm:w-[400px] p-6'>
        <h2 className='text-2xl font-semibold text-gray-600 mb-4'>
          Update Property
        </h2>
        <form
          onSubmit={handleSubmit(handleUpdateProperty)}
          className='space-y-4'
        >
          <div>
            <Input
              placeholder='Enter property type'
              {...register('propertyType')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.propertyType && (
              <p className='text-red-500 text-sm'>
                {String(errors.propertyType.message)}
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
              <p className='text-red-500 text-sm'>
                {String(errors.image.message)}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter full address'
              {...register('address')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.address && (
              <p className='text-red-500 text-sm'>
                {String(errors.address.message)}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter price'
              {...register('price')}
              className='bg-gray-100 text-gray-700'
              type='text'
              onChange={(e) =>
                setValue('price', parseFloat(e.target.value) || 0)
              }
            />
            {errors.price && (
              <p className='text-red-500 text-sm'>{errors.price.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter number of bedrooms'
              {...register('bedrooms')}
              className='bg-gray-100 text-gray-700'
              type='text'
              onChange={(e) =>
                setValue('bedrooms', parseInt(e.target.value, 10) || 0)
              }
            />
            {errors.bedrooms && (
              <p className='text-red-500 text-sm'>{errors.bedrooms.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter number of bathrooms'
              {...register('bathrooms')}
              className='bg-gray-100 text-gray-700'
              type='text'
              onChange={(e) =>
                setValue('bathrooms', parseInt(e.target.value, 10) || 0)
              }
            />
            {errors.bathrooms && (
              <p className='text-red-500 text-sm'>{errors.bathrooms.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter size in sqft'
              {...register('squareFeet')}
              className='bg-gray-100 text-gray-700'
              type='text'
              onChange={(e) =>
                setValue('squareFeet', parseInt(e.target.value, 10) || 0)
              }
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
              Update Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePropertyPopup;
