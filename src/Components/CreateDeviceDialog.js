import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import "../ComponentStyles/create.css";
import { useEffect, useState } from "react";
import { ADD_DEVICE } from "../Constants/AddDevice";

const CreateDevice = ({ open, handleClose, onSubmit, action, devices }) => {
  const [uuid, setUID] = useState("");
  const [vendor, setVendor] = useState("");

  useEffect(() => {
    if (devices) {
      setUID(devices.uuid);
      setVendor(devices.vendor);
    }
  }, [devices]);

  const handleSubmit = () => {
    onSubmit(uuid, vendor);
    handleClose();
  };

  return (
    <div>
      <Dialog classes={{ paper: "create_form" }} open={open} onClose={handleClose}>
        <div className="create_title">{action} Device</div>
        <div>
          <hr />
        </div>

        {ADD_DEVICE.map((field) => {
          if (field.show) {
            if (field.type === "select") {
              return (
                <div className="create_form_row" key={field.id}>
                  <div>{field.label}</div>
                </div>
              );
            } else {
              return (
                <div className="create_form_row" key={field.id}>
                  <div>{field.label}</div>
                  <input
                    placeholder={field.label}
                    name={field.name}
                    className={field.className}
                    type={field.type}
                    disabled={field.disabled}
                    onChange={(e) => {
                      if (field.name === "uuid") {
                        setUID(e.target.value);
                      } else if (field.name === "vendor") {
                        setVendor(e.target.value);
                      }
                    }}
                    value={
                      field.name === "uuid"
                        ? uuid
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
        <div className="create_button_head">
          <Button className="create_button" onClick={handleClose}>
            Close
          </Button>&nbsp;
          <Button className="create_button" onClick={handleSubmit}>
            {action}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
export default CreateDevice;
