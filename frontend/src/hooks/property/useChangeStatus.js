import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";

const useChangeStatus = () => {
  const [loading, setLoading] = useState(false);

  const changeStatus = async (propertyId, status) => {
    setLoading(true);
    try {
      const { data } = await api.put(`/owner/property/status/${propertyId}`, {
        status,
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(getResponseMsg(error) || "Unable to update status");
    } finally {
      setLoading(false);
    }
  };

  return { loading, changeStatus };
};
export default useChangeStatus;
