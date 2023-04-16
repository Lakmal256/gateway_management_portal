import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';

const DeleteDeviceDialog = ({ open, handleClose, devices , onSubmit}) => {

    const [id, setId] = useState("");
    useEffect(() => {
        if (devices) {
          setId(devices._id);
        }
      }, [devices]);

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
  
  export default DeleteDeviceDialog;  