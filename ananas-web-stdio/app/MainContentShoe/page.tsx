"use client"
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Layout, Modal, Row, Table, TableColumnsType, Tag, Upload, message, theme } from 'antd';
import './MainContentShoe.scss'
import SiderbarShoe from '@/components/SidebarShoe/SiderbarShoe';
import HeaderShoe from '@/components/HeaderShoe/HeaderShoe';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { deleteShoe, setShoe } from '@/src/features/shoeSlice';
import { db, storage } from '@/src/firebase';
import { toast } from 'react-toastify';
import { UploadOutlined } from '@ant-design/icons';
import { deleteObject, ref } from 'firebase/storage';


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
      render: (text: string) => <img src={text} alt="Product" style={{ width: '50px', height: '50px' }} />,
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

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  const {data: shoeData, isError, isLoading , refetch  } = useQuery({
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
          console.log(imageURL);
          const storageRef = ref(storage, imageURL);
          console.log(storageRef);
          await deleteObject(storageRef);
        }
        dispatch(deleteShoe(id));
        refetch();
        queryClient.invalidateQueries({ queryKey: ['shoes'] })
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['shoes'] })
  })

    const handleOk = () => {
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
    };
    const handleCancel = () => {
      setOpen(false);
    };

    const showModalUpdate = (id : any) => {
      setOpen(true);
    };

    const showModalCreate = () => {
      setOpen(true);
    };

    const handleFileChange = (info: any) => {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };
    
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

          <Table
            title={() => 
            <div className='flex justify-between items-center'>
              <p className='font-bold font-black'>Manager shoes</p>
              <div className='flex justify-end '>
                <Button type="primary" size={'middle'} onClick={showModalCreate}>
                  Create
                </Button>
              </div>
            </div>
            }
            columns={columns}
            dataSource={shoeData}
            size="small"
            scroll={{ x: true }}
            pagination={false}
            bordered 
            className='text-center'
          />
        </Content>
        <Modal
          title="Title"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Form>
          <Form.Item
            name={['user', 'name']}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'email']}
            label="Email"
            rules={[
              {
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'age']}
            label="Age"
            rules={[
              {
                type: 'number',
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name={['user', 'website']} label="Website" className='text-black'>
            <Input/>
          </Form.Item>
          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[{ required: true, message: 'Please upload an image!' }]}
            className='sm:max-w-64 fieldImage text-black'
          >
            <Upload
              name="image"
              listType="picture"
              fileList={fileList}
              onChange={(info) => {
                setFileList(info.fileList);
                handleFileChange(info);
                        }}
                >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </Modal>
      </Layout>
    </Layout>
  );
};

export default Page;
