import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import menuItems from "../../lib/linksUtilData";

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
          className="space-x-2 justify-between"
          selectable={true}
          mode="vertical"
          items={menuItems}
        />
      </div>
    </div>
  );
};

export default SideBar;
