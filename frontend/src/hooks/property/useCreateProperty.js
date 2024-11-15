import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";

const useCreateProperty = () => {
  const [loading, setLoading] = useState(false);

  const createProperty = async (formData, imageFiles) => {
    const address =
      `${formData.street}, ${formData.city}, ${formData.state}, ${formData.country}`.trim();

    const form = new FormData();
    let retval = false;
    const noNeed = ["street", "city", "state", "country"];

    Object.keys(formData).forEach((key) => {
      if (
        formData[key] !== null &&
        formData[key] !== "" &&
        !noNeed.includes(key)
      ) {
        if (Array.isArray(formData[key])) {
          form.append(key, JSON.stringify(formData[key]));
        } else {
          form.append(key, formData[key]);
        }
      }
    });

    form.append("address", address);
    imageFiles.forEach((file) => {
      form.append("images", file);
    });

    setLoading(true);
    try {
      const response = await api.post("/owner/property", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data.message);
      retval = true;
    } catch (error) {
      toast.error(getResponseMsg(error) || "Failed to Add property");
    } finally {
      setLoading(false);
    }
    return retval;
  };

  return { loading, createProperty };
};
export default useCreateProperty;
