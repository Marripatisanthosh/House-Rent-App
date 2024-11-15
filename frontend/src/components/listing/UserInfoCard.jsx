import { Avatar } from "@mui/material";
import { BadgeCheck, Phone } from "lucide-react";
import { NavLink } from "react-router-dom";

import { getMediaPath } from "../../services/utils";

const UserInfoCard = ({ user }) => {
  const { name, username, profilePicture, legalVerificationID, contactNumber } =
    user;

  const showContact = !!localStorage.getItem("user_type");
  return (
    <NavLink to={`/u/${username}`} className="inline-block">
      <div className="flex">
        <Avatar
          alt={name}
          src={getMediaPath(profilePicture)}
          sx={{ width: 69, height: 69 }}
          className="mr-2"
        />
        <div>
          <div className="justify-start1 flex flex-col">
            <div className="flex items-center space-x-1">
              <h2 className="text-xl font-semibold">{name}</h2>
              {legalVerificationID && (
                <BadgeCheck className="h-7 w-7 bg-white p-1 text-blue-500" />
              )}
            </div>
          </div>
          <p className="text-gray-500">@{username}</p>
          {showContact && (
            <p className="ml-1 flex items-center text-sm text-gray-900">
              <Phone className="mr-1 h-3 w-3" /> {contactNumber}
            </p>
          )}
        </div>
      </div>
    </NavLink>
  );
};

export default UserInfoCard;
