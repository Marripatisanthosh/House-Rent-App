import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";
import useRequestStore from "../../stores/useRequestStore";

const UseRespondToRequest = () => {
  const [loading, setLoading] = useState(false);
  const { updateRequests, selectedRequest } = useRequestStore();

  const respondToRequest = async (flag) => {
    setLoading(true);
    try {
      const { data } = await api.post(`/owner/respond/${selectedRequest._id}`, {
        flag,
      });
      updateRequests(data.request);
    } catch (error) {
      toast.error(getResponseMsg(error) || "Error Responding to request");
    } finally {
      setLoading(false);
    }
  };

  return { loading, respondToRequest };
};
export default UseRespondToRequest;
