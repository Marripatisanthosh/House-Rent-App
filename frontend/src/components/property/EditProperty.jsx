import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Edit, Pencil } from "lucide-react";
import React, { useState } from "react";

import useEditPropertyDetails from "../../hooks/property/useEditDetails";
import PropDetailsForm from "../PropDetailsForm";

const EditProperty = ({ property, onSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [imageFiles, setImageFiles] = useState(property.images);
  const [removeImages, setRemoveImages] = useState([]);

  const { loading, editPropertyDetails } = useEditPropertyDetails();

  const disableDocIn = !!property.legalDocumentId;

  const [editForm, setFormData] = useState({
    title: property.title,
    description: property.description,
    amenities: property.amenities,
    rent: property.rent,
    propertyType: property.propertyType,
    numberOfBedrooms: property.numberOfBedrooms,
    legalDocumentId: property.legalDocumentId,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const retval = await editPropertyDetails(
      property._id,
      editForm,
      imageFiles,
      removeImages
    );
    if (retval) {
      setIsEditing(false);
      await onSuccess();
    }
  };

  return (
    <>
      <Button
        variant="contained"
        className="flex items-center gap-2"
        onClick={() => setIsEditing(true)}
      >
        <Edit className="h-4 w-4" />
        Edit
      </Button>

      <Dialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        className="mx-auto w-full max-w-full"
        fullWidth
        maxWidth={false}
        sx={{
          "& .MuiDialog-paper": {
            width: "90%",
            maxWidth: "1200px",
          },
        }}
      >
        <DialogContent>
          <DialogTitle sx={{ ml: -3 }} variant="h6" className="mb-2">
            <Typography variant="inherit" className="flex items-center gap-2">
              <Pencil className="h-6 w-6" />
              Edit Property
            </Typography>
          </DialogTitle>

          <PropDetailsForm
            formData={editForm}
            setFormData={setFormData}
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            setRemoveImages={setRemoveImages}
            handleSubmit={handleSubmit}
            enableAF={false}
            loading={loading}
            disableDocIn={disableDocIn}
            onClose={() => setIsEditing(false)}
            submitMsg="Update Property"
            submiting="Updating..."
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProperty;
