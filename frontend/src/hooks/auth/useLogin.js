import { useState } from "react";
import { toast } from "react-toastify";

import { emailPattern } from "../../constanst";
import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";
import useAuthStore from "../../stores/useAuthStore";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthData } = useAuthStore();

  const login = async (formData) => {
    const { email, password } = formData;
    if (!email || !password) {
      toast.warn("All fields are required");
      return;
    }
    if (!emailPattern.test(email)) {
      toast.warn("Invalid email format");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", formData);

      setAuthData(data.userData, data.token);

      toast.success(data.message);
    } catch (err) {
      toast.error(getResponseMsg(err));
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
