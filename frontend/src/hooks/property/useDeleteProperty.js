import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";

const useDeleteProperty = () => {
  const [loading, setLoading] = useState(false);

  const deleteProperty = async (propertyId, password) => {
    let retval = false;
    if (!password.trim()) {
      toast.warn("Please enter your password to delete the property");
      return retval;
    }

    setLoading(true);
    try {
      const { data } = await api.delete(`/owner/property/${propertyId}`, {
        password,
      });

      toast.success(data.message);
      retval = true;
    } catch (error) {
      toast.error(getResponseMsg(error) || "Failed to delete property");
    } finally {
      setLoading(false);
    }

    return retval;
  };

  return { loading, deleteProperty };
};
export default useDeleteProperty;
