import { Button } from "@mui/material";

import { availableAmenities } from "../../constanst";

const AmenitiesSelect = ({ formData, setFormData }) => {
  const handleToggle = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {availableAmenities.map((amenity) => (
        <Button
          key={amenity}
          type="button"
          variant={
            formData.amenities.includes(amenity) ? "contained" : "outline"
          }
          onClick={() => handleToggle(amenity)}
          className="h-8"
        >
          {amenity}
        </Button>
      ))}
    </div>
  );
};

export default AmenitiesSelect;
