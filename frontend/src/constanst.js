export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordPattern =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const SERVER_URL = process.env.REACT_APP_SERVER_URL; //"http://localhost:6969";

export const availablePropertyTypes = [
  "apartment",
  "house",
  "room",
  "condo",
  "studio",
  "townhouse",
  "villa",
];

export const availableAmenities = [
  "gym",
  "wifi",
  "swimming pool",
  "parking",
  "ac",
  "pet friendly",
  "security system",
  "laundry service",
  "children's play area",
  "room service",
  "bbq area",
  "rooftop terrace",
  "elevator",
  "balcony",
  "library",
  "game room",
  "tennis court",
  "basketball court",
  "sauna",
  "hot tub",
  "breakfast included",
  "daily housekeeping",
  "in-room safe",
  "mini-bar",
  "24-hour reception",
  "water purifier",
  "grocery delivery",
  "kitchen",
];
const statusColors = {
  unlisted: "bg-gray-200 text-gray-800",
  occupied: "bg-indigo-200 text-indigo-900",
  available: "bg-green-100 text-green-800",
  waiting: "bg-yellow-100 text-yellow-800",
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  finalized: "bg-green-800 text-green-100",
};

export const getStatusColor = (status) => {
  return statusColors[status] || "bg-gray-200 text-gray-800";
};

export const getPrettyDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getPrettyDateWithTime = (date) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return new Date(date).toLocaleString("en-US", options);
};

export const tenantTypes = [
  { value: "family", label: "Family" },
  { value: "couples", label: "Couples" },
  { value: "bachelors", label: "Bachelor(s)" },
  { value: "students", label: "Student(s)" },
  { value: "group", label: "Group" },
];

export const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];
