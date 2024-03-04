import React, { useRef, useState } from 'react';
import { Modal, Form, Button, Input, InputNumber, FormInstance } from 'antd';
import { useDropzone } from 'react-dropzone';
import { UploadOutlined , LoadingOutlined} from '@ant-design/icons';
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
import  {toast } from 'react-toastify';

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
  const [loading, setLoading] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl)
    },
  });
  const formRef = useRef<FormInstance | null>(null); 

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
        toast.error('Lỗi xảy ra!', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        return null;
      }
    }
    return imageURL;
  };

  const submitShoeData = async (imageURL: string | null) => {
    setLoading(true);
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

      toast.success('Thành công!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      formik.resetForm();
      setOpenCreate(false);

      queryClient.invalidateQueries({ queryKey: ['shoes'] });
      refetch();
    } catch (firestoreError) {
      toast.error('Lỗi xảy ra!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      throw firestoreError;
    }finally{
      setLoading(false); 
    }
  };
  
  const submitFormCreate = async () => {
    try {
      await formik.validateForm();
      const imageURL = await handleImageUpload();
      await submitShoeData(imageURL);
      if (formRef.current) {
        formRef.current.resetFields();
        setUploadedImage(null); 
      }

    } catch (error) {
      toast.error('Lỗi xảy ra!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
      });    }
  };
  
  const handleSubmit = async () => {
    await submitFormCreate();
  };
  const validationSchema = Yup.object().shape({
    Name: Yup.string().required('Name is required'),
    Price: Yup.number()
    .typeError('Price must be a number')
    .required('Price is required')
    .min(1000000, 'Minimum price is 1,000,000 VND')
    .max(100000000, 'Maximum price is 100,000,000 VND'),
    ProductCode: Yup.string().required('Product Code is required'),
    Size: Yup.array().min(1, 'Please select at least one size'),
  }); 


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema
  });

  return (
    <Modal title="Add shoe" visible={visible} onCancel={onCancel} width={1000}>
      <Form ref={formRef} onFinish={formik.handleSubmit}>
      {formik.touched.Name && formik.errors.Name ? (
          <div className="error-message">{String(formik.errors.Name)}</div>
        ) : null}
        <Form.Item name="Name" label="Name" style={{ width: '53px' , color:'black' }}  >
          <Input
            name="Name"
            value={formik.values.Name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        {formik.touched.Price && formik.errors.Price ? (
          <div className="error-message">{String(formik.errors.Price)}</div>
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
        {formik.touched.ProductCode && formik.errors.ProductCode ? (
          <div className="error-message">{String(formik.errors.ProductCode)}</div>
        ) : null}
        <Form.Item name="ProductCode" label="Product Code">
          <Input
            value={formik.values.ProductCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        {formik.touched.Size && formik.errors.Size ? (
          <div className="error-message">{String(formik.errors.Size)}</div>
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
        <Button type="primary" htmlType="submit" disabled={loading} icon={loading && <LoadingOutlined />}> 
                Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateShoeModal;
