import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";
import useRequestStore from "../../stores/useRequestStore";

const useRespondToAgreement = () => {
  const [loading, setLoading] = useState(false);

  const { updateRequests, selectedRequest } = useRequestStore();

  const respondToAgreement = async (agreementData) => {
    setLoading(true);
    try {
      const { data } = await api.post(
        `/user/respond/${selectedRequest._id}`,
        agreementData
      );

      updateRequests(data.request);
    } catch (error) {
      toast.error(getResponseMsg(error));
    } finally {
      setLoading(false);
    }
  };

  return { loading, respondToAgreement };
};
export default useRespondToAgreement;
