'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Property } from '@/app/admin/PropertyList';
import { Bed, Gem, MapPinHouse, Toilet } from 'lucide-react';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property>();
  const [loading, setLoading] = useState(true);

  const fetchProperty = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/realEstateListings/${id}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch property data.');
      }
      const data = await response.json();
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <p className='text-center text-muted-foreground text-lg'>Loading...</p>
    );
  }

  if (!property) {
    return (
      <p className='text-center text-destructive text-lg font-semibold'>
        Property not found.
      </p>
    );
  }

  return (
    <div className='min-h-screen bg-background text-foreground py-10'>
      <div className='max-w-5xl mx-auto bg-card shadow-lg rounded-lg overflow-hidden'>
        {/* Title Section */}
        <h1 className='text-5xl font-bold text-primary mb-8 text-center'>
          {property.propertyType || 'Property Type'}
        </h1>

        {/* Image Section */}
        <div className='relative w-full h-80'>
          <Image
            src={property.image || '/placeholder.jpg'}
            alt={property.propertyType || 'Property'}
            layout='fill'
            objectFit='cover'
            className='rounded-t-lg'
            unoptimized
          />
        </div>

        {/* Details Section */}
        <div className='p-6 mt-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            {/* Address */}
            <p className='text-muted-foreground text-xl md:text-2xl'>
              <strong className='text-white'>
                <MapPinHouse className='inline mr-2 text-primary' /> Address:
              </strong>{' '}
              <span className='text-gray-300'>{property.address || 'N/A'}</span>
            </p>

            {/* Price */}
            <p className='text-muted-foreground text-xl md:text-2xl'>
              <strong className='text-white'>
                <Gem className='inline mr-2 text-primary ' /> Price:
              </strong>{' '}
              <span className='text-gray-300'>
                {property.price
                  ? `$${property.price.toLocaleString()}`
                  : 'Contact for price'}
              </span>
            </p>

            {/* Bedrooms */}
            <p className='text-muted-foreground text-xl md:text-2xl'>
              <strong className='text-white'>
                <Bed className='inline mr-2 text-primary' /> Bedrooms:
              </strong>{' '}
              <span className='text-gray-300'>
                {property.bedrooms || 'N/A'}
              </span>
            </p>

            {/* Bathrooms */}
            <p className='text-muted-foreground text-xl md:text-2xl'>
              <strong className='text-white'>
                <Toilet className='inline mr-2 text-primary' /> Bathrooms:
              </strong>{' '}
              <span className='text-gray-300'>
                {property.bathrooms || 'N/A'}
              </span>
            </p>

            {/* Size */}
            <p className='text-muted-foreground text-xl md:text-2xl'>
              <strong className='text-white'>Size:</strong>{' '}
              <span className='text-gray-300'>
                {property.squareFeet
                  ? `${property.squareFeet.toLocaleString()} sqft`
                  : 'N/A'}
              </span>
            </p>
          </div>

          {/* Status */}
          <div
            className={`mt-6 px-6 py-3 inline-block rounded-lg font-medium text-sm ${
              property.status === 'Available'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {property.status || 'Status Unknown'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
