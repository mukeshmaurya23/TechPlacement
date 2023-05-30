import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
const Layout = (props) => {
  return (
    <div>
      <Navbar />
      <main>{props.children}</main>
      <Outlet />
    </div>
  );
};

export default React.memo(Layout);
