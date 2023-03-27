import React from 'react';
import { Menu } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';

import './menu.css';


const Menus = () => {
  const navigate = useNavigate();

  const handleClick = (key: any) => {
    if (!key) navigate(key);
  };

  return (
    <div className='sidebar-menu'>
      <Menu
        className='menu-sidebar'
        onClick={handleClick}
        mode='vertical'
        selectable={true}
        items={[
          {
            label: 'Page 1',
            key: '1',
            icon: <NavLink to='/pages/page-1' />
          },
          {
            label: 'Page 2',
            key: '2',
            icon: <NavLink to='/pages/page-2' />
          }
        ]}
      />
    </div>
  );
};

export default Menus;