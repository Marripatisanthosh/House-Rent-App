import { Button } from "@mui/material";

import useSendOwnerRequest from "../../hooks/user/useSendOwnerRequest";

const OwnerRequestButton = () => {
  const { loading, sendOwnerRequest } = useSendOwnerRequest();

  return (
    <Button onClick={sendOwnerRequest} variant="contained" disabled={loading}>
      Request to be Owner
    </Button>
  );
};

export default OwnerRequestButton;
