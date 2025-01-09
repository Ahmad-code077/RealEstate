'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropertyList from './PropertyList';
import AddProperty from './AddProperty';
import { Button } from '@/components/ui/button';

const AdminPage = () => {
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/');
      return;
    }

    const user = JSON.parse(loggedInUser);
    if (user.email !== 'admin@gmail.com') {
      router.push('/'); // If not admin, redirect to home
    } else {
      fetchProperties();
    }
  }, [router]);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:5000/realEstateListings');
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  return (
    <div className='min-h-screen'>
      {/* Header Section */}
      <div className='flex items-center justify-between p-6 border-b-2 border-gray-200'>
        <Button
          onClick={() => setShowAddPopup(true)}
          size='lg'
          className='text-lg rounded-lg hover:bg-secondary/90 text-black hover:text-white transition-all duration-300 hover:scale-105'
        >
          +
        </Button>
      </div>

      {/* Property List Section */}
      <div className='p-6'>
        <PropertyList
          properties={properties}
          refreshProperties={fetchProperties}
        />
      </div>

      {/* Add Property Popup */}
      {showAddPopup && (
        <AddProperty
          onClose={() => setShowAddPopup(false)}
          refreshProperties={fetchProperties}
        />
      )}
    </div>
  );
};

export default AdminPage;
