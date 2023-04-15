import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import "../ComponentStyles/create.css";
import { useEffect, useState } from "react";
import { ADD_DEVICE } from "../Constants/AddDevice";

const CreateDevice = ({ open, handleClose, onSubmit, action, devices }) => {
  const [uID, setUID] = useState("");
  const [vendor, setVendor] = useState("");

  useEffect(() => {
    if (devices) {
      setUID(devices.uID);
      setVendor(devices.vendor);
    }
  }, [devices]);

  const handleSubmit = () => {
    onSubmit(uID, vendor);
    handleClose();
  };

  return (
    <div>
      <Dialog classes={{ paper: "cu_form" }} open={open} onClose={handleClose}>
        {/* cu = create user */}
        <div className="cu_title">
          <div className="cu_signup">{action} Device</div>
        </div>
        <div>
          <hr />
        </div>

        {ADD_DEVICE.map((field) => {
          if (field.show) {
            if (field.type === "select") {
              return (
                <div className="cu_form_row" key={field.id}>
                  <div className="cu_form_label">{field.label}</div>
                </div>
              );
            } else {
              return (
                <div className="cu_form_row" key={field.id}>
                  <div className="cu_form_label">{field.label}</div>
                  <input
                    placeholder={field.label}
                    name={field.name}
                    className={field.className}
                    type={field.type}
                    disabled={field.disabled}
                    onChange={(e) => {
                      if (field.name === "uID") {
                        setUID(e.target.value);
                      } else if (field.name === "vendor") {
                        setVendor(e.target.value);
                      }
                    }}
                    value={
                      field.name === "uID"
                        ? uID
                        : field.name === "vendor"
                        ? vendor
                        : ''
                    }
                  />
                </div>
              );
            }
          } else {
            return null;
          }
        })}
        <div className="cu_button_head">
        <Button className="cu_button" onClick={handleClose}>
            Close
          </Button>&nbsp;
          <Button className="cu_button" onClick={handleSubmit}>
            {action}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
export default CreateDevice;
