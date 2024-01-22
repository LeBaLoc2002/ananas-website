import React from 'react';

const HomeBanner = () => {
  return (
    <div className="home-banner1 container mx-auto sm:px-4 md:px-6 lg:px-8 hidden-xs hidden-sm p-10">
      <a href="/product-list?gender=men,women&category=top,accessories&attribute=">
        <img src="https://ananas.vn/wp-content/uploads/Banner_Clothing.jpg" alt="Clothing Banner" className="w-full" />
      </a>
    </div>
  );
};

export default HomeBanner;
