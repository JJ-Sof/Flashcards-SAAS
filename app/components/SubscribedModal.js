import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const SubscribedModal = ({ open, onClose, message, onCloseButtonLabel }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          {message}
        </Typography>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          {onCloseButtonLabel}
        </Button>
      </Box>
    </Modal>
  );
};

export default SubscribedModal;
