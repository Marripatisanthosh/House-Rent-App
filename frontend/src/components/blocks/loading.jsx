import React from "react";

const Loading = ({ size = 12, color = "blue-500" }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center">
        <div
          className={`h-${size} w-${size} animate-spin rounded-full border-b-2 border-t-2 border-${color} shadow-lg`}
          role="status"
        ></div>

        <p className="mt-2 text-gray-700">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
