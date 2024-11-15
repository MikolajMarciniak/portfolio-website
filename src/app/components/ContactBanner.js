import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full h-[450px] overflow-hidden dark">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('./images/6.jpg')",
        }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-orange-600 to-blue-600 opacity-60"></div>
      <div className="relative  flex flex-col items-center justify-center h-full">
        <p className="mb-5 text-white font-semibold text-2xl italic">
          "Let's build something amazing together - drop me a message below!"
        </p>
        <div className="mt-5 w-32 h-32 rounded-full bg-[#D3CEBA] overflow-hidden border-2 border-white shadow-lg">
          <img
            src="./images/miko2.jpg"
            alt="Profile"
            className="w-full h-full object-cover transform translate-x-1 bg-[#D3CEBA]"
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
