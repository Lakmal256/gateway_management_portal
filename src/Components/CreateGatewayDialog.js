import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import "../ComponentStyles/create.css";
import { useState, useEffect } from "react";
import { ADD_GATEWAY } from "../Constants/AddGateway";

const IPV4_REGEX_PATTERN = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const CreateGateway = ({ open, handleClose, onSubmit, action, gateway }) => {
  const [id, setId] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [gateName, setGateName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [ipAddressError, setIpAddressError] = useState("");

  useEffect(() => {
    if (gateway) {
      setSerialNumber(gateway.serialNumber);
      setGateName(gateway.name);
      setIpAddress(gateway.ipv4Address);
      setId(gateway._id);
    }
  }, [gateway]);

  const handleSubmit = () => {
    if (!serialNumber.trim()) {
      alert(`Serial Number is required`);
      return;
    }
    if (!gateName.trim()) {
      alert('Name is required');
      return;
    }if (!ipAddress.trim()) {
      alert('IPV4 Address is required');
      return;
    }
    if (!ipAddressError) {
      onSubmit(id,serialNumber, gateName, ipAddress, action);
      handleClose();
    }
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
                    onBlur={() => {
                      if (!ipAddress.match(IPV4_REGEX_PATTERN)) {
                        setIpAddressError("Please enter a valid IPv4 address.");
                      } else {
                        setIpAddressError("");
                      }
                    }}
                    required={field.name === "serialNumber" || field.name === "name" || field.name === "ipv4Address"}
                    value={
                      field.name === "serialNumber"
                        ? serialNumber
                        : field.name === "name"
                        ? gateName
                        : ipAddress
                    }
                  />
                  {field.name === "ipv4Address" && ipAddressError && (
                    <div className="error">{ipAddressError}</div>
                  )}
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