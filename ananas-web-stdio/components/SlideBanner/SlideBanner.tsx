import { Carousel } from 'antd';
import React from 'react';
import Image from 'next/image'

export default function SlideBanner() {
  return (
    <div className='home-instagram mx-auto mt-32 container-fluid'>
      <Carousel autoplay>
        <div className="content-style sm:content-style-md lg:content-style-lg">
          <a href="https://ananas.vn/product-list?gender=&amp;category=&amp;attribute=tom" className="inline-block">
            <div className="cont-item">
              <img
                src="https://ananas.vn/wp-content/uploads/Web1920-1.jpeg"
                alt="Ananas Product"
                className="w-full max-w-2xl object-cover sm:h-screen md:h-730 lg:h-screen xl:h-730"
                style={{ maxHeight: '85vh', width: '100vw', maxWidth: '1920px', objectFit: 'cover' }}        
              />
            </div>
          </a>
        </div>
        <div className="content-style sm:content-style-md lg:content-style-lg" style={{ height: '300px' }}>
          <a href="https://ananas.vn/product-list?gender=&amp;category=&amp;attribute=tom" className="inline-block">
            <div className="cont-item">
              <img
                src="/ProjectImage/Hi-im-Mule_1920x1050-Desktop_11zon.jpg"
                alt="Ananas Product"
                className="w-full max-w-2xl object-cover sm:h-screen md:h-730 lg:h-screen xl:h-730"
                style={{ maxHeight: '85vh', width: '100vw', maxWidth: '1920px', objectFit: 'cover' }}
              />
            </div>
          </a>
        </div>
      </Carousel>
    </div>
  );
}
