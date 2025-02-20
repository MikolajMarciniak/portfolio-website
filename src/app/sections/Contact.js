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
      className="bg-[--background-color-dark] min-h-screen transition-all contact-section flex flex-col"
    >
      <ContactBanner translation={translation.quote} />
      <LazyLoad>
        <div className="contact-hero py-20">
          <h2 className="text-6xl pb-20 text-center font-extrabold">
            <span className="shadow contact  text-[--contact-color]">
              {translation.title}
            </span>
          </h2>
          <div className="mx-auto w-full max-w-6xl   flex flex-col md:flex-row gap-8]">
            <div className="w-full">
              <ContactForm translation={translation.form} />
            </div>
          </div>
        </div>
      </LazyLoad>
    </section>
  );
});

ContactSection.displayName = "Contact";
export default ContactSection;
