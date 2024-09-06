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

  const handleSearch = () => {
    updateSearchQuery(searchInput);

    // Redirect based on search results, this is just an example
    // You may need a more complex logic to determine the correct path
    if (searchInput.includes("Page 1")) {
      navigate("/pages/page-1");
    } else if (searchInput.includes("Page 2")) {
      navigate("/pages/page-2");
    } else {
      navigate("/pages/not-found"); // Example for a page not found
    }
  };

  return (
    <div className="w-full bg-blue-600 p-4 fixed top-0 z-50 shadow-md ease-in-out">
      <div className="container flex items-center justify-around">
        <h1 className="text-white text-4xl font-semibold transform transition-transform duration-700 ease-in-out hover:scale-105">
          Story Book
        </h1>
        <Menu
          onClick={handleClick}
          mode="horizontal"
          selectable={true}
          className="space-x-4"
        >
          <Menu.Item key="1">
            <Button
              type="primary"
              size="large"
              className="rounded-md shadow-lg bg-blue-500 hover:bg-blue-600 transition-all duration-500 ease-in-out transform hover:-translate-y-1"
            >
              <NavLink to="/pages/page-1" className="text-white">
                Page 1
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
                Page 2
              </NavLink>
            </Button>
          </Menu.Item>
        </Menu>
        <Search
          placeholder="Search..."
          onSearch={handleSearch}
          className="rounded-md w-80"
          enterButton="Search"
        />
      </div>
    </div>
  );
};

export default NavBar;
