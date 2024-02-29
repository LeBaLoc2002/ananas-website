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
  
const UpdateShoeModal: React.FC<UpdateShoeModalProps> = ({visible, onCancel , selectedShoeId, shoeData, setOpenUpdate, refetch}) => {
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
  
  const formik = useFormik({
    initialValues: initValues,
    onSubmit: async () => {
      try {
        await formik.validateForm();
    
        let imageURL = (shoeData.find((shoe) => shoe.id === selectedShoeId) as { id: string; imageURL: string })?.imageURL;
        
        let imageUrlOld = formik.values.imageURL;
      
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
          Name: formik.values.Name,
          Price: formik.values.Price,
          ProductCode: formik.values.ProductCode,
          Size: formik.values.Size.map((s: any) => s.value),
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
        formik.resetForm();
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
    <Modal title="Update Shoe" visible={visible} onCancel={onCancel} width={1000}>
      <Form onFinish={formik.handleSubmit} initialValues={{ ...formik.values }}>
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

export default UpdateShoeModal;
