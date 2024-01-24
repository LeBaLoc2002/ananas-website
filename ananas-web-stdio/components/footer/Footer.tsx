import { Footer } from "antd/es/layout/layout";

const FooterLayout = () => {
  return (
    <Footer className="text-white" style={{backgroundColor: '#4c4c4c'}}>
      <div className="container mx-auto py-8">
        <div className="grid md:grid-cols-2 sm:grid-cols-4 gap-4">
           <div className="col-3">
            <div className="flex items-center justify-center">
              <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/Store.svg" alt="Store" />
            </div>
          </div>
          <div className="col-9">
            <div className="row flex flex-wrap text-center justify-around mt-4">
                <div className=" w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4	 mb-4 p-2	">
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
                <div className=" w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4	 mb-4 p-2	">
                  <div className="mb-4">
                    <a href="https://ananas.vn/#" className="block text-lg font-bold mb-2 text-white">VỀ CÔNG TY</a>
                    <ul className="list-none pl-0">
                      <li className="mb-2">
                        <a href="/product-list?gender=men&amp;category=shoes&amp;attribute=" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Dứa tuyển dụng</a>
                      </li>
                      <li className="mb-2">
                        <a href="/product-list?gender=women&amp;category=shoes&amp;attribute=" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Liên hệ nhượng quyền</a>
                      </li>
                      <li className="mb-2">
                        <a href="/product-list?gender=men,women&amp;category=top,bottom,accessories&amp;attribute=" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Về Ananas</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className=" w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4	 mb-4  p-2	">
                  <div className="mb-4">
                    <a href="https://ananas.vn/#" className="block text-lg font-bold mb-2 text-white">HỖ TRỢ</a>
                    <ul className="list-none pl-0">
                      <li className="mb-2">
                        <a href="/product-list?gender=men&amp;category=shoes&amp;attribute=" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">FAQs</a>
                      </li>
                      <li className="mb-2">
                        <a href="/product-list?gender=women&amp;category=shoes&amp;attribute=" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Bảo mật thông tin</a>
                      </li>
                      <li className="mb-2">
                        <a href="/product-list?gender=men,women&amp;category=top,bottom,accessories&amp;attribute=" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Chính sách chung</a>
                      </li>
                      <li className="mb-2">
                        <a href="/promotion/clearance-sale/" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Tra cứu đơn hàng</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 	 mb-4 p-2">
                  <div className="mb-4">
                    <a href="https://ananas.vn/#" className="block text-lg font-bold mb-2 text-white">LIÊN HỆ</a>
                    <ul className="list-none pl-0">
                      <li className="mb-2">
                        <a href="/product-list?gender=men&amp;category=shoes&amp;attribute=" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Email góp ý</a>
                      </li>
                      <li className="mb-2">
                        <a href="/product-list?gender=women&amp;category=shoes&amp;attribute=" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Hotline</a>
                      </li>
                      <li className="mb-2">
                        <a href="/product-list?gender=men,women&amp;category=top,bottom,accessories&amp;attribute=" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">0963 429 749</a>
                      </li>
                    </ul>
                  </div>
                </div>
            </div>
            <div className="row">
                <div className="col-span-1 md:col-span-1 lg:col-span-1 flex flex-wrap sm:justify-center">
                  <div className="w-full md:w-1/2 mb-4 p-2 flex socialnetwork">
                    <a href="https://www.facebook.com/Ananas.vietnam " className="mr-4">
                      <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/icon_facebook.svg" alt="Facebook" />
                    </a>
                    <a href="https://www.instagram.com/ananasvn"  className="mr-4">
                      <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/icon_instagram.svg" alt="Instagram" />
                    </a>
                    <a href="https://www.youtube.com/discoveryou"  className="mr-4">
                      <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/icon_youtube.svg" alt="YouTube" />
                    </a>
                  </div>
                  <div className="w-full md:w-1/2 mb-4 p-2">
                    <a href="https://ananas.vn">
                      <img src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/Logo_Ananas_Footer.svg" alt="Ananas Logo" />
                    </a>
                  </div>
                </div>

            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-8">
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
