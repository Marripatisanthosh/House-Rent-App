import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";

const useEditPropertyDetails = () => {
  const [loading, setLoading] = useState(false);

  const editPropertyDetails = async (
    propertyId,
    editData,
    imageFiles,
    removeImages
  ) => {
    const form = new FormData();
    let retval = false;

    Object.keys(editData).forEach((key) => {
      if (editData[key] !== null && editData[key] !== "") {
        if (Array.isArray(editData[key])) {
          form.append(key, JSON.stringify(editData[key]));
        } else {
          form.append(key, editData[key]);
        }
      }
    });

    removeImages.forEach((ufile) => {
      form.append("removeImages", ufile);
    });

    imageFiles.forEach((file) => {
      if (typeof file === "string") return;
      form.append("images", file);
    });

    setLoading(true);
    try {
      const { data } = await api.put(`/owner/property/${propertyId}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(data.message);
      retval = true;
    } catch (error) {
      toast.error(getResponseMsg(error) || "Failed to update property");
    } finally {
      setLoading(false);
    }
    return retval;
  };

  return { loading, editPropertyDetails };
};

export default useEditPropertyDetails;
