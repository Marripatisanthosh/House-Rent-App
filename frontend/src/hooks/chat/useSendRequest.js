import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";
import useRequestStore from "../../stores/useRequestStore";

const useSendRequest = () => {
  const [loading, setLoading] = useState(false);

  const { updateRequests } = useRequestStore();

  const sendRequest = async (propertyId, formData) => {
    if (!validateForm(formData)) {
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post(`/user/prequest/${propertyId}`, formData);
      toast.success(data.message);
      updateRequests(data.newRequest);
    } catch (error) {
      toast.warn(getResponseMsg(error) || "Unable to send request");
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendRequest };
};

function validateForm(formData) {
  if (!formData.age || formData.age < 18) {
    toast.warn("Age must be 18+");
    return false;
  }

  if (!formData.gender) {
    toast.warn("Gender is required");
    return false;
  }

  if (!formData.tenantType) {
    toast.warn("Tenant type is required");
    return false;
  }

  if (!formData.headCount || formData.headCount < 1) {
    toast.warn("Minimum head count is 1");
    return false;
  }

  if (!formData.noOfMonths || formData.noOfMonths < 1) {
    toast.warn("Minimum number of months is 1");
    return false;
  }

  if (formData.headCount > 60) {
    toast.warn("Maximum head count is 60");
    return false;
  }

  if (formData.noOfMonths > 12) {
    toast.warn("Maximum number of months is 12");
    return false;
  }

  if (!formData.enterDate) {
    toast.warn("Enter date is required");
    return false;
  }

  if (formData.message && formData.message.length > 250) {
    toast.warn("Additional message cannot exceed 250 characters");
    return false;
  }

  return true;
}

export default useSendRequest;
