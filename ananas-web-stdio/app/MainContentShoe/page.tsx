"use client"
import React, { useEffect, useState } from 'react';
import { Button, Col, ColorPicker, Dropdown, Form, Input, InputNumber, Layout, Menu, Modal, Row, Table, TableColumnsType, Tag, Upload, message, theme } from 'antd';
import './MainContentShoe.scss'
import SiderbarShoe from '@/components/SidebarShoe/SiderbarShoe';
import HeaderShoe from '@/components/HeaderShoe/HeaderShoe';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { deleteShoe, setShoe } from '@/src/features/shoeSlice';
import { db, storage } from '@/src/firebase';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { UploadOutlined, HeartOutlined, LoginOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
interface Shoe {
  id: string;
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
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
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
      }
  
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };
  

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['shoes'] })
  })


  const showModalUpdate = (id: any) => {
    setSelectedShoeId(id);
    setOpenUpdate(true);
  };

  
  const showModalCreate = () => {
    setOpenCreate(true);
  };

  const handleFileChange = (info: any) => {
    console.log('File change info:', info);

    if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
    }
  };
  
  const sizeOptions = Array.from({ length: 9 }, (_, index) => ({ value: `${37 + index}`, label: `${37 + index}` }));

  const formik = useFormik({
    initialValues: {
      id: '',
      Name: '',
      Price: 0,
      ProductCode: '',
      Size: [''],
      imageURL:'',
    },
    onSubmit: () => {}, 
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      price: Yup.number().required('Price is required'),
      productCode: Yup.string().required('Product Code is required'),
      size: Yup.array().min(1, 'Please select at least one size'),
    }),
  });
  const handleCreate = async () => {
    try {
      await formik.validateForm();
  
      const file = fileList[0].originFileObj;
      
      const storageRef = ref(storage, `shoes/${uuidv4()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      await uploadTask;
  
      const imageURL = await getDownloadURL(storageRef);
  
      const newShoe = {
        id: uuidv4(),
        Name: formik.values.Name,
        Price: formik.values.Price,
        ProductCode: formik.values.ProductCode,
        Size: formik.values.Size.map((s: any) => s.value),
        imageURL,
      };
      console.log(newShoe);
      
  
      await addDoc(collection(db, 'shoes'), newShoe);
  
      dispatch(setShoe([...shoeData, newShoe]));
      setOpenCreate(false);
      formik.resetForm();
      queryClient.invalidateQueries({ queryKey: ['shoes'] });
    } catch (error) {
      console.error('Error creating shoe:', error);
    }
  };
  
  const handleUpdate = async () => {
    try {
      await formik.validateForm();
  
      let imageURL = (shoeData.find((shoe) => shoe.id === selectedShoeId) as { id: string; imageURL: string })?.imageURL;
      
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj;
        const storageRef = ref(storage, `shoes/${uuidv4()}-${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        await uploadTask;
  
        const newImageURL = await getDownloadURL(storageRef);
  
        if (imageURL && imageURL !== newImageURL) {
          try {
            const oldImageRef = ref(storage, imageURL);
            await deleteObject(oldImageRef);
          } catch (deleteError) {
            console.error('Error deleting old image:', deleteError);
          }
        }
  
        imageURL = newImageURL;
      }
  
      const updatedShoe = {
        id: selectedShoeId,
        Name: formik.values.Name,
        Price: formik.values.Price,
        ProductCode: formik.values.ProductCode,
        Size: formik.values.Size.map((s: any) => s.value),
        imageURL,
      };
  
      console.log(updatedShoe);
  
      await setDoc(doc(db, 'shoes', selectedShoeId), updatedShoe, { merge: true });
  
      const updatedShoes = shoeData.map((shoe) => (shoe.id === selectedShoeId ? updatedShoe : shoe));
      dispatch(setShoe(updatedShoes));
  
      setOpenUpdate(false);
      formik.resetForm();
  
      queryClient.invalidateQueries({ queryKey: ['shoes'] });
    } catch (error) {
      console.error('Error updating shoe:', error);
    }
  };
  
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
              <Menu mode="horizontal" className='menuOne'>
                <Menu.Item key="Pickup">
                <h2>Pickup 1</h2>
                    <p>24 orders - 09:00 AM</p>
                </Menu.Item>
                <Menu.Item key="itemPickup" style={{ marginLeft: 'auto', justifyContent: 'center' }} className='itemPickup  mt-7'>
                <Dropdown.Button className='justify-end mt-7	'>Pickup</Dropdown.Button>
                </Menu.Item>
              </Menu>
              <Menu mode="horizontal" className='flex items-center justify-between w-full row-header-center'  style={{backgroundColor: '#b5e3afa9'}} >
                <Menu.Item key="fff">
                  <div className="font-black">#fff</div>
                </Menu.Item>
                <Menu.Item key="b">
                  <div className="font-black">B</div>
                </Menu.Item>
                <Menu.Item key="30">
                  <div className="font-black">30 Jan 2024</div>
                </Menu.Item>
                <Menu.Item key="40">
                  <div className="font-black">40$</div>
                </Menu.Item>
              </Menu>
              <Table
                title={() => (
                  <div className='flex justify-between items-center'>
                    <p className='font-black size-1 hidden md:block'>Manager shoes</p>
                    <div className='flex justify-end items-center'>
                      <div className='md:order-2'>
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

             <Menu mode="horizontal" className='flex items-center justify-between w-full row-header-center'  style={{backgroundColor: '#b5e3afa9'}} >
                <Menu.Item key="fff">
                  <div className="font-black">#fff</div>
                </Menu.Item>
                <Menu.Item key="b">
                  <div className="font-black">B</div>
                </Menu.Item>
                <Menu.Item key="30">
                  <div className="font-black">30 Jan 2024</div>
                </Menu.Item>
                <Menu.Item key="40">
                  <div className="font-black">40$</div>
                </Menu.Item>
              </Menu>
          </Content>
          <Modal
          title="Add shoe"
          visible={openCreate} 
          confirmLoading={confirmLoading}
          onCancel={() => {
            setOpenCreate(false);
          }}
          width={1000}
        >
          <Form   onFinish={handleCreate} initialValues={formik.initialValues}>
          <Form.Item name="Name" label="Name">
              <Input
                name="Name"
                value={formik.values.Name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
          </Form.Item>
            <Form.Item name="Price" label="Price">
            <Input
                name="Price"
                value={formik.values.Price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
            <Form.Item name="ProductCode" label="Product Code">
              <Input 
                value={formik.values.ProductCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}/>
            </Form.Item>
            <Form.Item name="Size" label="Size">
              <Select
                options={sizeOptions}
                isMulti
                name="Size"
                className="basic-multi-select"
                classNamePrefix="select"
                value={formik.values.Size}
                onChange={(selectedOptions) => formik.setFieldValue('Size', selectedOptions)}
                onBlur={formik.handleBlur}
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

            <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            </Form.Item>
          </Form>
         </Modal>
         <Modal
          title="Update Shoe"
          visible={openUpdate}
          confirmLoading={confirmLoading}
          onCancel={() => {
            setOpenUpdate(false);
          }}
          width={1000}
        >
          <Form onFinish={handleUpdate} initialValues={{...shoeData.find((shoe) => shoe.id === selectedShoeId)}} >
          <Form.Item name="id" style={{ display: 'none' }}>
            <Input type="hidden" />
          </Form.Item>
            <Form.Item name="Name" label="Name">
              <Input
                name="Name"
                value={formik.values.Name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
            <Form.Item name="Price" label="Price">
              <InputNumber
                name="Price"
                value={formik.values.Price}
                onChange={(value) => formik.setFieldValue('Price', value)}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
            <Form.Item name="ProductCode" label="Product Code">
              <Input
                value={formik.values.ProductCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
            <Form.Item name="Size" label="Size">
              <Select
                options={sizeOptions}
                isMulti
                name="Size"
                className="basic-multi-select"
                classNamePrefix="select"
                value={formik.values.Size}
                onChange={(selectedOptions) => formik.setFieldValue('Size', selectedOptions)}
                onBlur={formik.handleBlur}
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
