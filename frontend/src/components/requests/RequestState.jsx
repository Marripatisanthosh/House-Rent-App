import { AlertCircle, Clock, HourglassIcon, Lock, XCircle } from "lucide-react";
import React from "react";

import { calculateDays } from "../../services/utils";
import useRequestStore from "../../stores/useRequestStore";
import AcceptOrDecline from "../chat/AcceptOrDecline";

const RequestState = ({ children, blockPending }) => {
  const { selectedRequest } = useRequestStore();
  const daySince = calculateDays(selectedRequest.date, new Date());

  let blockState =
    !["accepted", "finalized"].includes(selectedRequest.status) ||
    (selectedRequest.status === "finalized" && daySince > 15);

  const showAD = !blockPending && selectedRequest.status === "pending";
  blockState = !showAD && blockState;

  const getStatusMessage = () => {
    if (selectedRequest.status === "finalized" && !blockState) {
      return {
        message: `This request will expire in ${15 - daySince} days`,
        icon: <Clock className="h-5 w-5 text-yellow-500" />,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        isWarning: true,
      };
    }

    if (selectedRequest.status === "pending" && blockPending) {
      return {
        message:
          "Awaiting response from the lister. You'll be notified once they accept or reject.",
        icon: <HourglassIcon className="h-5 w-5 text-blue-500" />,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      };
    }

    if (selectedRequest.status === "forgot") {
      return {
        message: `Property Is Unavailabel at the moment, this request expired and will be deleted in ${2 - daySince} days`,
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        color: "text-red-600",
        bgColor: "bg-red-50",
      };
    }

    if (selectedRequest.status === "rejected") {
      return {
        message: "You rejected this request",
        icon: <XCircle className="h-5 w-5 text-gray-500" />,
        color: "text-gray-600",
        bgColor: "bg-gray-50",
      };
    }

    if (selectedRequest.status === "finalized" && blockState) {
      return {
        message: "This request has expired you can no longer send any messages",
        icon: <Lock className="h-5 w-5 text-gray-500" />,
        color: "text-gray-600",
        bgColor: "bg-gray-50",
      };
    }

    return {
      message: "This request is not available for messaging",
      icon: <Lock className="h-5 w-5 text-gray-500" />,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    };
  };

  const statusInfo = getStatusMessage();

  if (blockState) {
    return (
      <div className="flex h-32 w-full items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
        <div className="flex flex-col items-center gap-2 p-4 text-center">
          {statusInfo.icon}
          <span className={`text-sm font-medium ${statusInfo.color}`}>
            {statusInfo.message}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center gap-3 space-y-2">
      {statusInfo.isWarning && (
        <div
          className={`flex items-center gap-2 rounded-md p-2 ${statusInfo.bgColor}`}
        >
          {statusInfo.icon}
          <span className={`text-sm ${statusInfo.color}`}>
            {statusInfo.message}
          </span>
        </div>
      )}
      {showAD ? <AcceptOrDecline /> : children}
    </div>
  );
};

export default RequestState;
