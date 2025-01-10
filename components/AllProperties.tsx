'use client';
import { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard'; // Import PropertyCard
import { Property } from '@/app/admin/PropertyList';

const AllProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch properties from API
  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:5000/realEstateListings');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      setError('Error fetching properties.');
      console.error('Error fetching properties:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className='py-6'>
      <h2 className='text-2xl font-bold text-foreground mb-6'>
        All Properties
      </h2>
      {isLoading ? (
        <p className='text-center text-gray-300'>Loading properties...</p>
      ) : error ? (
        <p className='text-center text-red-500'>{error}</p>
      ) : properties.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-300'>No properties available.</p>
      )}
    </div>
  );
};

export default AllProperties;
