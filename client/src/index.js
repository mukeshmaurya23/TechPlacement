import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ChatBot from "./UI/ChatBot";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./components/store/auth-login";
import ScrollToTop from "./components/Navbar/ScrollToTop";

//import ResumeAnalyzer from "./resumeFunction/Resume/ResumeAnalyzer";
if (process.env.REACT_APP_CONSOLE === "development") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
  console.warn = () => {};
}
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <ScrollToTop />
      <App />
      <ChatBot />
    </BrowserRouter>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
