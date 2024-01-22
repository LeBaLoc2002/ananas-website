import React, { Component } from 'react'

const HomeCollection = () => {
    return (
        <div className="container mx-auto mt-10">
            <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
                <div className="adv-collection">
                <a href="/promotion/clearance-sale/">
                    <img src="https://ananas.vn/wp-content/uploads/banner-phu%CC%A3_2m-600x320.jpg" alt="Sale Banner" />
                </a>
                </div>
                <div className="content-collection">
                <h3 className="title text-3xl font-bold"><a href="/promotion/clearance-sale/">ALL BLACK IN BLACK</a></h3>
                <p className="description text-lg">
                    Mặc dù được ứng dụng rất nhiều, nhưng sắc đen lúc nào cũng toát lên một vẻ huyền bí không nhàm chán              
                </p>
                </div>
            </div>

            <div className="w-full md:w-1/2">
            <div className="adv-collection h-auto md:h-80 overflow-hidden">
                    <a href="/promotion/clearance-sale/">
                    <img src="https://ananas.vn/wp-content/uploads/Banner_Sale-off-1.jpg" alt="Sale Banner" />
                    </a>
                </div>
                <div className="content-collection">
                    <h3 className="title text-3xl font-bold"><a href="/promotion/clearance-sale/">OUTLET SALE</a></h3>
                    <p className="description text-lg">
                    Danh mục những sản phẩm bán tại giá tốt hơn chỉ được bán kênh online - Online Only, chúng đã từng làm mưa làm gió một thời gian và hiện đang rơi vào tình trạng bể size, bể số.
                    </p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default HomeCollection;