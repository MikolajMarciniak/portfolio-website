import React from "react";
import ContactForm from "../components/ContactForm";
import "../styles/contact.css";

const ContactSection = () => {
  return (
    <section id="contact" className="contact-section flex flex-col">
      <ContactForm />
    </section>
  );
};

export default ContactSection;
