// Layout.js
import React from "react";
import Navbar from "./nav"; // Your Navbar component

const Layout = ({ children }: any) => {
  return (
    <div>
      <Navbar /> {/* Navbar stays fixed at the top */}
      <main className="mx-auto min-h-screen"> {children}</main>
    </div>
  );
};

export default Layout;
