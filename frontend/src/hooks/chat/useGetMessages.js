import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";
import useRequestStore from "../../stores/useRequestStore";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { selectedRequest, updateRequests } = useRequestStore();

  const fetchMessages = async () => {
    if (!selectedRequest || selectedRequest.fullyloaded) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.get(`/user/prequest/${selectedRequest._id}`);
      updateRequests({
        messages: data.messages,
        _id: selectedRequest._id,
        rent: data.rent,
        fullyloaded: true,
      });
    } catch (error) {
      toast.error(getResponseMsg(error));
    } finally {
      setLoading(false);
    }
  };
  return { loading, fetchMessages };
};
export default useGetMessages;
