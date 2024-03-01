import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Input, InputNumber } from 'antd';
import { useDropzone } from 'react-dropzone';
import { UploadOutlined } from '@ant-design/icons';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import './AddShoeModal.scss'
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

const CreateShoeModal: React.FC<CreateShoeModalProps> = ({ visible, onCancel, shoeData, setOpenCreate, refetch }) => {
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
    imageURL: '',
  }

  const handleImageUpload = async () => {
    let imageURL = null;
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const storageRef = ref(storage, `shoes/${uuidv4()}-${file.name}`);
      try {
        await uploadBytesResumable(storageRef, file);
        imageURL = await getDownloadURL(storageRef);
      } catch (error) {
        console.log('error', error);
        return null;
      }
    }
    return imageURL;
  };

  const submitShoeData = async (imageURL: string | null) => {
    const newShoe = {
      id: uuidv4(),
      Name: formik.values.Name,
      Price: formik.values.Price,
      ProductCode: formik.values.ProductCode,
      Size: formik.values.Size.map((s: any) => s.value),
      imageURL: imageURL,
    };
  
    try {
      await addDoc(collection(db, 'shoes'), newShoe);
      dispatch(createShoe([...shoeData, newShoe]));
      console.log('Before reset:', formik.values);
      formik.resetForm();
      formik.setValues(initValues);
      console.log('After reset:', formik.values);
  
      setOpenCreate(false);
  
      queryClient.invalidateQueries({ queryKey: ['shoes'] });
      refetch();
    } catch (firestoreError) {
      console.error('Error adding shoe to Firestore:', firestoreError);
      throw firestoreError;
    }
  };
  
  const submitFormCreate = async () => {
    try {
      await formik.validateForm();
      const imageURL = await handleImageUpload();
      await submitShoeData(imageURL);
    } catch (error) {
      console.error('Error creating shoe:', error);
    }
  };
  
  
  
  const handleSubmit = async () => {
    await submitFormCreate();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initValues,
    onSubmit: handleSubmit,
    validationSchema: Yup.object().shape({
      Name: Yup.string().required('Name is required'),
      Price: Yup.number().required('Price is required'),
      ProductCode: Yup.string().required('Product Code is required'),
      Size: Yup.array().min(1, 'Please select at least one size'),
    }),
  });

  return (
    <Modal title="Add shoe" visible={visible} onCancel={onCancel} width={1000}>
      <form
        onSubmit={formik.handleSubmit}
      >
        <Form.Item name="Name" label="Name" style={{ width: '53px' , color:'black' }}>
          <Input
            name="Name"
            value={formik.values.Name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        {formik.touched.Name && formik.errors.Name ? (
          <div className="error-message">{String(formik.errors.Name)}</div>
        ) : null}
        <Form.Item name="Price" label="Price">
          <InputNumber
            name="Price"
            type="number"
            value={formik.values.Price}
            onChange={(value) => formik.setFieldValue('Price', value)}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        {formik.touched.Price && formik.errors.Price ? (
          <div className="error-message">{String(formik.errors.Price)}</div>
        ) : null}
        <Form.Item name="ProductCode" label="Product Code">
          <Input
            value={formik.values.ProductCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        {formik.touched.ProductCode && formik.errors.ProductCode ? (
          <div className="error-message">{String(formik.errors.ProductCode)}</div>
        ) : null}
        <Form.Item name="Size" label="Size" className="inputSelect">
          <Select
            options={sizeOptions}
            isMulti={true}
            name="Size"
            className="basic-multi-select inputSelect"
            classNamePrefix="select"
            value={formik.values.Size}
            onChange={(selectedOptions: any) => formik.setFieldValue('Size', selectedOptions)}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        {formik.touched.Size && formik.errors.Size ? (
          <div className="error-message">{String(formik.errors.Size)}</div>
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
                src={uploadedImage || formik.values.imageURL}
                className="renderImage"
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
      </form>
    </Modal>
  );
};

export default CreateShoeModal;
