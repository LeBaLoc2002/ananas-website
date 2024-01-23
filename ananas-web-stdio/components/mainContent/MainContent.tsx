import { Content } from 'antd/es/layout/layout';
import React from 'react';
import HomeBuy from '../HomeBuy/HomeBuy';
import HomeBanner from '../HomeBanner/HomeBanner';
import HomeCollection from '../HomeCollection/HomeCollection';
import HomeInstagram from '../HomeInstagram/HomeInstagram';
import SlideBanner from '../SlideBanner/SlideBanner';

const MainContent = () => {
  return (
    <Content>
      <SlideBanner/>
      <HomeCollection/>
      <HomeBuy/>
      <HomeBanner/>
      <HomeInstagram/>
    </Content>
  );
};

export default MainContent;
