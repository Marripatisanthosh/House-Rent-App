import { Button, InputAdornment, MenuItem, TextField } from "@mui/material";
import { Clock, MessageSquare, Users } from "lucide-react";
import React, { useState } from "react";

import { genderOptions, tenantTypes } from "../../constanst";
import useSendRequest from "../../hooks/chat/useSendRequest";

const RequestForm = ({ propertyId }) => {
  const [formData, setFormData] = useState({
    age: 18,
    gender: "",
    tenantType: "",
    headCount: 1,
    noOfMonths: 1,
    enterDate: "",
    message: "",
  });

  const { loading, sendRequest } = useSendRequest();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest(propertyId, formData);
  };

  const inputClass =
    "text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="mt-4 p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          <TextField
            label="Age"
            name="age"
            type="number"
            variant="outlined"
            size="small"
            value={formData.age}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 18, max: 80 } }}
            className={inputClass}
            required
          />

          <TextField
            select
            label="Gender"
            name="gender"
            variant="outlined"
            size="small"
            value={formData.gender}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <MenuItem value="">Select</MenuItem>
            {genderOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Tenant Type"
            name="tenantType"
            variant="outlined"
            size="small"
            value={formData.tenantType}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Users className="text-gray-500" />
                </InputAdornment>
              ),
            }}
            className={inputClass}
            required
          >
            <MenuItem value="" disabled>
              Select
            </MenuItem>
            {tenantTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Head Count"
            name="headCount"
            type="number"
            variant="outlined"
            size="small"
            value={formData.headCount}
            onChange={handleChange}
            InputProps={{
              inputProps: { min: 1 },
              startAdornment: (
                <InputAdornment position="start">
                  <Users className="text-gray-500" />
                </InputAdornment>
              ),
            }}
            className={inputClass}
            required
          />

          <TextField
            label="Months"
            name="noOfMonths"
            type="number"
            variant="outlined"
            size="small"
            value={formData.noOfMonths}
            onChange={handleChange}
            InputProps={{
              inputProps: { min: 1 },
              startAdornment: (
                <InputAdornment position="start">
                  <Clock className="text-gray-500" />
                </InputAdornment>
              ),
            }}
            className={inputClass}
            required
          />

          <TextField
            label="Join Date"
            name="enterDate"
            type="date"
            variant="outlined"
            size="small"
            value={formData.enterDate}
            onChange={handleChange}
            className={inputClass}
            InputLabelProps={{ shrink: true }}
            required
          />
        </div>

        <TextField
          label="Message (Optional)"
          name="message"
          variant="outlined"
          size="small"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={2}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MessageSquare className="text-gray-500" />
              </InputAdornment>
            ),
          }}
          className={inputClass}
          fullWidth
        />

        <div className="mt-4 flex justify-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="text-white"
            disabled={loading}
          >
            Send Request
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
