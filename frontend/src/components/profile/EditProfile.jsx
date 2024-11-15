import {
  Avatar,
  Button,
  Card,
  CardContent,
  Input,
  InputLabel,
} from "@mui/material";
import { Check, Pencil, X } from "lucide-react";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";

import useEditProfile from "../../hooks/user/useEditProfile";
import { getMediaPath } from "../../services/utils";

const FormField = ({ label, children, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    <InputLabel className="text-sm font-medium text-gray-500">
      {label}
    </InputLabel>
    {children}
  </div>
);

const EditProfile = ({ userData, onUpdate, setIsEditing }) => {
  const [formData, setFormData] = useState({
    username: userData.username || "",
    contactNumber: userData.contactNumber || "",
    name: userData.name || "",
    legalVerificationID: userData.legalVerificationID || "",
    profilePicture: null,
  });

  const [imagePreview, setImagePreview] = useState(
    getMediaPath(userData.profilePicture)
  );

  const disableVerIn = !!userData.legalVerificationID;
  const { loading, editProfile } = useEditProfile();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const retval = await editProfile(formData);
    if (retval) onUpdate(retval);
  };

  return (
    <Card className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <CardContent className="mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar
                src={imagePreview}
                alt={userData.username}
                sx={{ width: 128, height: 128 }}
              />

              <label
                htmlFor="profile-upload"
                className="absolute -bottom-1 -right-1 cursor-pointer rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-50"
              >
                <Pencil className="h-4 w-4 text-gray-600" />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="ml-10 grid grid-cols-1 items-center">
            <div className="space-y-4">
              <FormField label="Your Name">
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full"
                  minLength={5}
                  placeholder="Enter your full name"
                />
              </FormField>

              <FormField label="Username">
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full"
                  minLength={5}
                  placeholder="Enter your username"
                />
              </FormField>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <FormField label="Contact Number">
                <div className="phone-input-container">
                  <PhoneInput
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={(___, _, __, formattedValue) =>
                      setFormData((prev) => ({
                        ...prev,
                        contactNumber: formattedValue,
                      }))
                    }
                    isValid={(value, country) => {
                      if (
                        country &&
                        value.length - country.dialCode.length !== 10
                      ) {
                        return false;
                      } else if (value.match(/12345/)) {
                        return "Invalid value: " + value + ", " + country.name;
                      } else if (value.match(/1234/)) {
                        return false;
                      } else {
                        return true;
                      }
                    }}
                    containerClass="w-full"
                    inputClass="w-full"
                  />
                </div>
              </FormField>

              <FormField label="Legal Verification ID">
                <Input
                  name="legalVerificationID"
                  value={formData.legalVerificationID}
                  onChange={handleChange}
                  disabled={disableVerIn}
                  placeholder={"Enter verification ID"}
                />
              </FormField>
            </div>
          </div>

          <div className="flex flex-col-reverse justify-end gap-4 pt-4 md:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(false)}
              disabled={loading}
              className="w-full md:w-32"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="w-full md:w-32">
              <Check className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditProfile;
