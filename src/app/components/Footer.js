import React from "react";

const Footer = ({ translation }) => {
  return (
    <footer className="bg-[--foreground-color] text-[--text-color] py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Mikołaj Marciniak. {translation}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
