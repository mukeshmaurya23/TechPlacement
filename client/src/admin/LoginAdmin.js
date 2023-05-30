import React, { useContext } from "react";

import { AuthContext } from "../components/store/auth-login";

import DashBoard from "../adminDashboard/DashBoard";

const LoginAdmin = ({ requiredRole }) => {
  const [state] = useContext(AuthContext);

  return (
    <>
      {state && state.user && state.user.role === requiredRole ? (
        <div style={{ marginTop: "6rem" }}>
          <DashBoard />
        </div>
      ) : (
        <div className="p-5 container">{(window.location.href = "/")}</div>
      )}
    </>
  );
};
export default LoginAdmin;
