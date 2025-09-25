import React from "react";
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
        <img src="/logo.png" alt="PlaceMate" className="w-10 h-10" />
      </div>
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
      <p className="text-gray-600 font-medium">Loading PlaceMate...</p>
    </div>
  </div>
);

export default LoadingSpinner