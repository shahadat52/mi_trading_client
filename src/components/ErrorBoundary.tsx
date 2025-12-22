/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaRedo, FaHome } from "react-icons/fa";

type ErrorBoundaryProps = {
  title?: string;
  message?: string;
  onRetry?: () => void; // optional API refetch function
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  title,
  message,
  onRetry,
}) => {
  const routeError: any = useRouteError();
  const navigate = useNavigate();

  const handleRetry = () => {
    if (onRetry) {
      // API-level retry
      onRetry();
    } else {
      // Route-level retry
      navigate(0);
    }
  };

  const displayTitle =
    title ||
    (routeError?.status === 404
      ? "Page Not Found"
      : "Something Went Wrong");
  const displayMessage =
    message || routeError?.statusText || "Please try again.";

  return (
    <div className="flex rounded-2xl flex-col items-center justify-center  p-10 text-center space-y-4 bg-gray-50 px-4">
      {/* Icon */}
      <div className="bg-red-100 text-red-600 p-4 rounded-full">
        <FaExclamationTriangle className="text-4xl" />
      </div>

      {/* Title & Message */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">{displayTitle}</h1>
        <p className="text-gray-500 mt-1 max-w-md">{displayMessage}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleRetry}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
        >
          <FaRedo />
          Retry
        </button>
        {!onRetry && (
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition"
          >
            <FaHome />
            Go Home
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorBoundary;
