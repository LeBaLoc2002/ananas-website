import { Menu } from 'antd'
import React from 'react'

export default function MenuTable() {
  return (
    <div>
      <Menu  className='flex items-center justify-between w-full row-header-center'  style={{backgroundColor: '#b5e3afa9'}} >
              <Menu.Item key="fff">
                <div className="font-black">#fff</div>
              </Menu.Item>
              <Menu.Item key="b">
                <div className="font-black">B</div>
              </Menu.Item>
              <Menu.Item key="30">
                <div className="font-black">30 Jan 2024</div>
              </Menu.Item>
              <Menu.Item key="40">
                <div className="font-black">40$</div>
              </Menu.Item>
            </Menu>
    </div>
  )
}
