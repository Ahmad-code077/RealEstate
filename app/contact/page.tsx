'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react'; // Import icons from lucide-react
import { useShowToast } from '@/components/Toast/ToastShad';

const Contact: React.FC = () => {
  const showToast = useShowToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State for handling form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data for the contact cards
  const contactDetails = [
    {
      id: 1,
      icon: <Phone size={48} className='text-primary' />,
      title: 'Call Us',
      description: '+92-1234567890',
    },
    {
      id: 2,
      icon: <Mail size={48} className='text-primary' />,
      title: 'Email Us',
      description: 'contact@househeaven.com',
    },
    {
      id: 3,
      icon: <MapPin size={48} className='text-primary' />,
      title: 'Visit Us',
      description: 'Lahore, Pakistan',
    },
  ];

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all fields are filled
    if (formData.name && formData.email && formData.message) {
      setIsSubmitting(true);

      // Simulate form submission (e.g., sending the data to a backend)
      console.log('Form data submitted:', formData);

      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      // Show success toast message
      showToast({
        title: 'Success!',
        description: 'Your message has been submitted successfully.',
        variant: 'default',
      });

      setIsSubmitting(false);
    } else {
      // Show error toast if fields are missing
      showToast({
        title: 'Error',
        description: 'Please fill all the fields before submitting.',
        variant: 'destructive',
      });
      console.log('error');
    }
  };

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className='p-6 max-w-5xl mx-auto'>
      {/* Header Section */}
      <div className='text-center mb-10'>
        <h1 className='text-5xl font-extrabold text-gray-900 dark:text-white'>
          Contact <span className='text-primary'>House Heaven</span>
        </h1>
        <p className='text-lg text-gray-700 dark:text-gray-300 mt-4'>
          We’d love to hear from you! Whether you have questions, feedback, or
          just want to say hello, feel free to reach out to us.
        </p>
      </div>

      {/* Contact Cards Section */}

      {/* Contact Form Section */}
      <div className='mt-12 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg'>
        <h2 className='text-4xl font-semibold text-gray-900 dark:text-white mb-6 text-center'>
          Send Us a Message
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label
              className='block text-lg text-gray-700 dark:text-gray-300 mb-2'
              htmlFor='name'
            >
              Your Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              className='w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary'
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-lg text-gray-700 dark:text-gray-300 mb-2'
              htmlFor='email'
            >
              Your Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className='w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary'
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-lg text-gray-700 dark:text-gray-300 mb-2'
              htmlFor='message'
            >
              Your Message
            </label>
            <textarea
              id='message'
              name='message'
              rows={6}
              value={formData.message}
              onChange={handleInputChange}
              className='w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary'
            ></textarea>
          </div>
          <button
            type='submit'
            className='w-full py-3 px-4 bg-primary text-white text-lg rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
      <h2 className='text-4xl font-semibold text-gray-900 dark:text-white mb-8 text-center mt-8'>
        Get in Touch
      </h2>
      <div className='grid md:grid-cols-3 gap-8'>
        {contactDetails.map((detail) => (
          <div
            key={detail.id}
            className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-center gap-2 border border-primary'
          >
            <div className='mb-4'>{detail.icon}</div>
            <h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
              {detail.title}
            </h3>
            <p className='text-lg text-gray-700 dark:text-gray-300'>
              {detail.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
