import React, { forwardRef } from "react";
import ContactForm from "../components/ContactForm";
import ContactBanner from "../components/ContactBanner";
import LazyLoad from "../components/LazyLoad";
import "../styles/contact.css";

const ContactSection = forwardRef(({ translation }, ref) => {
  return (
    <section
      id="contact"
      ref={ref}
      className="shadow-2xl transition-all contact-section flex flex-col"
    >
      <ContactBanner translation={translation.quote} />
      <LazyLoad>
        <div className="mx-auto w-full max-w-6xl mb-10 mt-12 flex flex-col md:flex-row gap-8]">
          <div className=" md:items-start w-full text-left">
            <h2 className="text-5xl font-bold mb-8">
              <span className="shadow text-[--contact-color]">
                {translation.title}
              </span>
            </h2>

            <div className="flex items-center space-x-4 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 1920 1920"
                className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform duration-500 hover:text-[--contact-color] text-[--text-color]"
                onClick={() =>
                  window.open("mailto:mikolaj@marciniakm.com", "_blank")
                }
              >
                <path
                  d="M1920 428.266v1189.54l-464.16-580.146-88.203 70.585 468.679 585.904H83.684l468.679-585.904-88.202-70.585L0 1617.805V428.265l959.944 832.441L1920 428.266ZM1919.932 226v52.627l-959.943 832.44L.045 278.628V226h1919.887Z"
                  fillRule="evenodd"
                />
              </svg>

              <p className="text-2xl text-[--text-color]">
                mikolaj@marciniakm.com
              </p>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-10 h-10 cursor-pointer hover:text-[--contact-color] hover:scale-110 transition-transform duration-500 text-[--text-color]"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/mikolaj-marciniak",
                    "_blank",
                  )
                }
              >
                <path d="M19 0h-14c-2.762 0-5 2.238-5 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.762-2.238-5-5-5zm-11.5 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm14.5 11.268h-3v-5.504c0-1.313-.026-3-1.875-3-1.875 0-2.164 1.461-2.164 2.892v5.612h-3v-10h2.875v1.368h.041c.401-.759 1.38-1.558 2.841-1.558 3.041 0 3.604 2.001 3.604 4.605v5.585z" />
              </svg>
              <p className="text-2xl text-[--text-color]">
                linkedin.com/in/mikolaj-marciniak
              </p>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform duration-500 hover:text-[--contact-color] text-[--text-color]"
                onClick={() =>
                  window.open("https://github.com/MikolajMarciniak", "_blank")
                }
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.725-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.838 1.238 1.838 1.238 1.07 1.835 2.809 1.305 3.495.998.107-.775.418-1.305.762-1.605-2.665-.305-5.466-1.335-5.466-5.93 0-1.31.469-2.38 1.236-3.22-.124-.304-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.398 3.005-.404 1.02.006 2.048.138 3.006.404 2.292-1.553 3.298-1.23 3.298-1.23.653 1.649.242 2.872.118 3.176.77.84 1.236 1.91 1.236 3.22 0 4.61-2.804 5.621-5.475 5.921.43.372.814 1.102.814 2.222v3.293c0 .322.218.694.825.576 4.765-1.59 8.2-6.084 8.2-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <p className="text-2xl text-[--text-color]">
                github.com/MikolajMarciniak
              </p>
            </div>
          </div>

          <div className="w-full">
            <ContactForm translation={translation.form} />
          </div>
        </div>
      </LazyLoad>
    </section>
  );
});

ContactSection.displayName = "Contact";
export default ContactSection;
