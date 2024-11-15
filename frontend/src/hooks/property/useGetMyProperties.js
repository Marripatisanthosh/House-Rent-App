import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";

const useGetMyProperties = () => {
  const [loading, setLoading] = useState(false);

  const getProperties = async () => {
    setLoading(true);
    try {
      const response = await api.get("/owner/property");

      setLoading(false);
      return response.data.properties;
    } catch (error) {
      toast.error(getResponseMsg(error));
    } finally {
      setLoading(false);
    }

    return null;
  };

  return { loading, getProperties };
};
export default useGetMyProperties;
