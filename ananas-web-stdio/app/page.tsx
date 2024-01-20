import React from 'react';
import { Layout } from "antd";
import HeaderLayout from '@/components/header/Header';
import MainContent from '@/components/mainContent/MainContent';
import FooterLayout from '@/components/footer/Footer';

export default function Home() {

  return (
    <Layout>
      <Layout>
        <HeaderLayout />
        <MainContent />
        <FooterLayout />
      </Layout>
    </Layout>
  );
}



