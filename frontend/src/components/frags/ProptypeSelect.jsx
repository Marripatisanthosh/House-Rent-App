import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { availablePropertyTypes } from "../../constanst";

export const PropertyTypeSelect = ({
  formData,
  handleChange,
  name = "propertyType",
  useAll = false,
  required = true,
}) => {
  return (
    <FormControl className="w-full" required={required}>
      <InputLabel id="property-type-label">Property Type</InputLabel>
      <Select
        label="Property Type"
        name={name}
        value={formData.propertyType}
        onChange={handleChange}
        displayEmpty={true}
        className="w-full"
      >
        {useAll && (
          <MenuItem value="">{formData.propertyType && <em>All</em>}</MenuItem>
        )}
        {availablePropertyTypes.map((type) => (
          <MenuItem key={type} value={type} className="capitalize">
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PropertyTypeSelect;
