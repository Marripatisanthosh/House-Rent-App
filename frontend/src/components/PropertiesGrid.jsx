import { Card, CardContent, Typography } from "@mui/material";
import { Bed, ChevronRight, IndianRupee, MapPin } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

import ImageSlider from "./frags/ImageSlider";

const PropertiesGrid = ({ properties, title = "Available Properties" }) => {
  return (
    <div className="col-span-full">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">{title}</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => (
          <NavLink to={`/listing/${property._id}`} key={property._id}>
            <Card className="group mx-auto h-[520px] w-full max-w-[400px] overflow-hidden rounded-full shadow-md transition-shadow duration-300 hover:shadow-lg">
              <div className="flex h-full flex-col">
                <div className="relative mt-4 aspect-[4/3] overflow-hidden">
                  <ImageSlider
                    images={property.images}
                    title={property.title}
                  />
                </div>

                <CardContent className="flex flex-grow flex-col p-4">
                  <div className="mb-3">
                    <h2 className="mb-1 line-clamp-1 text-lg font-semibold capitalize text-gray-800 transition-colors group-hover:text-blue-600">
                      {property.title}
                    </h2>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="mr-1 h-4 w-4 flex-shrink-0" />
                      <p className="line-clamp-1 text-sm capitalize">
                        {property.location.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {property.numberOfBedrooms > 0 && (
                      <span className="flex items-center rounded-full bg-gray-100 px-2 py-1 font-medium text-gray-600">
                        <Bed className="mr-1 h-4 w-4" />
                        <span className="text-sm">
                          {property.numberOfBedrooms}
                        </span>
                      </span>
                    )}
                    {property.amenities.slice(0, 4).map((amenity, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-gray-100 px-2 py-1 font-medium uppercase text-gray-600 transition-colors hover:bg-gray-200"
                      >
                        {amenity}
                      </span>
                    ))}
                    {property.amenities.length > 4 && (
                      <span className="flex items-center rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-600 transition-colors hover:bg-gray-200">
                        +{property.amenities.length - 4}
                        <ChevronRight className="ml-0.5 h-3 w-3" />
                      </span>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-1 pt-5 text-gray-700">
                    <span className="flex items-center">
                      <IndianRupee className="h-4 w-4" />
                      <Typography
                        variant="body1"
                        component="span"
                        className="ml-1"
                      >
                        {property.rent.toLocaleString()} /mo
                      </Typography>
                    </span>
                    <span className="ml-2 rounded-full bg-gray-500 px-3 py-0.5 text-xs font-medium uppercase text-white">
                      {property.propertyType}
                    </span>
                  </div>
                </CardContent>
              </div>
            </Card>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default PropertiesGrid;
