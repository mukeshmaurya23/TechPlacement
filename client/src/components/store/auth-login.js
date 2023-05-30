import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [state, setState] = useState({
    user: {},
    token: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setState({
        ...state,
        user: JSON.parse(atob(token.split(".")[1])),
        token: token,
      });
    }
    const user = localStorage.getItem("user");
    if (user) {
      setState({
        ...state,
        user: JSON.parse(user),
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
