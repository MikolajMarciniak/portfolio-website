/* eslint-disable @next/next/no-img-element */
import React from "react";

const Banner = ({ translation }) => {
  return (
    <div className="shadow-2xl relative w-full min-h-[400px]  flex items-center justify-center overflow-hidden dark text-lg sm:text-xl xl:text-2xl">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('./images/banner.jpg')",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[--projects-color] to-[--contact-color] opacity-70"></div>
      <div className="relative flex flex-col items-center text-center">
        <p className="mb-5 px-3 text-white font-semibold italic">
          {translation}
        </p>

        <div className="mt-5 w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-white shadow-lg">
          <img
            src="./images/miko2.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-white mt-3 font-semibold">Mikołaj Marciniak</p>
      </div>
    </div>
  );
};

export default Banner;
