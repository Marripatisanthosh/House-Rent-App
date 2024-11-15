import { Button, Input, InputLabel, TextField } from "@mui/material";
import { Bed, IndianRupee, MapPin, Upload, XIcon } from "lucide-react";
import { useState } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";

import { getMediaPath } from "../services/utils";
import AmenitiesSelect from "./frags/AminitiesSelect";
import PropertyTypeSelect from "./frags/ProptypeSelect";

const AddressInput = ({ formData, setFormData }) => {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <InputLabel htmlFor="street">Street Address</InputLabel>
        <Input
          id="street"
          value={formData.street}
          required
          onChange={(e) => handleInputChange("street", e.target.value)}
          fullWidth
        />
      </div>

      <div>
        <InputLabel htmlFor="country">Country</InputLabel>
        <CountrySelect
          id="country"
          onChange={(e) => {
            setCountryid(e.id);
            handleInputChange("country", e.name);
          }}
          placeHolder="Select Country"
          required
        />
      </div>
      <div>
        <InputLabel htmlFor="state">State</InputLabel>
        <StateSelect
          id="state"
          countryid={countryid}
          onChange={(e) => {
            setstateid(e.id);

            handleInputChange("state", e.name);
          }}
          placeHolder="Select State"
          required
        />
      </div>

      <div>
        <InputLabel htmlFor="city">City</InputLabel>
        <CitySelect
          countryid={countryid}
          stateid={stateid}
          id="city"
          value={formData.city}
          onChange={(e) => {
            handleInputChange("city", e.name);
          }}
          required
        />
      </div>
    </div>
  );
};

const DetailsInput = ({ formData, setFormData, disableDocIn }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div>
        <InputLabel htmlFor="title">Property Title</InputLabel>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          fullWidth
        />
      </div>

      <div>
        <InputLabel htmlFor="description">Description</InputLabel>
        <TextField
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          fullWidth
          multiline
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <InputLabel htmlFor="rent">Monthly Rent</InputLabel>
          <div className="relative">
            <IndianRupee className="absolute left-1 top-1 h-5 w-5 text-gray-400" />
            <Input
              id="rent"
              name="rent"
              type="number"
              inputProps={{
                min: 1000,
                step: 1000,
                max: 170000,
              }}
              value={formData.rent}
              onChange={handleInputChange}
              className="pl-10"
              fullWidth
              required
            />
          </div>
        </div>

        <div>
          <PropertyTypeSelect
            formData={formData}
            handleChange={handleInputChange}
          />
        </div>

        <div>
          <InputLabel htmlFor="numberOfBedrooms">Bedrooms</InputLabel>
          <div className="relative">
            <Bed className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="numberOfBedrooms"
              name="numberOfBedrooms"
              type="number"
              inputProps={{
                min: 0,
                step: 1,
                max: 7,
              }}
              value={formData.numberOfBedrooms}
              onChange={handleInputChange}
              className="pl-10"
              fullWidth
              required
            />
          </div>
        </div>

        <div className="col-span-2 mt-3">
          <TextField
            name="legalDocumentId"
            value={formData.legalDocumentId}
            onChange={handleInputChange}
            className="pl-10"
            fullWidth
            label="Legal Document ID"
            disabled={disableDocIn}
          />
        </div>
      </div>
    </>
  );
};

const ImagesSelect = ({ imageFiles, setImageFiles, setRemoveImages }) => {
  const [imagePreviewUrls, setImagePreviewUrls] = useState(
    imageFiles.map((file) => {
      return getMediaPath(file);
    })
  );

  const initImageFIles = [...imageFiles];

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    if (setRemoveImages && initImageFIles.includes(imageFiles[index])) {
      setRemoveImages((remImgs) => [...remImgs, imageFiles[index]]);
    }

    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {imagePreviewUrls.map((url, index) => (
        <div key={index} className="group relative">
          <img
            src={url}
            alt={`Preview ${index + 1}`}
            className="h-32 w-full rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={() => removeImage(index)}
            className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-80 transition-opacity group-hover:opacity-100"
          >
            <XIcon className="h-3 w-3" />
          </button>
        </div>
      ))}
      <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 transition-colors hover:border-gray-400">
        <Upload className="h-8 w-8 text-gray-400" />
        <span className="mt-2 text-sm text-gray-500">Upload Images</span>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

const PropDetailsForm = ({
  formData,
  setFormData,
  imageFiles,
  setImageFiles,
  handleSubmit,
  loading,

  onClose,
  enableAF = false,
  setRemoveImages = null,
  disableDocIn = false,

  submitMsg = "Add Property",
  submiting = "Adding...",
}) => {
  return (
    <form onSubmit={handleSubmit} className="gap-6 space-y-6">
      {enableAF && (
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <MapPin className="h-5 w-5" />
            Property Location
          </h3>
          <AddressInput formData={formData} setFormData={setFormData} />
        </div>
      )}
      <div className="space-y-4">
        <h3 className={`${enableAF ? "mt-10" : ""} text-lg font-semibold`}>
          Property Details
        </h3>
        <div className="space-y-4">
          <DetailsInput
            formData={formData}
            setFormData={setFormData}
            disableDocIn={disableDocIn}
          />
        </div>
      </div>

      <div className="space-y-4">
        <InputLabel className="mt-10">Amenities</InputLabel>
        <AmenitiesSelect formData={formData} setFormData={setFormData} />
      </div>

      <div className="space-y-4">
        <InputLabel className="mt-10">Property Images</InputLabel>
        <ImagesSelect
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
          setRemoveImages={setRemoveImages}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? submiting : submitMsg}
        </Button>
      </div>
    </form>
  );
};

export default PropDetailsForm;
