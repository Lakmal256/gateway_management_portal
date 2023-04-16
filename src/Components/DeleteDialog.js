import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import api from '../api';

const DeleteDialog = ({ open, handleClose, gateway }) => {
    const [id, setId] = useState("");
    useEffect(() => {
        if (gateway) {
          setId(gateway._id);
        }
      }, [gateway]);

      const handleDeleteGateway = (id) => {
        api.delete(`/gateway/${id}`)
          .then((res) => {
            console.log("res", res);
          })
          .catch((err) => {
            console.log("error", err);
          });
      };
  
    return (
      <div>
        <Dialog classes={{ paper: "cu_form" }} open={open} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">{"Are You Sure?"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={() => handleDeleteGateway(id)}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  
  export default DeleteDialog;  