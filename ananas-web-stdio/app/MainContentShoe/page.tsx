"use client"
import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import SiderbarShoe from '../SidebarShoe/SiderbarShoe';
import HeaderShoe from '../HeaderShoe/HeaderShoe';
import './MainContentShoe.scss'

const {  Content } = Layout;

const Page: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <SiderbarShoe collapsed={collapsed}/>
        <Layout className='rounded header-content'>
          <HeaderShoe collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content
            style={{
              margin: '100px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
          </Content>
        </Layout>
    </Layout>
  );
};

export default Page;