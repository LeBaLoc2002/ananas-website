import React from 'react';
import { Button, Input, Avatar } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';

interface Props {
  collapsed: boolean;
  setCollapsed: (setCollapsed: boolean) => void;
}

export default function HeaderShoe({ setCollapsed, collapsed }: Props) {
  return (
    <Header className='bg-cyan-100 flex items-center p-4'>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
      />

      <div className='flex ml-auto mt-auto items-center sm:justify-between'>

        <Input
          placeholder="Tìm kiếm..."
          className='flex-grow sm:w-32 md:w-40 lg:w-64 xl:w-80 md:mb-0 mr-4 text-sm left-3'
        />

        <div className='flex items-center space-x-2'>
          <Avatar className='hidden md:block'>
            <BellOutlined />
          </Avatar>

          <Avatar className='hidden md:block'>
            <UserOutlined />
          </Avatar>
        </div>

      </div>
    </Header>
  );
}
