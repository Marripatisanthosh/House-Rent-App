import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";

const useRespondToORequest = () => {
  const [loading, setLoading] = useState(false);

  const respontToORequest = async (requestId, flag) => {
    setLoading(true);
    let retval = false;
    try {
      const response = await api.put(`/admin/oreq/${requestId}`, { flag });
      toast.success(response.data.message);
      retval = true;
    } catch (error) {
      toast.error(getResponseMsg(error));
    } finally {
      setLoading(false);
    }

    return retval;
  };

  return { loading, respontToORequest };
};
export default useRespondToORequest;
