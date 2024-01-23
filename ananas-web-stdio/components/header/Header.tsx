import { Header } from 'antd/es/layout/layout';
import React from 'react';
import {CheckCircleOutlined , HeartOutlined , LoginOutlined, ShoppingCartOutlined , PictureOutlined , MoneyCollectOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import './Header.scss'
import { Carousel } from 'antd';
const items = [
  {
    label: ' Tra cứu đơn hàng',
    key: 'Lookorders',
    icon: <CheckCircleOutlined   className="text-xs"/>,
  },
  {
    label: ' Yêu thích',
    key: 'favourite',
    icon: <HeartOutlined  className="text-xs" />,
  },
  {
    label: 'Đăng nhập',
    key: 'Login',
    icon: <LoginOutlined  className="text-xs"/>,
  },
  {
    label: 'Giỏ hàng',
    key: 'Cart',
    icon: <ShoppingCartOutlined  className="text-xs"/>,
  },
];

const itemsCenter = [
  {
    label: 'Nam',
    key: 'Male',
    icon: <PictureOutlined />,
    children: [
      {
        type: 'group',
        label: 'Dòng sản phẩm',
        children: [
          {
            label: 'Basas',
            key: 'Basas',
          },
          {
            label: 'Vintas',
            key: 'Vintas',
          },
          {
            label: 'Urbas',
            key: 'Urbas',
          },
          {
            label: 'Pattas',
            key: 'Pattas',
          },
        ],
      }, 
      {
        type: 'group',
        label: 'Style',
        children: [
          {
            label: 'High Top',
            key: 'High Top',
          },
          {
            label: 'Low Top',
            key: 'Low Top',
          },
          {
            label: 'Slip-on',
            key: 'Slip-on',
          },
        ],
      },
    ],
  }, 
  {
    label: 'Nữ',
    key: 'Female',
    icon: <PictureOutlined />,
    children: [
      {
        type: 'group',
        label: 'Thời trang ',
        children: [
          {
            label: 'Basic Tee',
            key: 'BasicTee',
          },
          {
            label: 'Graphic Tee',
            key: 'GraphicTee',
          },
          {
            label: 'Hoodie',
            key: 'Hoodie',
          },
        ],
      },
      {
        type: 'group',
        label: 'Phụ kiện',
        children: [
          {
            label: 'Nón',
            key: 'Hat',
          },
          {
            label: 'Dây giày',
            key: 'Shoelace',
          },
          {
            label: 'Vớ',
            key: 'Sock',
          },
          {
            label : 'Túi Tote',
            key: 'Tote'
          },
        ],
      },
    ],
  },

  {
    label: 'Sale Off',
    key: 'Sale',
    icon: <MoneyCollectOutlined />,
  },
];


const HeaderLayout  = () => {
  return (
    <Header
      style={{
        padding: 0,
        backgroundColor: '#fff'
      }}
    >
      <div className='row h-12'>
      <Menu className='topmenu justify-end text-xs line-height-normal' mode="horizontal" items={items} />
      </div>

      <div className="bg-white">
        <div className="container mx-auto flex items-center justify-center">
          {/* <div className="w-1/12">
            <div className="navbar-brand">
              <a href="https://ananas.vn">
                <img
                  src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/Logo_Ananas_Header.svg"
                  alt="Ananas Logo"
                  className="mx-auto"
                />
              </a>
            </div>
          </div> */}

          <div className="w-12/12">
            <div className="flex items-center justify-center mx-auto font-bold">
              <Menu mode="horizontal" className='italic' style={{fontSize:'23px'}} items={itemsCenter} />
            </div>
          </div>
        </div>
      </div>


      <div className='row '>
        <Carousel autoplay>
        <div>
          <h3 className='m-0 h-20	 text-black leading-16 text-center bg-gray-300 p-4'>BUY 2 GET 10% OFF - ÁP DỤNG VỚI TẤT CẢ BASIC TEE</h3>
        </div>
        <div>
          <h3 className='m-0 h-20	 text-black leading-16 text-center bg-gray-300 p-4'>HÀNG 2 TUẦN NHẬN ĐỔI - GIÀY NỬA NĂM BẢO HÀNH</h3>
        </div>
        <div>
          <h3 className='m-0 h-20	 text-black leading-16 text-center bg-gray-300 p-4'>FREE SHIPPING VỚI HOÁ ĐƠN TỪ 900K !</h3>
        </div>
        <div>
          <h3 className='m-0 h-20	 text-black leading-16 text-center bg-gray-300 p-4'>BUY MORE PAY LESS - ÁP DỤNG KHI MUA PHỤ KIỆN</h3>
        </div>
      </Carousel>
      </div>
    </Header>

  );
};

export default HeaderLayout;
