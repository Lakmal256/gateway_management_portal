import "../ComponentStyles/table.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Header from "../Components/AppBar";
import Paper from "@mui/material/Paper";
import { GATEWAY } from "../Constants/GatewayTable";
import React from "react";
import { useNavigate } from 'react-router-dom';
import CreateGateway from "../Components/CreateGateway.js";
import { useState } from "react";
import AlertDialog from "../Components/DeleteDialog";

const GatewayTable = () => {

  const history = useNavigate();
  const Navigate = (serialNumber) => {
    history(`/devices?serialNumber=${serialNumber}`);
  }
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  


  return (
    <div>
      <div><Header /></div>
      <div className="receipts_table_main">
        <div className="receipts_label">Gateways</div>
        <div>
          <div className="two_buttons">
            <button className="make_a_payment_button" onClick={() => setIsDialogOpen(true)}>+ add Gateway</button>
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
                  <TableCell>Serial Number</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>IPv4 Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {GATEWAY.map((row) => (
                  <TableRow
                    key={row.serialNumber}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.serialNumber}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.ipv4Address}</TableCell>
                    <TableCell>
                    <button
                        className="view_receipts_button_1"
                        onClick={() => Navigate(row.serialNumber)}
                      >
                        View Devices
                      </button>&nbsp;<br/>
                      <button
                        className="view_receipts_button_2"
                        // onClick={}
                      >
                        Update
                      </button>&nbsp;<br/>
                      <button
                        className="view_receipts_button_3"
                        onClick={() => setIsAlertOpen(true)}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <CreateGateway open={isDialogOpen} handleClose={() => setIsDialogOpen(false)}/>
        <AlertDialog open={isAlertOpen} handleClose={()=> setIsAlertOpen(false)}/>
      </div>
    </div>
  );
}
export default GatewayTable;
