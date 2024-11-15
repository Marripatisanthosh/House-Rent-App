import { Circle, Home, IndianRupee, MapPin } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

import { getStatusColor } from "../../constanst";

const PropertyHeader = ({ request }) => {
  const { _id, title, rent, propertyType, location } = request.propertyId;
  const { status } = request;
  const details = [
    {
      icon: <Home className="h-4 w-4 text-gray-500" />,
      label: "Title",
      value: title,
    },
    {
      icon: <Circle className={`h-4 w-4 ${getStatusColor(status)}`} />,
      label: "Status",
      value: status,
    },
    {
      icon: <IndianRupee className="h-4 w-4 text-gray-500" />,
      label: "Rent",
      value: `${rent}/mo`,
    },
    {
      icon: <Home className="h-4 w-4 text-gray-500" />,
      label: "Type",
      value: propertyType,
    },
    {
      icon: <MapPin className="h-4 w-4 text-gray-500" />,
      label: "Location",
      value: location?.address,
    },
  ];

  return (
    <div className="border-b border-gray-200 bg-white p-2">
      <NavLink to={`/listing/${_id}`}>
        <div className="grid grid-cols-5 overflow-x-auto">
          <div className="flex flex-nowrap gap-2">
            {details.map((detail, index) => (
              <div
                key={index}
                className="flex min-w-[120px] items-center gap-2 rounded-md bg-gray-50 p-2 shadow-sm"
              >
                <span className="flex-shrink-0">{detail.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500">{detail.label}</p>
                  <p className="truncate text-sm font-medium capitalize text-gray-900">
                    {detail.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default PropertyHeader;
