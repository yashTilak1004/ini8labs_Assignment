import React from "react";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "20px 20px",
        paddingBottom: "20px",
        marginBottom: "20px",
        backgroundColor: "#a3b1c7ff",
        borderBottom: "1px solid #bec5d1ff",
      }}
    >
      <span
        style={{
          fontSize: "18px",
          fontWeight: 600,
          color: "#111827",
          letterSpacing: "0.2px",
        }}
      >
        PDF Management
      </span>
    </div>
  );
};
export default Header;
