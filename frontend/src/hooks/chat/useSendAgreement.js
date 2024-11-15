import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { calculateDays, getResponseMsg } from "../../services/utils";
import useRequestStore from "../../stores/useRequestStore";

const useSendAgreement = () => {
  const [loading, setLoading] = useState(false);
  const { updateMessages, selectedRequest } = useRequestStore();

  const sendAgreement = async (agreementData) => {
    if (!validateAgreementData(agreementData)) {
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post(
        `/owner/agreement/${selectedRequest._id}`,
        agreementData
      );
      updateMessages(data);
    } catch (error) {
      toast.error(getResponseMsg(error) || "Unable to send the agreement");
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendAgreement };
};

const validateAgreementData = (agreementData) => {
  if (!agreementData.startd || !agreementData.endd || !agreementData.rent) {
    toast.warn("Please fill in all required fields");
    return false;
  }

  if (calculateDays(agreementData.startd, agreementData.endd) < 15) {
    toast.info("Duration must be at least 15 days");
    return false;
  }
  return true;
};

export default useSendAgreement;
