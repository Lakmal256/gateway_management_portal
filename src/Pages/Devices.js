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
import AlertDialog from "../Components/DeleteDialog";
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
        console.log('res',res)
        setDevices(res.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
      
  };

  const handleAddDevices = () => {
    setIsDialogOpen(true);
    setSelectedDevice(null);
  };

  const handleEditDevices = (devices) => {
    setSelectedDevice(devices);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div><Header /></div>
      <div className="receipts_table_main_2">
        <div className="receipts_label">Devices</div>
        <div>
          <div className="two_buttons">
            <button className="make_a_payment_button" onClick={handleAddDevices}>+ add Device</button>
            <div className="search_bar">
            </div>
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
                        className="view_receipts_button_2"
                        onClick={() => handleEditDevices(row)}
                      >
                        <Edit />
                      </button>
                      <button
                        className="view_receipts_button_3"
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
        <AlertDialog open={isAlertOpen} handleClose={()=> setIsAlertOpen(false)}/>
        <CreateDevice open={isDialogOpen}
          handleClose={() => setIsDialogOpen(false)}
          action={selectedDevice ? "Update" : "Add"}
          gateway={selectedDevice}/>
      </div>
    </div>
  );
}
export default DeviceTable;
