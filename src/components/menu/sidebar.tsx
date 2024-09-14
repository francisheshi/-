import React from "react";
import { Button, Menu } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const handleClick = (key: any) => {
    if (!key) navigate(key);
  };

  return (
    <div className="grid w-[40em]">
      <div className="w-[250px] bg-gray-100 p-3 rounded-md">
        <Menu
          onClick={handleClick}
          className="space-y-2" // Tailwind spacing for buttons
          selectable={true}
          mode="vertical"
        >
          <Menu.Item key="1">
            <Button
              className="rounded-md shadow-lg bg-blue-500 hover:bg-blue-600"
              type="primary"
              size="large"
              block
            >
              <NavLink to="/pages/page-1" className="text-white">
                TextAreas
              </NavLink>
            </Button>
          </Menu.Item>
          <Menu.Item key="2">
            <Button
              className="rounded-md shadow-lg bg-blue-500 hover:bg-blue-600"
              type="primary"
              size="large"
              block
            >
              <NavLink to="/pages/page-2" className="text-white">
                Cards
              </NavLink>
            </Button>
          </Menu.Item>
          <Menu.Item key="3">
            <Button
              className="rounded-md shadow-lg bg-blue-500 hover:bg-blue-600"
              type="primary"
              size="large"
              block
            >
              <NavLink to="/pages/page-3" className="text-white">
                Tables
              </NavLink>
            </Button>
          </Menu.Item>
          <Menu.Item key="4">
            <Button
              className="rounded-md shadow-lg bg-blue-500 hover:bg-blue-600"
              type="primary"
              size="large"
              block
            >
              <NavLink to="/pages/page-4" className="text-white">
                Calendar
              </NavLink>
            </Button>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default SideBar;
