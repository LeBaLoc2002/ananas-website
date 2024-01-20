import { Header } from 'antd/es/layout/layout';
import React from 'react';
import {MailOutlined , SettingOutlined , AppstoreOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import './Header.scss'
const items = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation One',
    key: 'mail',
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
    </Header>

  );
};

export default HeaderLayout;
