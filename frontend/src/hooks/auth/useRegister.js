import { useState } from "react";
import { toast } from "react-toastify";

import { emailPattern, passwordPattern } from "../../constanst";
import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";
import useAuthStore from "../../stores/useAuthStore";

const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthData } = useAuthStore();

  const register = async (formData) => {
    const { firstName, lastName, email, password, passphrase } = formData;

    if (!firstName || !email || !password) {
      toast.warn("All fields are required");
    }

    const name = `${firstName} ${lastName}`.trim();

    if (name.length < 5) {
      toast.warn("Combined name length should be at least 5 characters");
      return;
    }
    if (!emailPattern.test(email)) {
      toast.warn("Invalid email format");
      return;
    }
    if (!passwordPattern.test(password)) {
      toast.warn(
        "Password must be at least 8 characters, contain at least one number and one special character"
      );
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
        passphrase,
      });

      setAuthData(data.userData, data.token);
      toast.success(data.message);
    } catch (error) {
      toast.error(getResponseMsg(error));
    } finally {
      setLoading(false);
    }
  };

  return { loading, register };
};

export default useRegister;
