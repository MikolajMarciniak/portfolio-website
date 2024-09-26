import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[--foreground-color] text-[--text-color] py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Mikołaj Marciniak. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
