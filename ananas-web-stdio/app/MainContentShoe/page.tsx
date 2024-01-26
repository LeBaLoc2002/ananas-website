"use client"
import React, { useEffect, useState } from 'react';
import { Button, Divider, Layout, Table, TableColumnsType, theme } from 'antd';
import './MainContentShoe.scss'
import SiderbarShoe from '@/components/SidebarShoe/SiderbarShoe';
import HeaderShoe from '@/components/HeaderShoe/HeaderShoe';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setShoe } from '@/src/features/shoeSlice';
import { db } from '@/src/firebase';
import { toast } from 'react-toastify';

const { Content } = Layout;

const Page: React.FC = () => {
  const queryClient = new QueryClient()
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const columns: TableColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'Name',
    },
    {
      title: 'Price',
      dataIndex: 'Price',
    },
    {
      title: 'Product Code',
      dataIndex: 'ProductCode',
    },
    {
      title: 'Size',
      dataIndex: 'Size',
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

  const {data: shoeData, isError, isLoading } = useQuery({
    queryKey: ['shoes'],  
    queryFn: async () => {
      try{
        const querySnapshot = await getDocs(collection(db, 'shoes'))
        const newData = await querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        dispatch(setShoe(newData))
        return newData
      }catch(error) {
        toast.error( 'Error',{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          });  
      }
    }
  })

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['shoes'] })
  })

  return (
    <Layout className='max-h-screen	bg-white h-screen md:p-3	'>
      <SiderbarShoe collapsed={collapsed} />
      <Layout className='rounded p-5 bg-teal-100 md:m-4'  style={{borderRadius: '50px'}}>
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
            dataSource={shoeData}
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
