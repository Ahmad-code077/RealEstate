'use client';
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar'; // Import SearchBar
import PropertyCard from './PropertyCard'; // Import PropertyCard
import { Property } from '@/app/admin/PropertyList';

const AllProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
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
      setFilteredProperties(data); // Initialize filtered properties
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

  // Filter properties when search term changes
  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = properties.filter(
      (property) =>
        property.propertyType.toLowerCase().includes(lowerCaseSearchTerm) ||
        property.address.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredProperties(filtered);
  }, [searchTerm, properties]);

  return (
    <div className='py-6'>
      <h1 className='text-center font-bold text-2xl sm:text-4xl my-4'>
        Find Your Dream Property
      </h1>

      <div className='flex justify-between items-center flex-wrap'>
        <h2 className='text-2xl font-bold text-foreground '>All Properties</h2>

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      {/* Property List */}
      {isLoading ? (
        <p className='text-center text-gray-300'>Loading properties...</p>
      ) : error ? (
        <p className='text-center text-red-500'>{error}</p>
      ) : filteredProperties.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-300'>
          No properties match your search criteria.
        </p>
      )}
    </div>
  );
};

export default AllProperties;
