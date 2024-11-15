import { Card, CardContent, Divider } from "@mui/material";
import { CalendarCheck, Home, User } from "lucide-react";

import { getPrettyDate } from "../../constanst";

const Contract = ({ message }) => {
  const [
    aggId,
    date,
    userName,
    userId,
    startDate,
    endDate,
    rent,
    propertyTitle,
    propertyType,
    propertyAddress,
    legalDocumentId,
    listedByName,
    listedById,
    contactNumber,
  ] = message.message.split(";+");

  return (
    <div className="p-4 md:p-6">
      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-6">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
              Rental Agreement
            </h2>
            <p className="mt-1 text-sm text-gray-500">Contract ID: {aggId}</p>
          </div>

          <Divider className="my-6" />

          <div className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="flex items-center gap-2 text-gray-900">
                <User className="h-4 w-4" />
                <span className="font-medium">{userName}</span>
                <span className="text-sm text-gray-500">ID: {userId}</span>
              </div>

              <div className="mt-2 flex items-center gap-2 text-gray-900">
                <CalendarCheck className="h-4 w-4" />
                <span>{new Date(date).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="font-medium">{propertyTitle}</span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                  {propertyType}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-600">{propertyAddress}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-1">
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Rental Period
                </h3>
                <p className="mt-1">
                  {getPrettyDate(startDate)} to {getPrettyDate(endDate)}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Monthly Rent
                </h3>
                <p className="mt-1 text-lg font-semibold">
                  ₹{Number(rent).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="text-sm font-medium text-gray-500">
                Property Owner
              </h3>
              <div className="mt-2 flex flex-col gap-1 text-sm">
                <p>
                  <span className="font-medium">{listedByName}</span>
                  <span className="text-gray-500"> (ID: {listedById})</span>
                </p>
                <p className="text-gray-600">Contact: {contactNumber}</p>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              Property Legal Document ID: {legalDocumentId}
            </div>
          </div>

          <Divider className="my-6" />

          <div className="text-center text-sm font-medium text-gray-900">
            This is a legally binding agreement between both parties
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contract;
