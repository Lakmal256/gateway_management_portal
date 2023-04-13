import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = ({ open, handleClose}) => {
  return (
    <div>
      <Dialog
        classes={{ paper: "cu_form" }} open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure ?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleClose} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog;