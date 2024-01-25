import React from 'react';

const HomeCollection = () => {
    return (
        <div className="container mx-auto mt-8 lg:mt-20">
            <div className="md:flex xs:flex-wrap">
                <div className="w-full lg:w-1/2 lg:mr-4 order-2 lg:order-1 px-4 lg:px-0 p-4	">
                    <div className="adv-collection h-80 lg:h-320 overflow-hidden mb-4 lg:mb-0">
                        <a href="/promotion/clearance-sale/">
                            <img
                                src="/ProjectImage/banner-phụ_2m-600x320.jpg"
                                alt="Sale Banner"
                                className="w-full h-full object-cover rounded-md shadow-md"
                            />
                        </a>
                    </div>
                    <div className="content-collection md:col-span-6">
                        <h3 className="title text-2xl lg:text-3xl font-bold mb-2 text-black">
                            <a href="/promotion/clearance-sale/">ALL BLACK IN BLACK</a>
                        </h3>
                        <p className="description text-base lg:text-lg text-gray-700">
                            Mặc dù được ứng dụng rất nhiều, nhưng sắc đen lúc nào cũng toát lên một vẻ huyền bí không nhàm chán
                        </p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 lg:ml-4 order-1 lg:order-2 px-4 lg:px-0 p-4	">
                    <div className="adv-collection h-80 lg:h-320 overflow-hidden mb-4 lg:mb-0">
                        <a href="/promotion/clearance-sale/">
                            <img
                                src="/ProjectImage/Banner_Sale-off-1_11zon.jpg"
                                alt="Sale Banner"
                                className="w-full h-full object-cover rounded-md shadow-md"
                            />
                        </a>
                    </div>
                    <div className="content-collection md:col-span-6">
                        <h3 className="title text-2xl lg:text-3xl font-bold mb-2 text-black	">
                            <a href="/promotion/clearance-sale/">OUTLET SALE</a>
                        </h3>
                        <p className="description text-base lg:text-lg text-gray-700">
                            Danh mục những sản phẩm bán tại giá tốt hơn chỉ được bán kênh online - Online Only, chúng đã từng làm mưa làm gió một thời gian và hiện đang rơi vào tình trạng bể size, bể số.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeCollection;
