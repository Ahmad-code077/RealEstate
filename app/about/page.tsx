import { Home, Shield, Users } from 'lucide-react';

const About = () => {
  const testimonials = [
    {
      name: 'John Doe',
      role: 'Home Buyer',
      feedback:
        'I had an amazing experience finding my dream home with this platform. The search was easy, and the support was fantastic!',
    },
    {
      name: 'Jane Smith',
      role: 'Property Seller',
      feedback:
        'Selling my property was seamless, and I received great advice and assistance from the team. Highly recommended!',
    },
    {
      name: 'Michael Johnson',
      role: 'Investor',
      feedback:
        'This site made it easy for me to find profitable investment opportunities. Great features and excellent customer service!',
    },
  ];
  const aboutDetails = [
    {
      id: 1,
      icon: <Home size={48} className='text-primary' />,
      title: 'Your Dream Home Awaits',
      description:
        'We offer a variety of properties tailored to your needs, whether you are looking for a family home, an investment property, or a vacation spot.',
    },
    {
      id: 2,
      icon: <Users size={48} className='text-primary' />,
      title: 'Trusted by Thousands',
      description:
        'Our platform is trusted by thousands of buyers, sellers, and investors for its seamless, transparent, and reliable real estate services.',
    },
    {
      id: 3,
      icon: <Shield size={48} className='text-primary' />,
      title: 'Secure Transactions',
      description:
        'We ensure that your real estate transactions are secure and hassle-free, with dedicated support every step of the way.',
    },
  ];

  return (
    <div className='bg-background text-foreground'>
      {/* About Section */}
      <div className='py-12 text-center'>
        <h1 className='text-5xl font-bold text-primary mb-4'>About Us</h1>
        <p className='text-lg text-gray-200'>
          We are dedicated to providing a seamless experience for property
          buyers, sellers, and investors. Our platform offers a wide range of
          properties that cater to every need, with personalized support to
          guide you through the entire process.
        </p>
        <div className='mt-8'>
          <p className='text-lg text-gray-200'>
            Whether you&apos;re buying your first home, selling a property, or
            making an investment, we are here to help. With our user-friendly
            platform and professional expertise, finding your next property has
            never been easier.
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className='py-12 bg-card'>
        <h2 className='text-3xl font-bold text-primary text-center mb-8'>
          What Our Clients Say
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className='p-6 bg-card shadow-lg rounded-default border border-muted-foreground  text-center'
            >
              <p className='text-xl font-semibold text-primary '>
                {testimonial.name}
              </p>
              <p className='text-md text-white mb-4'>{testimonial.role}</p>
              <p className='text-lg text-gray-300'>
                &quot;{testimonial.feedback}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Mission Section */}
      <div className='py-12 text-center'>
        <h2 className='text-3xl font-bold  mb-4'>Our Mission</h2>
        <p className='text-lg text-muted-foreground'>
          Our mission is to revolutionize the real estate industry by offering
          innovative tools and exceptional service. We are committed to helping
          our clients find the perfect property while ensuring a smooth and
          transparent transaction process.
        </p>
      </div>

      <h2 className='text-4xl font-semibold text-gray-900 dark:text-white mb-8 text-center'>
        What We Offer
      </h2>
      <div className='grid md:grid-cols-3 gap-8'>
        {aboutDetails.map((detail) => (
          <div
            key={detail.id}
            className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-center gap-2 border border-secondary'
          >
            <div className='mb-4 '>{detail.icon}</div>
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

export default About;
