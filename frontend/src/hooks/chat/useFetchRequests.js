import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";
import useRequestStore from "../../stores/useRequestStore";

const useFetchRequests = () => {
  const [loading, setLoading] = useState(false);
  const { setRequests } = useRequestStore();

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/user/prequest`);
      setRequests(data.requests);
    } catch (error) {
      toast.error(getResponseMsg(error));
    } finally {
      setLoading(false);
    }
  };
  return { loading, fetchRequests };
};
export default useFetchRequests;
