'use client';

import Link from 'next/link';

const Footer = () => {
  const data = [
    { id: 4, link: '/', title: 'Home' },
    { id: 2, link: '/about', title: 'About' },
    { id: 3, link: '/contact', title: 'Contact' },
  ];

  return (
    <footer className='bg-background text-gray-700 dark:text-gray-300 py-8 mt-16 border-t border-white'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center text-center md:text-left'>
          {/* Logo */}
          <div className='mb-6 md:mb-0'>
            <Link
              href='/'
              className='text-2xl font-extrabold hover:text-primary transition-all'
            >
              HouseHaven
            </Link>
          </div>

          {/* Footer Links */}
          <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
            {data.map((item) => (
              <Link
                href={item.link}
                key={item.id}
                className='hover:text-primary transition-all'
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className='mt-6 text-sm text-gray-500 dark:text-gray-400 text-center'>
          &copy; {new Date().getFullYear()} HouseHaven. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
