import { Header } from 'antd/es/layout/layout';
import React from 'react';
import {MailOutlined , SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './Header.scss'
import { Carousel } from 'antd';

type ContentStyleType = {
  margin: number;
  height: string;
  color: string;
  lineHeight: string;
  textAlign: string | undefined;
  backgroundColor: string;
  padding: number;
};
const contentStyle: ContentStyleType  = {
  margin: 0,
  height: '60px',
  color: '#000',
  lineHeight: '60px',
  textAlign: 'center',
  backgroundColor: '#f1f1f1',
  padding: 4,

};

const mobileContentStyle: ContentStyleType = {
  ...contentStyle,
  height: '10px',
  lineHeight: '10px',
};

const items = [
  {
    label: 'Navigation One',
    key: 'one',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation One',
    key: 'two',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation One',
    key: 'three',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation One',
    key: 'four',
    icon: <MailOutlined />,
  },
];


const itemsCenter = [
  {
    label: 'Navigation Three - Submenu',
    key: '',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
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
      <div className='row h-10'>
        <Menu className='topmenu justify-end text-sm' mode="horizontal" items={items} />
      </div>

      <div className='row'>
      <Menu mode="horizontal" items={itemsCenter} />
      </div>
      <div className='row'>
        <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>BUY 2 GET 10% OFF - ÁP DỤNG VỚI TẤT CẢ BASIC TEE</h3>
        </div>
        <div>
          <h3 style={contentStyle}>HÀNG 2 TUẦN NHẬN ĐỔI - GIÀY NỬA NĂM BẢO HÀNH</h3>
        </div>
        <div>
          <h3 style={contentStyle}>FREE SHIPPING VỚI HOÁ ĐƠN TỪ 900K !</h3>
        </div>
        <div>
          <h3 style={contentStyle}>BUY MORE PAY LESS - ÁP DỤNG KHI MUA PHỤ KIỆN</h3>
        </div>
      </Carousel>
      </div>
    </Header>

  );
};

export default HeaderLayout;
