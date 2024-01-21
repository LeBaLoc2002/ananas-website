import { Footer } from "antd/es/layout/layout";
// import './FooterLayout.scss';

const FooterLayout = () => {
  return (
    <Footer className="text-white bg-gray-800">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <div className="flex items-center justify-center">
              <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/Store.svg" alt="Store" />
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <div className="mb-4">
              <a href="https://ananas.vn/#" className="block text-lg font-bold mb-2 text-white">SẢN PHẨM</a>
              <ul className="list-none pl-0">
                <li className="mb-2">
                  <a href="/product-list?gender=men&amp;category=shoes&amp;attribute=" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Giày Nam</a>
                </li>
                <li className="mb-2">
                  <a href="/product-list?gender=women&amp;category=shoes&amp;attribute=" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Giày Nữ</a>
                </li>
                <li className="mb-2">
                  <a href="/product-list?gender=men,women&amp;category=top,bottom,accessories&amp;attribute=" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Thời trang &amp; Phụ kiện</a>
                </li>
                <li className="mb-2">
                  <a href="/promotion/clearance-sale/" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Sale-off</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <a href="https://www.facebook.com/Ananas.vietnam/"><img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/icon_facebook.svg" alt="Facebook" /></a>
              <a href="https://www.instagram.com/ananasvn/"><img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/icon_instagram.svg" alt="Instagram" /></a>
              <a href="https://www.youtube.com/discoveryou"><img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/icon_youtube.svg" alt="YouTube" /></a>
            </div>
            <div className="flex justify-center items-center">
              <a href="https://ananas.vn"><img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/Logo_Ananas_Footer.svg" alt="Ananas Logo" /></a>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <div className="flex items-center">
            <div className="col-3">
              <a href="http://online.gov.vn/Home/WebDetails/61921">
                <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/icon_bocongthuong.png" alt="Bộ Công Thương" />
              </a>
            </div>
            <div className="ml-2 text-sm col-9">
              Copyright © 2022 Ananas. All rights reserved.
            </div>
          </div>
        </div>

      </div>
    </Footer>
  );
};

export default FooterLayout;
