import { MenuItem, Select } from "@mui/material";

import { getStatusColor } from "../../constanst";
import useChangeStatus from "../../hooks/property/useChangeStatus";

const ChangeStatus = ({ property, onSuccess }) => {
  const { status, isApproved } = property;
  const propertyId = property._id;

  const unModStat = !(status.startsWith("ava") || status.startsWith("unl"));
  const { loading, changeStatus } = useChangeStatus();

  const handleChange = async (e) => {
    await changeStatus(propertyId, e.target.value);
    await onSuccess();
  };
  return (
    <>
      <Select
        value={status}
        onChange={handleChange}
        className={`rounded ${getStatusColor(status)}`}
        disabled={!isApproved || loading}
      >
        {!isApproved || unModStat ? (
          <MenuItem value={status} disabled>
            <p className="capitalize">{status}</p>
          </MenuItem>
        ) : null}

        <MenuItem value="available">Available</MenuItem>
        <MenuItem value="unlisted">Unlist</MenuItem>
      </Select>
    </>
  );
};

export default ChangeStatus;
