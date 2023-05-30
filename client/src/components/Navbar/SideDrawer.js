import React from "react";
import ReactDOM from "react-dom";

const SideDrawer = (props) => {
  const content = <aside>{props.children}</aside>;
  const idPortal = document.getElementById("portal-root");
  return ReactDOM.createPortal(content, idPortal);
};

export default SideDrawer;
