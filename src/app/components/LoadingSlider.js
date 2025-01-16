import React from "react";

const LoadingSlider = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[--background-color]">
      <div className="masked-element">
        <div className="background">
          <div className="absolute inset-0 bg-blue-500 animate-fill" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSlider;
