import "../ComponentStyles/table.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Header from "../Components/AppBar";
import Paper from "@mui/material/Paper";
import React from "react";
import { useState, useEffect } from "react";
import CreateDevice from "../Components/CreateDeviceDialog";
import api from "../api";
import DeleteDialog from "../Components/DeleteDialog";
import { Edit, Delete } from '@mui/icons-material';

const DeviceTable = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    getDevices();
  }, []);

  const getDevices = () => {
    api.get("/device")
      .then((res) => {
        console.log('res', res)
        setDevices(res.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });

  };

  const handleAddDevices = (devices) => {
    setIsDialogOpen(true);
    setSelectedDevice(null);
    api.post("/device", devices)
      .then((res) => {
        setDevices(res.data.data);
        setIsDialogOpen(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const handleEditDevices = (devices) => {
    setSelectedDevice(devices);
    setIsDialogOpen(true);
    api.put("/device", devices)
      .then((res) => {
        setDevices(res.data.data);
        setSelectedDevice(devices);
        setIsDialogOpen(true);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const handleSubmit = (id, uuid, vendor, gatewayId, status, action,) => {
    const payload = action === "Add" ? {
      vendor: vendor,
      status: status,
      gatewayId: gatewayId,
      uuid: uuid
    } :
      {
        vendor: vendor,
        status: status
      }
    const url = action === "Add" ? "/device" : `/device/${id}`
    const method = action === "Add" ? api.post : api.put

    method(url, payload)
      .then((res) => {
        setDevices(res.data.data);
        setIsDialogOpen(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  return (
    <div>
      <div><Header /></div>
      <div className="device_table_main">
        <div className="label">Devices</div>
        <div>
          <button className="add_gateway_button" onClick={handleAddDevices}>+ Add Device</button>
        </div>
        <TableContainer component={Paper}>
          <Table
            sx={{
              color: "success.main",
              "& .MuiTable": {
                padding: "20px",
                width: "600px",
                margin: "auto",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>UID</TableCell>
                <TableCell>Vendor</TableCell>
                <TableCell>Date of Create</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {devices.map((row) => (
                <TableRow
                  key={row.uuid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.uuid}
                  </TableCell>
                  <TableCell>{row.vendor}</TableCell>
                  <TableCell>{row.createdDate}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <button
                      className="gateway_edit_button"
                      onClick={() => handleEditDevices(row)}
                    >
                      <Edit />
                    </button>
                    <button
                      className="gateway_delete_button"
                      onClick={() => setIsAlertOpen(true)}
                    >
                      <Delete />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <DeleteDialog open={isAlertOpen} handleClose={() => setIsAlertOpen(false)} />
      <CreateDevice open={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        action={selectedDevice ? "Update" : "Add"}
        devices={selectedDevice}
        onSubmit={handleSubmit} />
    </div>
  );
}
export default DeviceTable;
