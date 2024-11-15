import { Card, CardContent } from "@mui/material";
import { Bed, BellPlus, Clock, IndianRupee, Mails } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import {
  getPrettyDate,
  getPrettyDateWithTime,
  getStatusColor,
} from "../../constanst";
import useRequestStore from "../../stores/useRequestStore";
import ImageSlider from "../frags/ImageSlider";

const DetailedInfoCard = ({ property }) => {
  const { getRequestsCount, modifiedSwitch } = useRequestStore();

  const [reqCount, setReqCount] = useState(0);
  const [newMsgCount, setNewMsgCount] = useState(0);

  useEffect(() => {
    setReqCount(getRequestsCount({ propertyId: property._id }));
    setNewMsgCount(getRequestsCount({ propertyId: property._id }, "lseen"));
  }, [modifiedSwitch[0]]);

  return (
    <NavLink
      to={`/property/${property._id}`}
      key={property._id}
      className="rounded-full p-1.5 transition-colors hover:bg-gray-100"
    >
      <Card className="w-full transition-shadow duration-300 hover:shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="mb-5 w-full rounded-lg border border-black bg-gray-200 md:w-96">
              <ImageSlider images={property.images} title={property.title} />
            </div>

            <div className="flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold">{property.title}</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-1 text-sm font-medium capitalize ${getStatusColor(
                      property.status
                    )}`}
                  >
                    {property.status}
                  </span>

                  <span
                    className={`flex items-center gap-1 rounded-lg px-2 py-1 ${
                      reqCount > 0
                        ? "bg-violet-200 text-violet-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Mails className="h-4" />
                    <p className="text-sm font-medium">{reqCount}</p>
                  </span>

                  <span
                    className={`flex items-center gap-1 rounded-lg px-2 py-1 ${
                      newMsgCount > 0
                        ? "bg-red-200 text-red-900"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <BellPlus className="h-4" />
                    <p className="text-sm font-medium">{newMsgCount}</p>
                  </span>
                </div>
              </div>

              <p className="mb-4 mt-1 capitalize text-gray-700">
                {property.location.address}
              </p>

              <p className="mb-5 mt-1 line-clamp-3 text-sm text-gray-600 sm:line-clamp-none">
                {property.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-1 text-gray-700">
                  <IndianRupee className="h-4 w-4" />
                  <span>{property.rent.toLocaleString()}/mo</span>
                </div>
                <div className="flex items-center gap-1 text-gray-700">
                  <Bed className="h-4 w-4" />
                  <span>
                    {property.numberOfBedrooms}{" "}
                    {property.numberOfBedrooms === 1 ? "bedroom" : "bedrooms"}
                  </span>
                </div>
                <div className="capitalize text-gray-700">
                  {property.propertyType}
                </div>
              </div>

              {property.amenities.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {property.amenities.slice(0, 7).map((amenity, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-2 py-1 text-sm uppercase text-gray-600"
                    >
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 7 && (
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-600">
                      +{property.amenities.length - 7} more
                    </span>
                  )}
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                <div className="flex items-center">
                  <div className="rounded-lg p-3">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Created At</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {getPrettyDate(property.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="rounded-lg p-3">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Update</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {getPrettyDateWithTime(property.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </NavLink>
  );
};

export default DetailedInfoCard;
