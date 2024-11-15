import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import { ScrollText } from "lucide-react";
import React, { useState } from "react";

import useSendAgreement from "../../hooks/chat/useSendAgreement";
import { getDate } from "../../services/utils";
import useRequestStore from "../../stores/useRequestStore";

const formatDateForInput = (date) => {
  return date.toISOString().split("T")[0];
};

const SendAgreement = () => {
  const [open, setOpen] = useState(false);

  const { loading, sendAgreement } = useSendAgreement();

  const { selectedRequest } = useRequestStore();

  const [agreementData, setAgreementData] = useState({
    startd: formatDateForInput(new Date()),
    endd: formatDateForInput(getDate(selectedRequest.details.noOfMonths * 30)),
    rent: selectedRequest.rent,
    optMessage: "",
  });

  if (selectedRequest.status !== "accepted") return <></>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgreementData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendAgreement(agreementData);
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        className="flex items-center"
        variant="contained"
        size="small"
      >
        <p className="p-1 text-xs"> Send Agreement </p>
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className="flex items-center gap-3 text-lg font-semibold">
          <ScrollText />
          Agreement
        </DialogTitle>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <InputLabel className="text-sm font-medium">
                Start Date
              </InputLabel>
              <Input
                type="date"
                name="startd"
                value={agreementData.startd}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>

            <div className="space-y-2">
              <InputLabel className="text-sm font-medium">End Date</InputLabel>
              <Input
                type="date"
                name="endd"
                value={agreementData.endd}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>

            <div className="space-y-2">
              <InputLabel className="text-sm font-medium">
                Rent Amount
              </InputLabel>
              <Input
                type="number"
                name="rent"
                value={agreementData.rent}
                onChange={handleChange}
                inputProps={{
                  min: 1000,
                  step: 1000,
                  max: 170000,
                }}
                className="w-full rounded-md border border-gray-300 p-2"
                placeholder="Enter rent amount"
                required
              />
            </div>

            <div className="space-y-2">
              <InputLabel className="text-sm font-medium">
                Message (Optional)
              </InputLabel>
              <TextField
                value={agreementData.optMessage}
                name="optMessage"
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2"
                placeholder="Enter message"
                rows={3}
              />
            </div>

            <DialogActions className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Sending..." : "Send"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SendAgreement;
