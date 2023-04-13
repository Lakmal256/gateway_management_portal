import * as React from "react";
import AppBar from "@mui/material/AppBar";
import "../ComponentStyles/appbar.css";

const Header = () => {
  return (
    <AppBar className="appbar" position="static">
      <div className="appbar_header">
        <div className="appbar_text">Gateway Management Portal</div>
      </div>
    </AppBar>
  );
};

export default Header;
