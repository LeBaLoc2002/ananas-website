"use client"
import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Input, InputNumber, Layout, Modal, Table, TableColumnsType, Tag, theme } from 'antd';
import './MainContentShoe.scss'
import SiderbarShoe from '@/components/SidebarShoe/SiderbarShoe';
import HeaderShoe from '@/components/HeaderShoe/HeaderShoe';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { createShoe, setShoe, updateShoe } from '@/src/features/shoeSlice';
import { db, storage } from '@/src/firebase';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { UploadOutlined, UserOutlined} from '@ant-design/icons';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import {useDropzone} from 'react-dropzone'
import MenuTable from '@/components/menuTable/menuTable';
import MenuPickup from '@/components/menuPickup/menuPickup';
import AddShoeModal from '@/components/AddShoeModal/AddShoeModal';
import UpdateShoeModal from '@/components/UpdateShoeModal/UpdateShoeModal';

interface Shoe {
  id: string;
  Name: string;
  Price: number;
  ProductCode: string;
  Size: any;
  imageURL: string;
}


const { Content } = Layout;

const Page: React.FC = () => {
  const queryClient = new QueryClient()
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(true);
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
      render: (price: number) => {
        return (
          <span className='font-bold	'>
            {price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
          </span>
        );
      },
    },
    
    {
      title: 'Product Code',
      dataIndex: 'ProductCode',
    },
    {
      title: 'Size',
      dataIndex: 'Size',
      render: (Size: string[]) => (
        <span>
        {Size.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
      ),
    },
    {
      title: 'Image URL',
      dataIndex: 'imageURL',
      render: (text: string) => <Image width={100} src={text}/>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
          <span>
            <Button type="default" color='success' onClick={() => showModalUpdate(record.id)}>Update</Button>
            <Button type='default' color='error' onClick={() => handleDelete(record.id , record.imageURL)}>Delete</Button>            
          </span>
        ),
    },
  ];

  
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedShoeId, setSelectedShoeId] = useState<string | null>(null);


  const {data: shoeData = [], isError, isLoading , refetch  } = useQuery({
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

  const handleDelete = async (id: string, imageURL: string) => {
    try {
      await deleteDoc(doc(db, 'shoes', id));
  
      if (imageURL) {
        console.log('Deleting image at URL:', imageURL);
        const storageRef = ref(storage, imageURL);
        await deleteObject(storageRef);
        refetch()
      }
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };
  

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['shoes'] })
  },[])


  const showModalUpdate = async (id: any) => {
    const selectedShoe: any = shoeData.find((shoe) => shoe.id === id);
    console.log(selectedShoe);
    
    // await formikUpdate.setValues({
    //   ...selectedShoe,
    //   Size: selectedShoe.Size.map((size : any) => ({ value: size, label: size }))      
    // });
    
    setSelectedShoeId(id);

    setOpenUpdate(true);
  };
  

  
  const showModalCreate = () => {
    setOpenCreate(true);
  };
    

  return (
    <Layout className='max-h-screen	bg-white h-screen md:p-3	'>
      <SiderbarShoe collapsed={collapsed} />
      <Layout className='rounded p-5 bg-cyan-100 md:m-4'  style={{borderRadius: '15px'}}>
      <HeaderShoe collapsed={collapsed} setCollapsed={() => setCollapsed(!collapsed)} />
        <Content
          style={{
            margin: '10px 10px',
            padding: 20,
            minHeight: 280,
            borderRadius: borderRadiusLG,
          }}
          className='bg-cyan-100'
        >
            <MenuPickup/>
            <MenuTable/>

            <Table
              title={() => (
                <div className='flex justify-between items-center'>
                  <p className='font-black size-1 hidden md:block'>Manager shoes</p>
                  <div className='flex justify-end items-center'>
                    <div className='md:order-1'>
                      <Button type="default" size={'middle'} onClick={showModalCreate}>
                        Create
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              columns={columns}
              dataSource={shoeData}
              size="small"
              scroll={{ x: 700, y: 300 }} 
              pagination={false}
              bordered 
              className='text-center'
            />
            <MenuTable/>
        </Content>
        <AddShoeModal
          title="Add shoe"
          width={1000}
          visible={openCreate}
          onCancel={() => {
            setOpenCreate(false);
          }}
          setOpenCreate={setOpenCreate}
          refetch={refetch}
          shoeData={shoeData}

        />

      <UpdateShoeModal
          title="Update Shoe"
          visible={openUpdate}
          refetch={refetch}
          onCancel={() => {
          setOpenUpdate(false);
        }}
        width={1000}
        setOpenUpdate={setOpenUpdate}
        selectedShoeId={selectedShoeId}
        shoeData={shoeData}
        />
      </Layout>
    </Layout>
  );
};

export default Page;
