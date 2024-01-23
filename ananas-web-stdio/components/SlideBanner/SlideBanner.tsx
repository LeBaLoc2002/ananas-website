import { Carousel } from 'antd';
import React from 'react'

export default function SlideBanner() {
  return (
    <div className='home-instagram container mx-auto p-4 mt-20'>
    <Carousel autoplay>
      <div className="content-style sm:content-style-md lg:content-style-lg">
        <a href="https://ananas.vn/product-list?gender=&amp;category=&amp;attribute=tom" className="inline-block">
          <div className="cont-item">
            <img src="https://ananas.vn/wp-content/uploads/Web1920-1.jpeg" alt="Ananas Product" />
          </div>
        </a>
      </div>
      <div className="content-style sm:content-style-md lg:content-style-lg">
        <a href="https://ananas.vn/product-list?gender=&amp;category=&amp;attribute=tom" className="inline-block">
          <div className="cont-item">
            <img src="https://ananas.vn/wp-content/uploads/Hi-im-Mule_1920x1050-Desktop.jpg" alt="Ananas Product" />
          </div>
        </a>
      </div>
    </Carousel>
  </div>
  )
}
