import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";
import useRequestStore from "../../stores/useRequestStore";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { updateMessages, selectedRequest } = useRequestStore();

  const sendMessage = async (message) => {
    message = message.trim();

    if (message.length < 1 || message.length > 250) {
      toast.info("Message must be between 1 and 250 characters");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post(`/user/message/${selectedRequest._id}`, {
        message,
      });
      updateMessages(data);
    } catch (error) {
      toast.error(getResponseMsg(error) || "Error sending the message");
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};
export default useSendMessage;
