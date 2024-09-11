import React, { FC, useState } from "react";
import { Button, Input, Menu } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";

const { Search } = Input;

const NavBar: FC = () => {
  const navigate = useNavigate();
  const { query, updateSearchQuery } = useSearch();
  const [searchInput, setSearchInput] = useState<string>(query);

  const handleClick = (key: any) => {
    if (!key) navigate(key);
  };

  const searchToPathMap: { [key: string]: string } = {
    "page 1": "/pages/page-1",
    "page 2": "/pages/page-2",
    "page 3": "/pages/page-1",
  };

  const handleSearch = () => {
    updateSearchQuery(searchInput);

    const normalizedSearch = searchInput.trim().toLowerCase();

    let targetPath = "";

    for (const [key, path] of Object.entries(searchToPathMap)) {
      if (normalizedSearch.includes(key)) {
        targetPath = path;
        break;
      }
    }

    if (targetPath) {
      navigate(targetPath);
    } else {
      navigate("/pages/not-found");
    }
  };

  return (
    <div className="w-full bg-blue-600 p-3 fixed top-0 items-center justify-end">
      {/* H1 Tag at the Start */}
      <h1 className="text-white text-4xl font-semibold duration-700 ease-in-out hover:scale-105">
        Story Book
      </h1>
      <div className="flex items-center justify-center">
        <Menu
          onClick={handleClick}
          mode="horizontal"
          selectable={true}
          className="items-center space-x-2"
        >
          <Menu.Item key="1">
            <Button
              type="primary"
              size="large"
              className="rounded-md shadow-lg bg-blue-500 hover:bg-blue-600 transition-all duration-500 ease-in-out transform hover:-translate-y-1"
            >
              <NavLink to="/pages/page-1" className="text-white">
                TextAreas
              </NavLink>
            </Button>
          </Menu.Item>
          <Menu.Item key="2">
            <Button
              type="primary"
              size="large"
              className="rounded-md shadow-lg bg-blue-500 hover:bg-blue-600 transition-all duration-500 ease-in-out transform hover:-translate-y-1"
            >
              <NavLink to="/pages/page-2" className="text-white">
                Cards
              </NavLink>
            </Button>
          </Menu.Item>
          <Menu.Item key="3">
            <Button
              type="primary"
              size="large"
              className="rounded-md shadow-lg bg-blue-500 hover:bg-blue-600 transition-all duration-500 ease-in-out transform hover:-translate-y-1"
            >
              <NavLink to="/pages/page-3" className="text-white">
                Tables
              </NavLink>
            </Button>
          </Menu.Item>
        </Menu>
        <div className="flex-grow flex justify-center px-12">
          <Search
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onSearch={handleSearch}
            className="rounded-md w-80"
            enterButton="Search"
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
