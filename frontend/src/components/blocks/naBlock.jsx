import { ShieldAlert } from "lucide-react";

const NaBlock = ({
  message = "Page Doesn't Exist or You are not authorized to access this page.",
}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="mb-4 text-gray-600">
          <ShieldAlert className="h-16 w-16" />
        </div>
        <h2 className="mb-4 text-center text-2xl font-semibold">{message}</h2>
        <p>
          <a href="/" className="text-blue-500 hover:underline">
            Go to Home
          </a>
        </p>
      </div>
    </div>
  );
};

export default NaBlock;
