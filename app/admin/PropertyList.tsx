import UpdatePropertyPopup from './UpdatePropertyPopup';
import DeletePropertyButton from './DeletePropertyButton';
import { useState } from 'react';
import Image from 'next/image';

export interface Property {
  id: number | string;
  propertyType: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  image: string;
  status: string;
}

interface PropertyListProps {
  properties: Property[];
  refreshProperties: () => void;
}

const PropertyList = ({ properties, refreshProperties }: PropertyListProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  return (
    <div className='py-6'>
      <h2 className='text-2xl font-bold text-foreground mb-6'>
        All Properties
      </h2>
      {properties.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {properties.map((property) => (
            <div
              key={property.id}
              className='bg-secondary shadow-md rounded-lg overflow-hidden border-2 border-secondary hover:shadow-lg transition-shadow w-full'
            >
              <div className='relative w-full h-48'>
                <Image
                  src={property.image} // assuming first picture is the main one
                  alt={property.propertyType}
                  layout='fill'
                  objectFit='cover'
                  className='rounded-t-lg'
                  unoptimized
                />
              </div>
              <div className='p-4'>
                <h3 className='text-xl font-semibold text-foreground'>
                  {property.propertyType}
                </h3>
                <p className='text-sm text-gray-300 mt-2'>
                  <strong>Address:</strong> {property.address}
                </p>
                <p className='text-sm text-gray-300 mt-2'>
                  <strong>Price:</strong> ${property.price}
                </p>
                <p className='text-sm text-gray-300 mt-2'>
                  <strong>Bedrooms:</strong> {property.bedrooms} |{' '}
                  <strong>Bathrooms:</strong> {property.bathrooms}
                </p>
                <p className='text-sm text-gray-300 mt-2'>
                  <strong>Size:</strong> {property.squareFeet} sqft
                </p>
                <div className='mt-4 flex space-x-2'>
                  <button
                    onClick={() => setSelectedProperty(property)}
                    className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary-dark focus:ring-offset-2 transition-all'
                  >
                    Update
                  </button>
                  <DeletePropertyButton
                    propertyId={property.id}
                    refreshProperties={refreshProperties}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-300 text-center'>No properties available.</p>
      )}

      {selectedProperty && (
        <UpdatePropertyPopup
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          refreshProperties={refreshProperties}
        />
      )}
    </div>
  );
};

export default PropertyList;
