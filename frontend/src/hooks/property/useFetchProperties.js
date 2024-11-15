import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";

const useFetchProperties = () => {
  const [loading, setLoading] = useState(false);

  const fetchProperties = async (filter) => {
    const queryString = new URLSearchParams({
      address: filter.address,
      maxDistance: filter.maxDistance,
      priceRange: filter.priceRange.join(","),
      numberOfBedrooms: filter.numberOfBedrooms,
      amenities: filter.amenities.join(","),
      propertyType: filter.propertyType,
    }).toString();

    setLoading(true);
    try {
      const response = await api.get(`/list/filter?${queryString}`);

      if (response.data.message.startsWith("Ple")) {
        toast.warn(response.data.message);
      }
      setLoading(false);
      return response.data.properties;
    } catch (error) {
      toast.error(getResponseMsg(error));
    } finally {
      setLoading(false);
    }

    return [];
  };

  return { loading, fetchProperties };
};
export default useFetchProperties;
