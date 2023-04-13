import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import "../ComponentStyles/create.css";
import { useState } from "react";
import { ADD_GATEWAY} from "../Constants/AddGateway";

const CreateGateway = ({ open, handleClose, onSubmit }) => {
  const [serialNumber, setSerialNumber] = React.useState("");
  const [gateName, setGateName] = React.useState("");
  const [ipAddress, setIpAddress] = React.useState("");

  const [dataSet, setDataSet] = useState({
    serialNumber: "",
    name: "",
    ipv4Address: "",
  });
  const handleData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    var createDataSet = JSON.parse(JSON.stringify(dataSet));
    createDataSet[name] = value;
    setDataSet(createDataSet);
  };
  const controlData = (isSubmit) => {
    setSerialNumber("");
    setGateName("");
    setIpAddress("");

    if (isSubmit) {
      if (serialNumber === "" || gateName === "" || ipAddress ==="") {
        console.log("Please Fill the Form");
      } else {
        onSubmit(serialNumber, gateName, ipAddress);
      }
    } else {
      handleClose();
    }
  };
  return (
    <div>
      <Dialog classes={{ paper: "cu_form" }} open={open} onClose={handleClose}>
        {/* cu = create user */}
        <div className="cu_title">
          <div className="cu_signup">Add Gateway</div>
        </div>
        <div>
          <hr />
        </div>

        {ADD_GATEWAY.map((field) => {
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
                    onChange={(e) => handleData(e)}
                    value={dataSet[field.name]}
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
          <Button className="cu_button" onClick={() => controlData(true)}>
            Add
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
export default CreateGateway;
