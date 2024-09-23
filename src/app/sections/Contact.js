import React, { forwardRef } from "react";
import ContactForm from "../components/ContactForm";
import "../styles/contact.css";

const ContactSection = forwardRef((props, ref) => {
  return (
    <section ref={ref} id="contact" className="contact-section flex flex-col">
      <ContactForm />
    </section>
  );
});

export default ContactSection;
