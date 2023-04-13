import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import DeviceTable from "./Pages/Devices";
import GatewayTable from "./Pages/Gateways";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<GatewayTable />} />
        <Route path="/devices" element={<DeviceTable />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
