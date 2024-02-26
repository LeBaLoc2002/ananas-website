"use client"
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Form, Image, Input, InputNumber, Layout, Menu, MenuProps, Modal, Row, Table, TableColumnsType, Tag, Upload, message, theme } from 'antd';
import './MainContentShoe.scss'
import SiderbarShoe from '@/components/SidebarShoe/SiderbarShoe';
import HeaderShoe from '@/components/HeaderShoe/HeaderShoe';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { createShoe, deleteShoe, setShoe, updateShoe } from '@/src/features/shoeSlice';
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

  
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedShoeId, setSelectedShoeId] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState(null);


  const {acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      const imageUrl:any = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  });

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
    
    await formikUpdate.setValues({
      ...selectedShoe,
      Size: selectedShoe.Size.map((size : any) => ({ value: size, label: size }))      
    });
    console.log(selectedShoe.Size);
    
    setSelectedShoeId(id);

    setOpenUpdate(true);
  };
  

  
  const showModalCreate = () => {
    setOpenCreate(true);
  };
    
  
  const sizeOptions = [
    { value: '37', label: '37' },
    { value: '38', label: '38' },
    { value: '39', label: '39' },
    { value: '40', label: '40' },
    { value: '41', label: '41' },
    { value: '42', label: '42' },
    { value: '43', label: '43' },
    { value: '44', label: '44' },
    { value: '45', label: '45' },
  ];
  
  const initValues: Shoe = {
      id: '',
      Name: '',
      Price: 0,
      ProductCode: '',
      Size: [],
      imageURL:'',
  }

  const formikCreate = useFormik({
    initialValues: initValues,
    onSubmit: async () => {
      try {
        await formikCreate.validateForm();
    
        let imageURL = null;
        if (acceptedFiles.length > 0) {
          const file = acceptedFiles[0];
          const storageRef = ref(storage, `shoes/${uuidv4()}-${file.name}`);
          try {
              await uploadBytesResumable(storageRef, file);
              imageURL = await getDownloadURL(storageRef);
          } catch (error) {
              console.log('error' , error);
              return;
          }
        }
        const newShoe = {
          id: uuidv4(),
          Name: formikCreate.values.Name,
          Price: formikCreate.values.Price,
          ProductCode: formikCreate.values.ProductCode,
          Size: formikCreate.values.Size.map((s: any) => s.value),
          imageURL: imageURL,
        };
        console.log(newShoe);
        
    
        await addDoc(collection(db, 'shoes'), newShoe);
    
        dispatch(createShoe([...shoeData, newShoe]));
        
        formikCreate.resetForm(); 
  
        
        setOpenCreate(false);
        queryClient.invalidateQueries({ queryKey: ['shoes'] });
        refetch()
      } catch (error) {
        console.error('Error creating shoe:', error);
      }
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      Name: Yup.string().required('Name is required'),
      Price: Yup.number().required('Price is required'),
      ProductCode: Yup.string().required('Product Code is required'),
      Size: Yup.array().min(1, 'Please select at least one size'),
    }),
  });

  const formikUpdate = useFormik({
    initialValues: initValues,
    onSubmit: async () => {
      try {
        await formikUpdate.validateForm();
    
        let imageURL = (shoeData.find((shoe) => shoe.id === selectedShoeId) as { id: string; imageURL: string })?.imageURL;
        
        let imageUrlOld = formikUpdate.values.imageURL; // Lấy URL ảnh cũ
      
          // Nếu người dùng đã chọn một hình ảnh mới
          if (acceptedFiles.length > 0) {
              const file = acceptedFiles[0];
              const storageRef = ref(storage, `uploads/${uuidv4()}-${file.name}`);
              try {
                  // Xóa ảnh cũ nếu tồn tại
                  if (imageUrlOld) {
                      const oldImageRef = ref(storage, imageUrlOld);
                      await deleteObject(oldImageRef);
                  }
      
                  await uploadBytesResumable(storageRef, file);
                  imageUrlOld = await getDownloadURL(storageRef); // Lấy URL của ảnh mới
      
              } catch (error) {
                  console.error("Lỗi khi xử lý ảnh:", error);
                  return;
              }
          }
  
    
        const updatedShoe = {
          id: selectedShoeId,
          Name: formikUpdate.values.Name,
          Price: formikUpdate.values.Price,
          ProductCode: formikUpdate.values.ProductCode,
          Size: formikUpdate.values.Size.map((s: any) => s.value),
          imageURL,
        };
        
    
        console.log(updatedShoe);
        
        if (selectedShoeId !== null) {
          await setDoc(doc(db, 'shoes', selectedShoeId), updatedShoe, { merge: true });
        }  
  
        const updatedShoes = shoeData.map((shoe) => {
          if (shoe.id === selectedShoeId) {
            return updatedShoe as Shoe;
          } else {
            return shoe as Shoe;
          }
        });
        
        dispatch(updateShoe(updatedShoes));
        formikUpdate.resetForm();
        setOpenUpdate(false);
        queryClient.invalidateQueries({ queryKey: ['shoes'] });
        refetch()
      } catch (error) {
        console.error('Error updating shoe:', error);
      }
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      Name: Yup.string().required('Name is required'),
      Price: Yup.number().required('Price is required'),
      ProductCode: Yup.string().required('Product Code is required'),
      Size: Yup.array().min(1, 'Please select at least one size'),
    }),
  });

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
        <Modal
        title="Add shoe"
        visible={openCreate} 
        confirmLoading={confirmLoading}
        onCancel={() => {
          setOpenCreate(false);
        }}
        
        width={1000}
      >
        <Form  onFinish={formikCreate.handleSubmit} initialValues={formikCreate.initialValues}>
        <Form.Item name="Name" label="Name">
            <Input
              name="Name"
              value={formikCreate.values.Name}
              onChange={formikCreate.handleChange}
              onBlur={formikCreate.handleBlur}
            />
        </Form.Item>
        {formikCreate.touched.Name && formikCreate.errors.Name ? <div className="error-message">{String(formikCreate.errors.Name)}</div> : null}

          <Form.Item name="Price" label="Price">
          <Input
              type='number'
              name="Price"
              value={formikCreate.values.Price}
              onChange={formikCreate.handleChange}
              onBlur={formikCreate.handleBlur}
            />
          </Form.Item>
          {formikCreate.touched.Price && formikCreate.errors.Price ? (
            <div className="error-message">{String(formikCreate.errors.Price)}</div>
          ) : null} 

          <Form.Item name="ProductCode" label="Product Code">
            <Input 
              value={formikCreate.values.ProductCode}
              onChange={formikCreate.handleChange}
              onBlur={formikCreate.handleBlur}/>
          </Form.Item>
          <Form.Item>
          {formikCreate.touched.ProductCode && formikCreate.errors.ProductCode ? <div className="error-message">{String(formikCreate.errors.ProductCode)}</div> : null}

          </Form.Item>
          <Form.Item name="Size" label="Size" className='inputSelect'>
            <Select
              options={sizeOptions}
              isMulti
              name="size"
              className="basic-multi-select inputSelect"
              classNamePrefix="select"
              value={formikCreate.values.Size}
              onChange={(selectedOptions) => formikCreate.setFieldValue('Size', selectedOptions)}
              onBlur={formikCreate.handleBlur}
            />
          </Form.Item>
          {formikCreate.touched.Size && formikCreate.errors.Size ? <div className="error-message">{String(formikCreate.errors.Size)}</div> : null}


          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            className='sm:max-w-64 fieldImage text-black mt-2'
          >
            <section className="input-file" style={{border: '1px solid black', height:'160px', position: 'relative', overflow: 'hidden'}}>
                <div {...getRootProps({className: 'dropzone'})} className='upload-file'>
                  <input {...getInputProps()} />
                  <img src={formikCreate.values.imageURL} style={{width: "100%", height: "100%", objectFit: 'cover', position: 'absolute', top: '0', left: '0'}} />
                  <p><UploadOutlined className='icon-file' /></p>
                </div>
              </section>
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
          formikUpdate.resetForm({});
        }}
        width={1000}
      >
        <Form onFinish={formikUpdate.handleSubmit} initialValues={{...shoeData.find((shoe) => shoe.id === selectedShoeId)}} >
        <Form.Item name="id" style={{ display: 'none' }}>
          <Input type="hidden" />
        </Form.Item>
          <Form.Item name="Name" label="Name">
            <Input
              name="Name"
              value={formikUpdate.values.Name}
              onChange={formikUpdate.handleChange}
              onBlur={formikUpdate.handleBlur}
            />
          </Form.Item>
          {formikUpdate.touched.Name && formikUpdate.errors.Name ? <div className="error-message">{String(formikUpdate.errors.Name)}</div> : null}
          <Form.Item name="Price" label="Price">
            <InputNumber
              name="Price"
              type='number'
              value={formikUpdate.values.Price}
              onChange={(value) => formikUpdate.setFieldValue('Price', value)}
              onBlur={formikUpdate.handleBlur}
            />
          </Form.Item>
          {formikUpdate.touched.Price && formikUpdate.errors.Price ? <div className="error-message">{String(formikUpdate.errors.Price)}</div> : null}

          <Form.Item name="ProductCode" label="Product Code">
            <Input
              value={formikUpdate.values.ProductCode}
              onChange={formikUpdate.handleChange}
              onBlur={formikUpdate.handleBlur}
            />
          </Form.Item>
          {formikUpdate.touched.ProductCode && formikUpdate.errors.ProductCode ? <div className="error-message">{String(formikUpdate.errors.ProductCode)}</div> : null}

          <Form.Item name="Size" label="Size" className='inputSelect'>
            <Select
              options={sizeOptions}
              isMulti={true}
              name="Size"
              className="basic-multi-select inputSelect"
              classNamePrefix="select"
              value={formikUpdate.values.Size}
              onChange={(selectedOptions) => formikUpdate.setFieldValue('Size', selectedOptions)}
              onBlur={formikUpdate.handleBlur}
            />
          </Form.Item>
          {formikUpdate.touched.Size && formikUpdate.errors.Size ? <div className="error-message">{String(formikUpdate.errors.Size)}</div> : null}

          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            className='sm:max-w-64 fieldImage text-black mt-2'
          >
            <section className="input-file" style={{border: '1px solid black', height:'160px', position: 'relative', overflow: 'hidden'}}>
                <div {...getRootProps({className: 'dropzone'})} className='upload-file'>
                  <input {...getInputProps()} />
                  <img src={formikUpdate.values.imageURL} alt="Uploaded preview" style={{width: "100%", height: "100%", objectFit: 'cover', position: 'absolute', top: '0', left: '0'}} />
                  <p><UploadOutlined className='icon-file' /></p>
                </div>
            </section>
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
