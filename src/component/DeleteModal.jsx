import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { deleteUser } from "../Redux/userSlice";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ id }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(deleteUser(id));
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} className="button" variant="contained">
        delete
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Delete</DialogTitle>
        <DialogContent
          style={{
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
          }}
        >
          <DialogContentText id="alert-dialog-slide-description">
            Are sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            style={{
              background: "#616161",
              color: "white",
              textTransform: "none",
            }}
            onClick={()=>setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            style={{
              background: "#F1453D",
              color: "white",
              textTransform: "none",
            }}
            variant="contained"
            onClick={handleClose}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
