import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";

const useGetORequests = () => {
  const [loading, setLoading] = useState(false);

  const getORequests = async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/oreq");

      setLoading(false);
      return response.data;
    } catch (error) {
      toast.error(getResponseMsg(error));
    } finally {
      setLoading(false);
    }

    return null;
  };

  return { loading, getORequests };
};
export default useGetORequests;
