import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";

const useGetUProperties = () => {
  const [loading, setLoading] = useState(false);

  const getUProperties = async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/preq");

      setLoading(false);
      return response.data;
    } catch (error) {
      toast.error(getResponseMsg(error));
    } finally {
      setLoading(false);
    }

    return null;
  };

  return { loading, getUProperties };
};
export default useGetUProperties;
