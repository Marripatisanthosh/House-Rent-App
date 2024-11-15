import { Blinds } from "lucide-react";

const NoListings = ({
  message = "No Properties Available",
  subMessage = "Check back later for new listings or Change filters",
}) => {
  return (
    <div className="col-span-full flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
      <Blinds className="mb-4 h-16 w-16 text-gray-400" />
      <h2 className="text-2xl font-semibold text-gray-700">{message}</h2>
      <p className="mt-2 text-gray-500">{subMessage}</p>
    </div>
  );
};

export default NoListings;
