import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";
import useAuthStore from "../../stores/useAuthStore";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { removeAuthData } = useAuthStore();

  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/auth/logout");
    } catch (error) {
      toast.error(getResponseMsg(error));
    } finally {
      removeAuthData();
      setLoading(false);
    }

    window.location.href = "/";
  };

  return { loading, logout };
};
export default useLogout;
