import { Button } from "@mui/material";
import { Check, X } from "lucide-react";

import UseRespondToRequest from "../../hooks/chat/useRespondToRequest";

const AcceptOrDecline = () => {
  const { loading, respondToRequest } = UseRespondToRequest();
  const handleChange = async (flag) => {
    await respondToRequest(flag);
  };

  return (
    <div className="flex gap-4">
      <Button
        variant="contained"
        className="bg-red flex items-center gap-2"
        onClick={() => handleChange("accepted")}
        disabled={loading}
      >
        <Check size={18} />
        Accept
      </Button>
      <Button
        variant="contained"
        className="flex items-center gap-2"
        onClick={() => handleChange("rejected")}
        disabled={loading}
      >
        <X size={18} />
        Decline
      </Button>
    </div>
  );
};

export default AcceptOrDecline;
