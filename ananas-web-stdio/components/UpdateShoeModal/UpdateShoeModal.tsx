import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Input, InputNumber } from 'antd';
import { useDropzone } from 'react-dropzone';
import { UploadOutlined } from '@ant-design/icons';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '@/src/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateShoe } from '@/src/features/shoeSlice';
import { useDispatch } from 'react-redux';
import { QueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import './UpdateShoeModal.scss'
interface UpdateShoeModalProps {
  visible: boolean;
  onCancel: () => void;
  title: string;
  width:any;
  selectedShoeId: string | null;
  shoeData: any[]; 
  setOpenUpdate: (value: boolean) => void; 
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
  
const UpdateShoeModal: React.FC<UpdateShoeModalProps> = ({visible, onCancel , selectedShoeId, shoeData, setOpenUpdate, }) => {
  const dispatch = useDispatch()
  const queryClient = new QueryClient()
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const imageUrl: any = URL.createObjectURL(file);
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
useEffect(() => {
  if (selectedShoeId) {
    const selectedShoe = shoeData.find((shoe) => shoe.id === selectedShoeId) as Shoe;
    
    formikUpdate.setValues({
      ...formikUpdate.values,
      Name: selectedShoe.Name,
      Price: selectedShoe.Price,
      ProductCode: selectedShoe.ProductCode,
      Size: selectedShoe.Size,
      imageURL: selectedShoe.imageURL,
    });
  }
}, [selectedShoeId, shoeData]);

  const formikUpdate = useFormik({
    initialValues: initValues,
    onSubmit: async () => {
      try {
        await formikUpdate.validateForm();
    
        let imageURL = (shoeData.find((shoe) => shoe.id === selectedShoeId) as { id: string; imageURL: string })?.imageURL;
        
        let imageUrlOld = formikUpdate.values.imageURL;
      
          if (acceptedFiles.length > 0) {
              const file = acceptedFiles[0];
              const storageRef = ref(storage, `uploads/${uuidv4()}-${file.name}`);
              try {
                  if (imageUrlOld) {
                      const oldImageRef = ref(storage, imageUrlOld);
                      await deleteObject(oldImageRef);
                  }
      
                  await uploadBytesResumable(storageRef, file);
                  imageUrlOld = await getDownloadURL(storageRef); 
      
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
    <Modal title="Update Shoe" visible={visible} onCancel={onCancel} width={1000}>
      <Form onFinish={formikUpdate.handleSubmit} initialValues={{ ...formikUpdate.values }}>
        <Form.Item name="id" style={{ display: 'none' }}>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="Name" label="Name" className='text-black'> 
          <Input
            name="Name"
            value={formikUpdate.values.Name}
            onChange={formikUpdate.handleChange}
            onBlur={formikUpdate.handleBlur}
          />
        </Form.Item>
        {formikUpdate.touched.Name && formikUpdate.errors.Name ? (
          <div className="error-message">{String(formikUpdate.errors.Name)}</div>
        ) : null}
        <Form.Item name="Price" label="Price"  className='text-black'>
          <InputNumber
            name="Price"
            type="number"
            value={formikUpdate.values.Price}
            onChange={(value) => formikUpdate.setFieldValue('Price', value)}
            onBlur={formikUpdate.handleBlur}
          />
        </Form.Item>
        {formikUpdate.touched.Price && formikUpdate.errors.Price ? (
          <div className="error-message">{String(formikUpdate.errors.Price)}</div>
        ) : null}
        <Form.Item name="ProductCode" label="Product Code"  className='text-black' >
          <Input
            value={formikUpdate.values.ProductCode}
            onChange={formikUpdate.handleChange}
            onBlur={formikUpdate.handleBlur}
          />
        </Form.Item>
        {formikUpdate.touched.ProductCode && formikUpdate.errors.ProductCode ? (
          <div className="error-message">{String(formikUpdate.errors.ProductCode)}</div>
        ) : null}
        <Form.Item name="Size" label="Size" className="inputSelect text-black">
          <Select
            options={sizeOptions}
            isMulti={true}
            name="Size"
            className="basic-multi-select inputSelect"
            classNamePrefix="select"
            value={formikUpdate.values.Size}
            onChange={(selectedOptions: any) => formikUpdate.setFieldValue('Size', selectedOptions)}
            onBlur={formikUpdate.handleBlur}
          />
        </Form.Item>
        {formikUpdate.touched.Size && formikUpdate.errors.Size ? (
          <div className="error-message">{String(formikUpdate.errors.Size)}</div>
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
                src={uploadedImage || formikUpdate.values.imageURL}
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
      </Form>
    </Modal>
  );
};

export default UpdateShoeModal;
