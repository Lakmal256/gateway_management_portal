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
import { useNavigate } from 'react-router-dom';
import CreateGateway from "../Components/CreateGatewayDialog.js";
import { useState, useEffect } from "react";
import AlertDialog from "../Components/DeleteDialog";
import api from "../api";
import { Edit, Delete, AdUnits } from '@mui/icons-material';

const GatewayTable = () => {
  const history = useNavigate();
  const Navigate = (serialNumber) => {
    history(`/devices?serialNumber=${serialNumber}`);
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [gateways, setGateways] = useState([]);

  useEffect(() => {
    getGateways();
  }, []);

  const getGateways = () => {
    api.get("/gateway")
      .then((res) => {
        console.log('res',res)
        setGateways(res.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
      
  };
  
  const handleAddGateway = () => {
    setIsDialogOpen(true);
    setSelectedGateway(null);
  };

  const handleEditGateway = (gateway) => {
    setSelectedGateway(gateway);
    setIsDialogOpen(true);
  };


  // useEffect(()=>{
  //   console.log('gateway', selectedGateway)
  // },[selectedGateway]);

  return (
    <div>
      <div><Header /></div>
      <div className="receipts_table_main">
        <div className="receipts_label">Gateways</div>
        <div>
          <div className="two_buttons">
            <button
              className="make_a_payment_button"
              onClick={handleAddGateway}
            >
              + Add Gateway
            </button>
            <div className="search_bar"></div>
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
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gateways.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.serialNumber}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.ipv4Address}</TableCell>
                    <TableCell>
                      <button
                        className="view_receipts_button_1"
                        onClick={() => Navigate(row.serialNumber)}
                      >
                        <AdUnits/>
                      </button>
                      <button
                        className="view_receipts_button_2"
                        onClick={() => handleEditGateway(row)}
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
        <CreateGateway
          open={isDialogOpen}
          handleClose={() => {setIsDialogOpen(false);setSelectedGateway(null)}}
          action={selectedGateway ? "Update" : "Add"}
          gateway={selectedGateway}
        />
        <AlertDialog open={isAlertOpen} handleClose={() => setIsAlertOpen(false)} />
      </div>
    </div>
  );
};
export default GatewayTable;

