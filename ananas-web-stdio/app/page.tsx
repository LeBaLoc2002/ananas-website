import React from 'react';
import { Layout } from "antd";
import MainContent from '@/components/mainContent/MainContent';
import { ToastContainer } from 'react-toastify';

export default function Home() {
  return (
        <Layout>
            <MainContent />
            <ToastContainer />
        </Layout>
  );
}



