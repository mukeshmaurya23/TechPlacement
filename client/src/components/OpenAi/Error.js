import React from "react";

const Error = ({ err }) => {
  return (
    <div
      style={{
        color: "#ef4444",
        fontSize: "16px",
        lineHeight: "24px",
      }}
    >
      An error occurred - "{err.message}". Refresh the page and try again later.
    </div>
  );
};

export default Error;
