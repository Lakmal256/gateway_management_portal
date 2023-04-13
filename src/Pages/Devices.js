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
import { useState } from "react";
import CreateDevice from "../Components/CreateDevice";
import { DEVICE } from "../Constants/DeviceTable";
import AlertDialog from "../Components/DeleteDialog";

const DeviceTable = (handleClose) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);


  return (
    <div>
      <div><Header /></div>
      <div className="receipts_table_main">
        <div className="receipts_label">Devices</div>
        <div>
          <div className="two_buttons">
            <button className="make_a_payment_button" onClick={() => setIsDialogOpen(true)}>+ add Device</button>
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
                {DEVICE.map((row) => (
                  <TableRow
                    key={row.uID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.uID}
                    </TableCell>
                    <TableCell>{row.vendor}</TableCell>
                    <TableCell>{row.dateOfCreate}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
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
        <AlertDialog open={isAlertOpen} handleClose={()=> setIsAlertOpen(false)}/>
        <CreateDevice open={isDialogOpen} handleClose={() => setIsDialogOpen(false)}/>
      </div>
    </div>
  );
}
export default DeviceTable;
