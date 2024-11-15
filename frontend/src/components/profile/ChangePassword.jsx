import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";

import useChangePassword from "../../hooks/user/useChangePassword";
import PasswordInput from "../frags/PasswordInput";

const ChangePassword = () => {
  const [openPassword, setOpenPassword] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const { loading, changePassword } = useChangePassword();

  const handlClose = () => {
    setPasswords({ currentPassword: "", newPassword: "" });
    setOpenPassword(false);
  };

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const retval = await changePassword(passwords);

    if (retval) handlClose();
  };

  return (
    <>
      <Button onClick={() => setOpenPassword(true)} variant="outlined">
        Change Password
      </Button>

      <Dialog open={openPassword} onClose={() => setOpenPassword(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <PasswordInput
              value={passwords.currentPassword}
              name="currentPassword"
              onChange={handleChange}
            />
            <PasswordInput
              value={passwords.newPassword}
              name="newPassword"
              onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPassword(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangePassword;
