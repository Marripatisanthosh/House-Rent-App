import {
  Bed,
  Calendar,
  Check,
  Clock,
  Home,
  IndianRupee,
  Info,
  MapPin,
} from "lucide-react";

import {
  getPrettyDate,
  getPrettyDateWithTime,
  getStatusColor,
} from "../constanst";
import ImageSlider from "./frags/ImageSlider";

const PropertyDetails = ({
  property,
  showDateInfo = false,
  showStatusInfo = false,
}) => {
  const showWarning = showStatusInfo && property.status !== "available";
  return (
    <div>
      {showWarning && (
        <div
          className={`w-full ${getStatusColor(property.status)} mb-7 mt-3 rounded-lg py-3 text-center text-orange-900`}
        >
          <p className="font-semibold">
            This property is currently unavailable
          </p>
        </div>
      )}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold capitalize text-gray-900">
            {property.title}
          </h2>
          <a
            href={`https://www.google.com/maps?q=${property.location.coordinates[1]},${property.location.coordinates[0]}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="mt-2 flex items-center gap-2 text-gray-500 hover:text-blue-600">
              <MapPin className="h-4 w-4" />
              <span className="capitalize">{property.location.address}</span>
            </div>
          </a>
        </div>
      </div>

      <div className="mb-10 w-full pb-5">
        <div className="w-full">
          <ImageSlider images={property.images} title={property.title} />
        </div>
      </div>

      <div className="mb-3 mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-3">
            <IndianRupee className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Monthly Rent</p>
            <p className="font-semibold text-gray-900">{property.rent}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-green-50 p-3">
            <Bed className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Bedrooms</p>
            <p className="font-semibold text-gray-900">
              {property.numberOfBedrooms}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-purple-50 p-3">
            <Home className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Property Type</p>
            <p className="font-semibold uppercase text-gray-900">
              {property.propertyType}
            </p>
          </div>
        </div>

        {showDateInfo && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-orange-50 p-3">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Posted At</p>
                <p className="text-sm font-semibold text-gray-900">
                  {getPrettyDate(property.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-orange-50 p-3">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Last Update</p>
                <p className="text-sm font-semibold text-gray-900">
                  {getPrettyDateWithTime(property.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        )}

        {showStatusInfo && (
          <div className="itmes center flex gap-3">
            <div
              className={`rounded-lg ${getStatusColor(property.status)}} p-3`}
            >
              <Info className={`h-5 w-5 ${getStatusColor(property.status)}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-semibold uppercase text-gray-900">
                {property.status}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mb-8 mt-8">
        <h3 className="mb-3 text-lg font-semibold">Description</h3>
        <p className="leading-relaxed text-gray-700">{property.description}</p>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold">Amenities</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {property.amenities &&
            property.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full bg-gray-100 px-2 py-1"
              >
                <Check className="h-4 w-4 text-green-600" />
                <span key={index} className="text-sm uppercase text-gray-800">
                  {amenity}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
