import React from "react";
import Navbar from "./nav";
import { Button } from "antd";

const Layout = ({
  children,
  logout,
}: {
  children: React.ReactNode;
  logout: () => void;
}) => {
  return (
    <div>
      <Navbar />
      <main className="mx-auto min-h-screen"> {children}</main>
      <footer className="flex-shrink-0 w-[250px] bg-gray-100 p-1 rounded-md">
        <Button
          type="primary"
          onClick={logout} // Use the passed logout function
          size="large"
          block
          htmlType="submit"
          className="rounded-md shadow-lg bg-blue-500 hover:bg-blue-600"
        >
          Logout
        </Button>
      </footer>
    </div>
  );
};

export default Layout;
