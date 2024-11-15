import { Avatar } from "@mui/material";
import { Circle } from "lucide-react";
import { NavLink } from "react-router-dom";

import { getStatusColor } from "../../constanst";
import { getMediaPath } from "../../services/utils";

const RequesterInfoCard = ({ request, latestMessage, notSeen }) => {
  const { profilePicture, name, username } = request.requesterId;
  const { status } = request;
  return (
    <div
      className={`transition-all duration-200 ease-in-out ${
        notSeen
          ? "border-blue-500 bg-blue-50 hover:bg-blue-100"
          : "border-transparent"
      }`}
    >
      <div className="flex gap-3 p-3">
        <div className="relative flex-shrink-0">
          <NavLink to={`/u/${username}`}>
            <Avatar
              src={getMediaPath(profilePicture)}
              sx={{ width: 52, height: 52 }}
              alt={username}
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
              <h3
                className={`text-sm ${
                  notSeen
                    ? "font-semibold text-blue-900"
                    : "font-medium text-gray-700"
                }`}
              >
                {name}
              </h3>

              <p
                className={`text-xs ${
                  notSeen ? "text-blue-800" : "text-gray-500"
                }`}
              >
                @{username}
              </p>
            </div>

            <div className="text-right">
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${getStatusColor(status)}`}
              >
                {status}
              </span>

              <p
                className={`text-xs ${
                  notSeen ? "text-blue-700" : "text-gray-500"
                }`}
              >
                {new Date(request.updatedAt).toLocaleDateString()}
              </p>
            </div>
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

export default RequesterInfoCard;
