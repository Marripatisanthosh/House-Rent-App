import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  Slider,
  Typography,
} from "@mui/material";
import { BedDouble, MapPin, Radius, SearchIcon } from "lucide-react";
import React, { useState } from "react";

import AmenitiesSelect from "../frags/AminitiesSelect";
import PropertyTypeSelect from "../frags/ProptypeSelect";

const minPriceDiff = 2000;
const FilterWidget = ({ filters, setFilters, handleSearch }) => {
  const [isOpen, setOpenDialog] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlRangeChange = (_, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    const value = filters.priceRange;
    let updatedVal;
    if (activeThumb === 0) {
      updatedVal = [Math.min(newValue[0], value[1] - minPriceDiff), value[1]];
    } else {
      updatedVal = [value[0], Math.max(newValue[1], value[0] + minPriceDiff)];
    }

    setFilters({ ...filters, priceRange: updatedVal });
  };

  return (
    <div className="my-1 flex items-center justify-center p-4">
      <div className="mx-auto mb-8 w-full max-w-7xl rounded-lg bg-white p-6 shadow-md">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative mt-4 w-full px-4">
            <Input
              type="text"
              placeholder="Enter location..."
              name="address"
              value={filters.address}
              onChange={handleChange}
              className="w-full pl-10"
            />
            <MapPin
              className="absolute left-6 top-3 h-5 w-5 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>

          <div className="w-full px-4">
            <div className="mb-2 flex items-center gap-2">
              <Radius className="h-5 w-5" />
              <Typography variant="body1">
                {filters.maxDistance}km Radius
              </Typography>
            </div>
            <Slider
              value={filters.maxDistance}
              min={5}
              max={50}
              step={1}
              name="maxDistance"
              onChange={handleChange}
            />
          </div>

          <div className="w-full px-4">
            <Typography variant="body1" className="mb-2">
              ₹{filters.priceRange[0].toLocaleString()}/mo - ₹
              {filters.priceRange[1].toLocaleString()}/mo
            </Typography>
            <Slider
              value={filters.priceRange}
              min={1000}
              max={170000}
              step={1000}
              onChange={handlRangeChange}
            />
          </div>

          <div className="mt-1 flex items-center justify-center space-x-2">
            <BedDouble className="h-5 w-5" />
            <label className="text-sm font-medium">Bedrooms</label>
            <Button
              variant="text"
              size="sm"
              onClick={() =>
                setFilters({
                  ...filters,
                  numberOfBedrooms: Math.max(0, filters.numberOfBedrooms - 1),
                })
              }
            >
              -
            </Button>
            <span className="w-8 text-center">{filters.numberOfBedrooms}</span>
            <Button
              variant="text"
              size="sm"
              onClick={() =>
                setFilters({
                  ...filters,
                  numberOfBedrooms: Math.min(7, filters.numberOfBedrooms + 1),
                })
              }
            >
              +
            </Button>
          </div>

          <div className="w-full px-4">
            <PropertyTypeSelect
              formData={filters}
              handleChange={handleChange}
              useAll={true}
              required={false}
            />
          </div>

          <div className="mt-2 w-full px-4">
            <Button
              variant="outlined"
              onClick={() => setOpenDialog(true)}
              className="w-full justify-start"
            >
              <span className="my-1 h-5 font-medium">
                {filters.amenities.length === 0
                  ? "Choose Amenities"
                  : `${filters.amenities.length} Amenities Selected`}
              </span>
            </Button>
            <Dialog open={isOpen} onClose={() => setOpenDialog(false)}>
              <DialogContent>
                <DialogTitle variant="h6" className="flex items-center gap-2">
                  <Typography
                    variant="inherit"
                    className="flex items-center gap-2"
                  >
                    Select Amenities
                  </Typography>
                </DialogTitle>
                <AmenitiesSelect formData={filters} setFormData={setFilters} />
                <div className="mt-5 flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="text"
                    disabled={filters.amenities.length === 0}
                    onClick={() => setFilters({ ...filters, amenities: [] })}
                  >
                    Clear All
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenDialog(false)}
                  >
                    Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="col-span-full mt-4 flex justify-center">
            <Button
              className="gap-2 px-6 py-2"
              variant="contained"
              onClick={handleSearch}
            >
              <SearchIcon className="h-5 w-5" />
              Search Properties
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterWidget;
