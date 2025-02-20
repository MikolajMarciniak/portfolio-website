import React from "react";

const Banner = ({ translation }) => {
  return (
    <div
      className="shadow-2xl relative w-full min-h-[400px] pt-10 flex items-center justify-center overflow-hidden dark"
      style={{
        clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0% 100%)",
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('./images/banner.jpg')",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[--projects-color] to-[--contact-color] opacity-70"></div>
      <div className="relative flex flex-col items-center text-center">
        <p className="mb-5 text-white font-semibold text-2xl italic">
          {translation}
        </p>

        <div className="mt-5 w-32 h-32 rounded-full bg-[#D3CEBA] overflow-hidden border-2 border-white shadow-lg">
          <img
            src="./images/miko2.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-white text-xl mt-3 font-semibold">
          Mikołaj Marciniak
        </p>
      </div>
    </div>
  );
};

export default Banner;
