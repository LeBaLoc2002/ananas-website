"use client"
import React from 'react';
import { Layout } from "antd";
import MainContent from '@/components/mainContent/MainContent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function Home() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainContent  />} />
        </Routes>
      </Layout>
    </Router>
  );
}



