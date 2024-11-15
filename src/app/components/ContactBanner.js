import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full h-[450px] overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('./images/6.jpg')", // New York Image from Unsplash
        }}
      ></div>

      {/* Gradient Overlay from Orange to Blue with Reduced Opacity */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-500 to-blue-500 opacity-50"></div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Profile Picture */}{" "}
        <div className="w-32 h-32 rounded-full bg-[#D3CEBA] overflow-hidden border-2 border-white shadow-lg">
          <img
            src="./images/miko2.jpg" // Your profile image
            alt="Profile"
            className="w-full h-full object-cover transform translate-x-1 bg-[#D3CEBA]" // Shift image to the right
          />
        </div>
        {/* Quote */}
        <p className="mt-4 text-white font-bold text-xl  ">
          "The best way to predict the future is to create it."
        </p>
      </div>
    </div>
  );
};

export default Banner;
