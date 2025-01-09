'use client';

import { useShowToast } from '@/components/Toast/ToastShad';
import { useState } from 'react';

// Define types for the props of DeletePropertyPopup
interface DeletePropertyPopupProps {
  propertyId: number | string;
  onClose: () => void;
  refreshProperties: () => void;
}

const DeletePropertyPopup: React.FC<DeletePropertyPopupProps> = ({
  propertyId,
  onClose,
  refreshProperties,
}) => {
  const showToast = useShowToast();

  const handleDeleteProperty = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/realEstateListings/${propertyId}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        showToast({
          title: 'Property Deleted Successfully!',
          description: 'The property has been removed.',
        });
        refreshProperties();
        onClose(); // Close the popup after deleting
      } else {
        showToast({
          title: 'Error Deleting Property',
          description: 'There was an issue deleting the property.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      showToast({
        title: 'Error',
        description: `An error occurred while deleting the property. ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-md sm:w-[400px] p-6'>
        <h2 className='text-xl font-bold text-secondary mb-4'>Are you sure?</h2>
        <p className='text-gray-600 mb-6'>
          Do you really want to delete this property? This action cannot be
          undone.
        </p>
        <div className='flex justify-end space-x-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-black transition duration-200'
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteProperty}
            className='px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition duration-200'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Define types for the props of DeletePropertyButton
interface DeletePropertyButtonProps {
  propertyId: number | string;
  refreshProperties: () => void;
}

const DeletePropertyButton: React.FC<DeletePropertyButtonProps> = ({
  propertyId,
  refreshProperties,
}) => {
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);

  const handleOpenDeletePopup = () => {
    setIsDeletePopupVisible(true);
  };

  const handleCloseDeletePopup = () => {
    setIsDeletePopupVisible(false);
  };

  return (
    <>
      <button
        onClick={handleOpenDeletePopup}
        className='px-4 py-2 bg-[#E11D48] text-white rounded-lg hover:bg-[#BE123C] focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition duration-200'
      >
        Delete
      </button>

      {isDeletePopupVisible && (
        <DeletePropertyPopup
          propertyId={propertyId}
          onClose={handleCloseDeletePopup}
          refreshProperties={refreshProperties}
        />
      )}
    </>
  );
};

export default DeletePropertyButton;
