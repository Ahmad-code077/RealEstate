'use client';
import { Property } from '@/app/admin/PropertyList';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const router = useRouter();

  const handleNavigate = (id: string | number) => {
    router.push(`/property/${id}`); // Navigate to the dynamic route
  };

  return (
    <div
      className='bg-card text-card-foreground shadow-md rounded-default overflow-hidden border border-white hover:shadow-lg transition-all hover:scale-[1.015] duration-300 cursor-pointer'
      onClick={() => handleNavigate(property.id)}
    >
      <div className='relative w-full h-48'>
        <Image
          src={property.image || '/placeholder.jpg'} // Fallback to a placeholder image
          alt={property.propertyType || 'Property'}
          layout='fill'
          objectFit='cover'
          className='rounded-t-default'
          unoptimized
        />
      </div>
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-foreground'>
          {property.propertyType || 'Property Type'}
        </h3>
        <p className='text-sm mt-2'>
          <strong>Address:</strong> {property.address || 'N/A'}
        </p>
        <p className='text-sm text-muted-foreground mt-2'>
          <strong>Price:</strong>{' '}
          {property.price
            ? `$${property.price.toLocaleString()}`
            : 'Contact for price'}
        </p>
        <p className='text-sm text-muted-foreground mt-2'>
          <strong>Bedrooms:</strong> {property.bedrooms || 'N/A'} |{' '}
          <strong>Bathrooms:</strong> {property.bathrooms || 'N/A'}
        </p>
        <p className='text-sm text-muted-foreground mt-2'>
          <strong>Size:</strong>{' '}
          {property.squareFeet
            ? `${property.squareFeet.toLocaleString()} sqft`
            : 'N/A'}
        </p>

        <div
          className={`mt-4 px-3 py-1 inline-block rounded-default font-medium ${
            property.status === 'Available'
              ? 'bg-primary text-primary-foreground'
              : 'bg-destructive text-destructive-foreground'
          }`}
        >
          {property.status || 'Status Unknown'}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
