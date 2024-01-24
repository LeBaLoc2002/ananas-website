import { Header } from 'antd/es/layout/layout'
import React from 'react'
import './HeaderShoe.scss'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Button } from 'antd';

interface props {
  collapsed: boolean,
  setCollapsed: (setCollapsed: boolean) => void;
}



export default function HeaderShoe({ setCollapsed, collapsed } : props) {
  return (
    <Header style={{ padding: 0 }} className='bg-emerald-400 flex w-full z-50 fixed header-shoe'>
        <div className='flex'>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        </div>
        <div className='row flex'>
            <div className='col-start-1 col-end-3'>
                <div className='row px-1	'>
                  <h2>Manager Shoe</h2>
                </div> 
            </div>
            <div className='flex col-end-7 col-span-2'>
                <div className='row px-1 '>
                <form role="search">
                  <label >Search for stuff</label>
                  <input id="search" type="search" placeholder="Search..."  required />
                  <button type="submit">Go</button>    
                </form>
                </div> 
                <div className='row px-1	'>
                  <Avatar size="large" icon={<BellOutlined />} />
                </div>    
                <div className='row px-1'>
                  <Avatar size="large" icon={<UserOutlined />} />
                </div>  
          </div>      
        </div>
    </Header>
  )
}
