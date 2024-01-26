import { Content } from 'antd/es/layout/layout';
import React from 'react';
import HomeBuy from '../HomeBuy/HomeBuy';
import HomeBanner from '../HomeBanner/HomeBanner';
import HomeCollection from '../HomeCollection/HomeCollection';
import HomeInstagram from '../HomeInstagram/HomeInstagram';
import SlideBanner from '../SlideBanner/SlideBanner';
import HeaderLayout from '../header/Header';
import FooterLayout from '../footer/Footer';
import { Layout } from "antd";
const MainContent = () => {
  return (
    <Layout>
      <HeaderLayout/>
          <Content>
            <SlideBanner/>
            <HomeCollection/>
            <HomeBuy/>
            <HomeBanner/>
            <HomeInstagram/>
        </Content>
      <FooterLayout/>
    </Layout>
  );
};

export default MainContent;
