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
import DeleteGatewayDialog from "../Components/DeleteGatewayDialog";
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
        console.log('res', res)
        setGateways(res.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });

  };

  const handleAddGateway = (gateway) => {
    setIsDialogOpen(true);
    setSelectedGateway(null);
    api.post("/gateway", gateway)
      .then((res) => {
        setGateways(res.data.data);
        setIsDialogOpen(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const handleEditGateway = (gateway) => {
    setSelectedGateway(gateway);
    setIsDialogOpen(true);
    api.put("/gateway", gateway)
      .then((res) => {
        setGateways(res.data.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const handleSubmit = (id, serialNumber, gateName, ipAddress, action,) => {
    const payload = action === "Add" ? {
      serialNumber: serialNumber,
      name: gateName,
      ipv4Address: ipAddress,
    } :
      {
        name: gateName,
      }
    const url = action === "Add" ? "/gateway" : `/gateway/${id}`
    const method = action === "Add" ? api.post : api.put

    method(url, payload)
      .then((res) => {
        setGateways(res.data.data);
        setIsDialogOpen(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const handleDelete = (id) => {
    setIsAlertOpen(true);
    api.delete(`/gateway/${id}`)
      .then((res) => {
        setGateways(res.data.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div>
      <div><Header /></div>
      <div className="gateway_table_main">
        <div className="label">Gateways</div>
        <div>
          <button
            className="add_gateway_button"
            onClick={handleAddGateway}
          >
            + Add Gateway
          </button>
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
                        className="device_view_button"
                        onClick={() => Navigate(row.serialNumber)}
                      >
                        <AdUnits />
                      </button>
                      <button
                        className="gateway_edit_button"
                        onClick={() => handleEditGateway(row)}
                      >
                        <Edit />
                      </button>
                      <button
                        className="gateway_delete_button"
                        onClick={() => {setIsAlertOpen(true); handleDelete(row._id)} }
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
          handleClose={() => { setIsDialogOpen(false); setSelectedGateway(null) }}
          action={selectedGateway ? "Update" : "Add"}
          gateway={selectedGateway}
          onSubmit={handleSubmit}
        />
        <DeleteGatewayDialog
          open={isAlertOpen}
          handleClose={() => setIsAlertOpen(false)}
          gateway={selectedGateway}
          onSubmit={handleDelete}
        />
      </div>
    </div>
  );
};
export default GatewayTable;

