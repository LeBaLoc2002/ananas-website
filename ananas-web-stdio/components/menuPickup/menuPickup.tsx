import { Dropdown, Menu, MenuProps } from 'antd'
import React from 'react'
import { UserOutlined} from '@ant-design/icons';
import Link from 'next/link';

const items: MenuProps['items'] = [
    {
      label: '1st menu item',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: '2nd menu item',
      key: '2',
      icon: <UserOutlined />,
    },
  ];
  const menuProps = {
    items
  };
function MenuPickup() {
  return (
    <div>
        <Menu mode="horizontal" className='menuOne rounded-xl'>
            <Menu.Item key="Pickup">
            <h2>Pickup 1</h2>
                <p>24 orders - 09:00 AM</p>
            </Menu.Item>
            <Menu.Item key="itemPickup" style={{ marginLeft: 'auto', justifyContent: 'center'}} className='itemPickup  mt-7'>
                <Link href="/" passHref>
                <Dropdown.Button menu={menuProps} className='mt-7 max-sm:mt-0 max-sm:hidden'>
                  Home Page
                </Dropdown.Button>
              </Link>
            </Menu.Item>
        </Menu>
    </div>
  )
}

export default MenuPickup
