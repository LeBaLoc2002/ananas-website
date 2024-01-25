import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
import {
  TagsOutlined,
  AppstoreAddOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  StockOutlined,
} from '@ant-design/icons';
interface Props {
  collapsed: boolean;
}

export default function SiderbarShoe({ collapsed }: Props) {
  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: '#fff'}}
        className={`bg-white h-full border-r transition-all duration-300 ease-in-out ${
          collapsed ? 'w-20' : 'w-64'
        } xs:max-w-36`}
      >
        <div className='flex items-center justify-center p-4'>
          <img
            src='/ProjectImage/12101536_11zon.png'
            alt='Logo'
            className='w-full max-w-[40px] md:max-w-[40px] xl:max-w-[40px] rounded-md'
          />
        </div>

        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          theme="light"
          className='border-r-0'
        >
          <Menu.Item key='1' icon={<AppstoreAddOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key='2' icon={<ShoppingCartOutlined />}>
            Order
          </Menu.Item>
          <Menu.Item key='3' icon={<ShopOutlined />}>
            Product
          </Menu.Item>
          <Menu.Item key='4' icon={<StockOutlined />}>
            Stock
          </Menu.Item>
          <Menu.Item key='5' icon={<TagsOutlined />}>
            Offer
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}
