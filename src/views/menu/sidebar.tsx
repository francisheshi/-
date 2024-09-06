import React from "react";
import { Button, Menu } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const handleClick = (key: any) => {
    if (!key) navigate(key);
  };

  return (
    <div className="flex flex-col relative w-[40em]">
      <div className="w-[250px] bg-gray-100 p-4 shadow-md rounded-md">
        <Menu
          onClick={handleClick}
          mode="vertical"
          selectable={true}
          className="space-y-4" // Tailwind spacing for buttons
        >
          <Menu.Item key="1">
            <Button
              type="primary"
              block
              size="large"
              className="rounded-md shadow-lg bg-blue-500 hover:bg-blue-600"
            >
              <NavLink to="/pages/page-1" className="text-white">
                Page 1
              </NavLink>
            </Button>
          </Menu.Item>
          <Menu.Item key="2">
            <Button
              type="primary"
              block
              size="large"
              className="rounded-md shadow-lg bg-blue-500 hover:bg-blue-600"
            >
              <NavLink to="/pages/page-2" className="text-white">
                Page 2
              </NavLink>
            </Button>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default SideBar;
