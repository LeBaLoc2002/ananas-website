"use client"
import React, { useEffect, useState } from 'react';
import { Button, Col, ColorPicker, Dropdown, Form, Input, InputNumber, Layout, Modal, Row, Table, TableColumnsType, Tag, Upload, message, theme } from 'antd';
import './MainContentShoe.scss'
import SiderbarShoe from '@/components/SidebarShoe/SiderbarShoe';
import HeaderShoe from '@/components/HeaderShoe/HeaderShoe';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { deleteShoe, setShoe } from '@/src/features/shoeSlice';
import { db, storage } from '@/src/firebase';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { UploadOutlined } from '@ant-design/icons';
import { deleteObject, ref } from 'firebase/storage';


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

  const headersTable = [
    {
      title: '#2539',
      dataIndex: 'id',
    },
    {
      title: 'Jordan Smith',
      dataIndex: 'Name',
    }, 
    {
      title: '31 July 2020',
      dataIndex: 'Day',
    }, 
    {
      title: '$200',
      dataIndex: 'Price',
    },
    {
      title: 'Jordan Smith',
      dataIndex: 'Name',
      render: (title: string[]) => (
        <ColorPicker defaultValue="#1677ff" />
      )
    }
  ]

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

    const colourOptions = [
      { value: 'ocean', label: 'Ocean', color: '#00B8D9'},
      { value: 'blue', label: 'Blue', color: '#0052CC' },
      { value: 'purple', label: 'Purple', color: '#5243AA' },
      { value: 'red', label: 'Red', color: '#FF5630'},
      { value: 'orange', label: 'Orange', color: '#FF8B00' },
      { value: 'yellow', label: 'Yellow', color: '#FFC400' },
      { value: 'green', label: 'Green', color: '#36B37E' },
      { value: 'forest', label: 'Forest', color: '#00875A' },
      { value: 'slate', label: 'Slate', color: '#253858' },
      { value: 'silver', label: 'Silver', color: '#666666' },
    ];
    const style: React.CSSProperties = {  padding: '8px 0', textAlign: 'center' , color:'black'};

    return (
      <Layout className='max-h-screen	bg-white h-screen md:p-3	'>
        <SiderbarShoe collapsed={collapsed} />
        <Layout className='rounded p-5 bg-cyan-100 md:m-4'  style={{borderRadius: '50px'}}>
          <HeaderShoe collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content
            style={{
              margin: '10px 16px',
              padding: 24,
              minHeight: 280,
              borderRadius: borderRadiusLG,
            }}
            className='bg-cyan-100'
          >
           <Row className='row-header'>
            <Col span={12}>
              <h2>
                Pickup 1 
              </h2>
              <p>
                24 orders - 09:00 AM
              </p>
            </Col>
            <Col span={12} >
            <Dropdown.Button className='justify-end'>Pickup</Dropdown.Button>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{backgroundColor: '#b5e3afa9'}} className='row-header-top'>
            <Col className="gutter-row" span={6}>
              <div className='font-black' style={style}>#fff</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className='font-black' style={style}>B</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className='font-black' style={style}>30 Jan 2024</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className='font-black'  style={style}>40$</div>
            </Col>
          </Row>
           <Table
              title={() => 
              <div className='flex justify-between items-center'>
                <p className='font-black size-3	'>Manager shoes</p>
                <div className='flex justify-end'>
                  <Button type="default" size={'middle'} onClick={showModalCreate}>
                    Create
                  </Button>
                </div>
              </div>
              }
              columns={columns}
              dataSource={shoeData}
              size="small"
              scroll={{ x: 1000, y: 300 }} 
              pagination={false}
              bordered 
              className='text-center'
            />
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{backgroundColor: '#fff'}} className='row-header-bottom'>
            <Col className="gutter-row" span={6}>
              <div className='font-black' style={style}>#fff</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className='font-black' style={style}>B</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className='font-black' style={style}>30 Jan 2024</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className='font-black'  style={style}>40$</div>
            </Col>
          </Row>
          </Content>

          <Modal
            title="Title"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            width={1000}
          >
            <Form>
            <Form.Item name="note">
            <Input />
            </Form.Item>
            <Form.Item>
              <Input />
            </Form.Item>
            <Form.Item
              label="Product Code"
            >
              <InputNumber />
            </Form.Item>
            <Form.Item 
            className='sm:max-w-64 inputSelect'>
            <Select
              defaultValue={[colourOptions[2], colourOptions[3]]}
              isMulti
              name="colors"
              options={colourOptions}
              className="basic-multi-select "
              classNamePrefix="select"
            />
            </Form.Item>

            <Form.Item
              name="image"
              label="Image"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
              rules={[{ required: true, message: 'Please upload an image!' }]}
              className='sm:max-w-64 fieldImage text-black mt-2'
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
          </Form>
          </Modal>
        </Layout>
      </Layout>
    );
};

export default Page;
