import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";

const useApproveProperty = () => {
  const [loading, setLoading] = useState(false);

  const approveProperty = async (propertyId, flag) => {
    setLoading(true);
    let retval = false;
    try {
      const response = await api.put(`/admin/preq/${propertyId}`, { flag });
      toast.success(response.data.message);
      retval = true;
    } catch (error) {
      toast.error(getResponseMsg(error));
    } finally {
      setLoading(false);
    }

    return retval;
  };

  return { loading, approveProperty };
};
export default useApproveProperty;
