import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';

const DeleteGatewayDialog = ({ open, handleClose, gateway , onSubmit}) => {

    const [id, setId] = useState("");
    useEffect(() => {
        if (gateway) {
          setId(gateway._id);
        }
      }, [gateway]);

      const handleDelete = () => {
        onSubmit(id);
        handleClose();
      };
        return (
      <div>
        <Dialog classes={{ paper: "create_form" }} open={open} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">{"Are You Sure?"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleDelete}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  
  export default DeleteGatewayDialog;  