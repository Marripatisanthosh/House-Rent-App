import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";

const useGetProperty = () => {
  const [loading, setLoading] = useState(false);

  const getProperty = async (propertyId) => {
    setLoading(true);
    try {
      const response = await api.get(`/list/${propertyId}`);
      setLoading(false);
      return response.data.property;
    } catch (error) {
      toast.error(getResponseMsg(error));
    } finally {
      setLoading(false);
    }
    return null;
  };

  return { loading, getProperty };
};
export default useGetProperty;
