"use client"
import React, { useState } from 'react';
import { Button, Divider, Layout, Table, TableColumnsType, theme } from 'antd';
import './MainContentShoe.scss'
import SiderbarShoe from '@/components/SidebarShoe/SiderbarShoe';
import HeaderShoe from '@/components/HeaderShoe/HeaderShoe';

const { Content } = Layout;

const Page: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const columns: TableColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Product Code',
      dataIndex: 'productCode',
    },
    {
      title: 'Size',
      dataIndex: 'size',
    },
    {
      title: 'Image URL',
      dataIndex: 'imageURL',
      render: (text: string) => <img src={text} alt="Product" style={{ width: '50px', height: '50px' }} />,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: () => (
        <span>
          <Button type="default" color='success'>Update</Button>
          <Button type='default' color='error'>Delete</Button>
        </span>
      ),
    },
  ];

  const dummyData = [
    {
      key: '1',
      name: 'Sample Product 1',
      price: 50,
      productCode: 'ABC123',
      size: 'M',
      imageURL: 'https://avatars3.githubusercontent.com/u/12101536?s=400&v=4',
    },
    {
      key: '2',
      name: 'Sample Product 2',
      price: 60,
      productCode: 'XYZ789',
      size: 'L',
      imageURL: 'https://avatars3.githubusercontent.com/u/12101536?s=400&v=4',
    },
  ];

  return (
    <Layout>
      <SiderbarShoe collapsed={collapsed} />
      <Layout className='rounded'>
        <HeaderShoe collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            margin: '10px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Divider>Product Table</Divider>
          <Table
            columns={columns}
            dataSource={dummyData}
            size="small"
            scroll={{ x: true }}
            pagination={false}
            bordered 
            className='text-center'
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Page;
