import { useSearch } from "../../context/SearchContext";
import menuItems from "../../lib/linksUtilData";
import { useNavigate } from "react-router-dom";
import React, { FC, useState } from "react";
import { Input, Menu } from "antd";
const { Search } = Input;

const NavBar: FC = () => {
  const navigate = useNavigate();
  const { query, updateSearchQuery } = useSearch();
  const [searchInput, setSearchInput] = useState<string>(query);

  const handleClick = (key: any) => {
    if (!key) navigate(key);
  };

  const searchToPathMap: { [key: string]: string } = {
    "page 1": "/pages/textareas",
    "page 2": "/pages/cards",
    "page 3": "/pages/tables",
    "page 4": "/pages/calendar",
    "page 5": "/pages/profile",
    "page 6": "/pages/kanban_board",
  };

  const handleSearch = () => {
    const normalizedSearch = searchInput.trim().toLowerCase();
    updateSearchQuery(searchInput);
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
    <div className="w-full bg-blue-600 p-5 fixed top-0 items-center justify-between">
      <h1 className="text-white text-3xl font-semibold duration-700 ease-in-out">
        Story Book
      </h1>
      <div className="flex items-center relative justify-between">
        <Menu
          className="space-x-2 justify-between"
          onClick={handleClick}
          selectable={true}
          mode="horizontal"
          items={menuItems}
        />
        <div className="flex items-center px-128 justify-end">
          <Search
            onChange={(e) => setSearchInput(e.target.value)}
            className="rounded-md w-[345px]"
            placeholder="Search..."
            onSearch={handleSearch}
            enterButton="Search"
            value={searchInput}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
