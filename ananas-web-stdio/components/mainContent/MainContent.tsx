import { Content } from 'antd/es/layout/layout';
import React from 'react';

const MainContent = () => {
  return (
    <Content
      style={{
        margin: '24px 16px 0',
      }}
    >
      <div
        style={{
          padding: 24,
          minHeight: 360,
        }}
      >
        content
      </div>
    </Content>
  );
};

export default MainContent;
