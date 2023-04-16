import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import "../ComponentStyles/create.css";
import { useState, useEffect } from "react";
import { ADD_GATEWAY} from "../Constants/AddGateway";

const CreateGateway = ({ open, handleClose, onSubmit, action, gateway }) => {
  const [serialNumber, setSerialNumber] = useState("");
  const [gateName, setGateName] = useState("");
  const [ipAddress, setIpAddress] = useState("");

  useEffect(() => {
    if (gateway) {
      setSerialNumber(gateway.serialNumber);
      setGateName(gateway.name);
      setIpAddress(gateway.ipv4Address);
    }
  }, [gateway]);

  const handleSubmit = () => {
    onSubmit(serialNumber, gateName, ipAddress);
    handleClose();
  };

  return (
    <div>
      <Dialog classes={{ paper: "create_form" }} open={open} onClose={handleClose}>
          <div className="create_title">{action} Gateway</div>
        <div>
          <hr />
        </div>
        {ADD_GATEWAY.map((field) => {
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
                      if (field.name === "serialNumber") {
                        setSerialNumber(e.target.value);
                      } else if (field.name === "name") {
                        setGateName(e.target.value);
                      } else if (field.name === "ipv4Address") {
                        setIpAddress(e.target.value);
                      }
                    }}
                    value={
                      field.name === "serialNumber"
                        ? serialNumber
                        : field.name === "name"
                        ? gateName
                        : ipAddress
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
            Cancel
          </Button>nbsp;
          <Button className="create_button" onClick={handleSubmit}>
            {action}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default CreateGateway;

