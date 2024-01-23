import React from 'react';

const HomeBanner = () => {
  return (
    <div className="home-banner1 container-fluid mx-auto ">
      <a href="/product-list?gender=men,women&category=top,accessories&attribute=">
        <img
          src="https://ananas.vn/wp-content/uploads/Banner_Clothing.jpg"
          alt="Clothing Banner"
          className="w-full max-w-2xl object-cover sm:h-screen md:h-768 lg:h-screen xl:h-768"
          style={{ maxHeight: '100vh', width: '100vw', maxWidth: '1920px', objectFit: 'cover' }}   
        />
      </a>
    </div>
  );
};

export default HomeBanner;
