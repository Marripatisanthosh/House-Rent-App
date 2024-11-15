import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useDeleteProperty from "../../hooks/property/useDeleteProperty";
import PasswordInput from "../frags/PasswordInput";

const DeleteProperty = ({ propertyId, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loading, deleteProperty } = useDeleteProperty();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const retval = await deleteProperty(propertyId, password);

    if (retval) {
      setIsOpen(false);
      navigate("/properties");
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        startIcon={<Trash />}
        onClick={() => setIsOpen(true)}
      >
        Delete
      </Button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle color="error">Delete Property</DialogTitle>
        <DialogContent>
          <Typography>
            This action cannot be undone. This will permanently delete the
            property "{title}" and remove all associated data.
          </Typography>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsOpen(false);
              setPassword("");
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="error"
            disabled={!password.trim() || loading}
          >
            Delete Property
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DeleteProperty;
