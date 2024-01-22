import React from 'react';

const HomeBuy = () => {
  const categories = [
    {
      title: 'GIÀY NAM',
      imageUrl: 'https://ananas.vn/wp-content/uploads/catalogy-1.jpg',
      links: [
        { label: 'New Arrivals', url: '/product-list?gender=men&category=shoes&attribute=new-arrival' },
        { label: 'Best Seller', url: '/product-list?gender=men&category=shoes&attribute=best-seller' },
        { label: 'Sale-off', url: '/product-list?gender=men&category=shoes&attribute=sale-off' },
      ],
    },
    {
      title: 'GIÀY NỮ',
      imageUrl: 'https://ananas.vn/wp-content/uploads/catalogy-2.jpg',
      links: [
        { label: 'New Arrivals', url: '/product-list?gender=women&category=shoes&attribute=new-arrival' },
        { label: 'Best Seller', url: '/product-list?gender=women&category=shoes&attribute=best-seller' },
        { label: 'Sale-off', url: '/product-list?gender=women&category=shoes&attribute=sale-off' },
      ],
    },
    {
      title: 'DÒNG SẢN PHẨM',
      imageUrl: 'https://ananas.vn/wp-content/uploads/catalogy-3.jpg',
      links: [
        { label: 'Basas', url: '/product-list?gender=&category=&attribute=basas' },
        { label: 'Vintas', url: '/product-list?gender=&category=&attribute=vintas' },
        { label: 'Urbas', url: '/product-list?gender=&category=&attribute=urbas' },
        { label: 'Pattas', url: '/product-list?gender=&category=&attribute=pattas' },
      ],
    },
  ];

  return (
    <div className="home-buy container mx-auto sm:px-4 md:px-6 lg:px-8 p-16	">
      <div className="text-3xl font-bold mb-4 text-center">DANH MỤC MUA HÀNG</div>
      <div className="flex flex-wrap justify-center	">
        {categories.map((category, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
            <div className="item relative">
              <div className="item-bg relative overflow-hidden">
                <div className="black-bg absolute inset-0"></div>
                <img src={category.imageUrl} alt={category.title} className="w-full object-cover" />
              </div>
              <div className="item-group absolute inset-0 flex flex-col justify-center items-center text-white">
                <a className="title text-lg font-semibold" href="#">
                  {category.title}
                </a>
                {category.links.map((link, linkIndex) => (
                  <a key={linkIndex} className="sub text-sm mt-1" href={link.url}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeBuy;
