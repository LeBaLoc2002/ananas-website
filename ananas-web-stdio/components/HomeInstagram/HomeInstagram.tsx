import React from 'react';

export default function HomeInstagram() {
  return (
    <div className="home-instagram container mx-auto p-4">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2">
          <div className="text-3xl font-bold text-black text-center mb-8">INSTAGRAM</div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="text-3xl font-bold text-black text-center mb-8">TIN TỨC &amp; BÀI VIẾT</div>
          <div className="news-list">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="post-item">
                <a href="https://ananas.vn/urbas-corluray-pack/">
                  <img src="https://ananas.vn/wp-content/uploads/kvngang_mobile_web-300x160.jpg" alt="News 1" className="w-full mb-2 rounded	" />
                </a>
                <h3 className="post-title text-lg font-bold"><a href="https://ananas.vn/urbas-corluray-pack/">URBAS CORLURAY PACK</a></h3>
                <p className="post-des text-sm mb-2">Urbas Corluray Pack đem đến lựa chọn “làm mới mình” với sự kết hợp 5 gam màu...</p>
                <p className="post-detail"><a href="https://ananas.vn/urbas-corluray-pack/" className="text-blue-500">Đọc thêm</a></p>
              </div>

              <div className="post-item">
                <a href="https://ananas.vn/urbas-corluray-pack/">
                  <img src="https://ananas.vn/wp-content/uploads/kvngang_mobile_web-300x160.jpg" alt="News 1" className="w-full mb-2 rounded	" />
                </a>
                <h3 className="post-title text-lg font-bold"><a href="https://ananas.vn/urbas-corluray-pack/">URBAS CORLURAY PACK</a></h3>
                <p className="post-des text-sm mb-2">Urbas Corluray Pack đem đến lựa chọn “làm mới mình” với sự kết hợp 5 gam màu...</p>
                <p className="post-detail"><a href="https://ananas.vn/urbas-corluray-pack/" className="text-blue-500">Đọc thêm</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <a id="btnMoreInsNews" className="btn btn-load-more bg-blue-500 text-white py-2 px-4 rounded-full">MUỐN XEM NỮA</a>
      </div>
    </div>
  );
}
