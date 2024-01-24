import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import React from 'react'
import {
  TagsOutlined,
  AppstoreAddOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  StockOutlined
} from '@ant-design/icons';

interface props {
  collapsed : boolean
}
export default function SiderbarShoe({collapsed} : props) {
  return (
    <div className=''>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{backgroundColor:'#fff'}} className='bg-white h-full'>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <AppstoreAddOutlined />,
              label: 'Dashboard',
            },
            {
              key: '2',
              icon: <ShoppingCartOutlined />,
              label: 'Order',
            },
            {
              key: '3',
              icon: <ShopOutlined />,
              label: 'Product',
            },
            {
              key: '4',
              icon: <StockOutlined />,
              label: 'Stock',
            },
            {
              key: '5',
              icon: <TagsOutlined />,
              label: 'Offer',
            },
          ]}
        />
      </Sider>
    </div>
  )
}
