import { Calendar, Clock, User, Users } from "lucide-react";

const RequestHeader = ({ request }) => {
  const requestDetails = [
    {
      icon: <Users size={16} />,
      label: "Type",
      value: request.details.tenantType,
    },
    {
      icon: <Clock size={16} />,
      label: "Duration",
      value: `${request.details.noOfMonths} month${request.details.noOfMonths > 1 ? "s" : ""}`,
    },
    {
      icon: <Users size={16} />,
      label: "People",
      value: request.details.headCount,
    },
    {
      icon: <Calendar size={16} />,
      label: "Entry",
      value: new Date(request.details.enterDate).toLocaleDateString(),
    },
    {
      icon: <Users size={16} />,
      label: "Age",
      value: request.details.age || "Na",
    },
    {
      icon: <User size={16} />,
      label: "Gender",
      value: request.details.gender || "Na",
    },
  ];

  return (
    <div className="border-b border-gray-200 bg-white p-2">
      <div className="grid grid-cols-6 overflow-x-auto rounded-lg bg-gray-50 p-3 md:grid-cols-3 lg:grid-cols-6">
        <div className="flex flex-nowrap gap-2">
          {requestDetails.map((detail, index) => (
            <div
              key={index}
              className="h-15 flex min-w-[103px] items-center space-x-2 rounded-md bg-white p-2 shadow-sm"
            >
              <span className="flex-shrink-0 text-gray-500">{detail.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500">{detail.label}</p>
                <p className="truncate text-sm font-medium capitalize">
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestHeader;
