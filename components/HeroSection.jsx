const HeroSection = () => {
  return (
    <main>
      {/* Welcome Section */}
      <div className='text-center py-12'>
        <h1 className='text-5xl font-bold  mb-4'>
          Welcome to Your <span className='text-primary'>Dream Home</span>
        </h1>
        <p className='text-lg text-foreground'>
          Discover the best properties tailored to your needs. Whether
          you&apos;re buying, renting, or just exploring, we have something for
          everyone.
        </p>
      </div>
      {/* Property Search Section */}
      <div className=' p-8   text-center'>
        <h2 className='text-3xl font-bold text-primary mb-6'>
          Find Your Perfect Property
        </h2>
        <p className='text-lg text-foreground mb-6'>
          Search for properties based on location, price, and more. Start your
          journey to a new home today.
        </p>
      </div>
    </main>
  );
};
export default HeroSection;
