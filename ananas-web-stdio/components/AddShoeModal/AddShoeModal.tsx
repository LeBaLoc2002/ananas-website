import React, { useState } from 'react';
import { Modal, Form, Button, Input, InputNumber } from 'antd';
import { useDropzone } from 'react-dropzone';
import { UploadOutlined } from '@ant-design/icons';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';

import { useFormik } from 'formik';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '@/src/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { createShoe } from '@/src/features/shoeSlice';
import { useDispatch } from 'react-redux';
import { QueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';

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
interface CreateShoeModalProps {
  visible: boolean;
  width: any;
  onCancel: () => void;
  title: string;
  shoeData: any[]; 
  setOpenCreate: (value: boolean) => void; 
  refetch: () => void; 
}
interface Shoe {
    id: string;
    Name: string;
    Price: number;
    ProductCode: string;
    Size: any;
    imageURL: string;
  }
  
  
const CreateShoeModal: React.FC<CreateShoeModalProps> = ({ visible, onCancel ,shoeData, setOpenCreate, refetch}) => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const dispatch = useDispatch()
    const queryClient = new QueryClient()

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
          console.log("Accepted Files:", acceptedFiles);
          const file = acceptedFiles[0];
          const imageUrl = URL.createObjectURL(file);
          setUploadedImage(imageUrl)
        },
      });

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
  return (
    <Modal title="Add shoe" visible={visible} onCancel={onCancel} width={1000}>
      <Form onFinish={formikCreate.handleSubmit} initialValues={formikCreate.initialValues}>
        <Form.Item name="Name" label="Name">
          <Input
            name="Name"
            value={formikCreate.values.Name}
            onChange={formikCreate.handleChange}
            onBlur={formikCreate.handleBlur}
          />
        </Form.Item>
        {formikCreate.touched.Name && formikCreate.errors.Name ? (
          <div className="error-message">{String(formikCreate.errors.Name)}</div>
        ) : null}
        <Form.Item name="Price" label="Price">
          <InputNumber
            name="Price"
            type="number"
            value={formikCreate.values.Price}
            onChange={(value) => formikCreate.setFieldValue('Price', value)}
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
            onBlur={formikCreate.handleBlur}
          />
        </Form.Item>
        {formikCreate.touched.ProductCode && formikCreate.errors.ProductCode ? (
          <div className="error-message">{String(formikCreate.errors.ProductCode)}</div>
        ) : null}
        <Form.Item name="Size" label="Size" className="inputSelect">
          <Select
            options={sizeOptions}
            isMulti={true}
            name="Size"
            className="basic-multi-select inputSelect"
            classNamePrefix="select"
            value={formikCreate.values.Size}
            onChange={(selectedOptions: any) => formikCreate.setFieldValue('Size', selectedOptions)}
            onBlur={formikCreate.handleBlur}
          />
        </Form.Item>
        {formikCreate.touched.Size && formikCreate.errors.Size ? (
          <div className="error-message">{String(formikCreate.errors.Size)}</div>
        ) : null}
        <Form.Item
          name="image"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
          className="sm:max-w-64 fieldImage text-black mt-2"
        >
          <section
            className="input-file"
            style={{
              border: '1px solid black',
              height: '160px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              {...getRootProps({ className: 'dropzone' })}
              className="upload-file"
            >
              <input {...getInputProps()} />
              <img
                src={ uploadedImage || formikCreate.values.imageURL}
                className="renderImage"
                alt="Uploaded shoe"
              />
              <p>
                <UploadOutlined className="icon-file" />
              </p>
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
  );
};

export default CreateShoeModal;
