import React, { useEffect, useState } from "react";

const LoadingSlider = ({ setIsLoading }) => {
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-opacity duration-500`}
      style={{ backgroundColor: "rgb(20,20,20)" }}
    >
      <div className="masked-element">
        <div className="background">
          <div className="absolute inset-0 bg-blue-500 animate-fill" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSlider;
