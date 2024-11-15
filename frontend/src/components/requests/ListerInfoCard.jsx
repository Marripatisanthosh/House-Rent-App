import { Avatar } from "@mui/material";
import { Circle, IndianRupee, MapPin } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

import { getStatusColor } from "../../constanst";
import { getMediaPath } from "../../services/utils";

const ListerInfoCard = ({ request, latestMessage, notSeen }) => {
  const { profilePicture, name, username } = request.listedBy;
  const { title, rent, status, location, propertyType } = request.propertyId;

  return (
    <div
      className={`transition-all duration-200 ease-in-out ${
        notSeen
          ? "border-blue-500 bg-blue-50 hover:bg-blue-100"
          : "border-transparent"
      }`}
    >
      <div className="flex gap-2 p-3">
        <div className="relative flex-shrink-0">
          <NavLink to={`/u/${username}`}>
            <Avatar
              src={getMediaPath(profilePicture)}
              alt={name}
              sx={{ width: 52, height: 52 }}
              className="h-10 w-10 border-2 border-white shadow-sm"
            />
            {notSeen && (
              <div className="absolute -right-1 -top-1">
                <Circle className="h-3 w-3 fill-blue-500 text-blue-500" />
              </div>
            )}
          </NavLink>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3
                  className={`text-sm font-medium ${notSeen ? "text-blue-900" : "text-gray-900"}`}
                >
                  {name}
                </h3>
                <span className="rounded-full bg-gray-200 px-1.5 py-0.5 text-xs uppercase text-gray-700">
                  {propertyType}
                </span>
              </div>
              <p
                className={`text-xs ${notSeen ? "text-blue-800" : "text-gray-600"}`}
              >
                @{name}
              </p>
            </div>
            <div className="text-right">
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${getStatusColor(status)}`}
              >
                {status}
              </span>
              <p
                className={`mt-1 text-xs ${notSeen ? "text-blue-700" : "text-gray-500"}`}
              >
                {new Date(request.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-1 flex items-center gap-3 text-xs">
            <span
              className={`flex items-center truncate capitalize ${
                notSeen ? "text-blue-700" : "text-gray-600"
              }`}
            >
              {title}
            </span>

            <span
              className={`flex flex-shrink-0 items-center gap-0.5 ${
                notSeen ? "text-blue-700" : "text-gray-600"
              }`}
            >
              <IndianRupee className="h-3 w-3" />
              <span>{rent}/mo</span>
            </span>

            <span
              className={`flex items-center gap-0.5 truncate ${
                notSeen ? "text-blue-700" : "text-gray-600"
              }`}
            >
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{location.address}</span>
            </span>
          </div>

          {latestMessage && (
            <p
              className={`mt-1 line-clamp-1 text-sm ${
                notSeen ? "font-medium text-blue-800" : "text-gray-600"
              }`}
            >
              {latestMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListerInfoCard;
