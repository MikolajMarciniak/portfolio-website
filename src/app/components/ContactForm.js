import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.email) tempErrors.email = "Email is required.";
    else if (!validateEmail(formData.email))
      tempErrors.email = "Invalid email address.";
    if (!formData.message) tempErrors.message = "Message is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_AWS_EMAIL_API_ADDRESS,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Email sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col relative overflow-x-hidden"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl text-center mb-12">
        <h2 className="text-5xl font-bold mb-4 mt-4">
          <span className="shadow text-[--contact-color]">Contact Me</span>
        </h2>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl flex flex-col gap-8 px-6">
        <form
          className="space-y-4 w-full max-w-lg mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-[--background-color] placeholder-[--text-color] text-[--text-color] border-2 border-[--contact-color] ${
                errors.name ? "border-red-500" : ""
              }`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-[--background-color] placeholder-[--text-color] text-[--text-color] border-2 border-[--contact-color] ${
                errors.email ? "border-red-500" : ""
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="form-group">
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg bg-[--background-color] placeholder-[--text-color] text-[--text-color] border-2 border-[--contact-color] ${
                errors.message ? "border-red-500" : ""
              }`}
              rows="4"
              required
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            className={`bg-[--contact-color] p-2 text-white rounded-lg hover:bg-indigo-600 flex items-center justify-center ${
              loading ? "opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{
          backgroundColor: "var(--background-color)",
          color: "#fff",
        }}
      />
    </section>
  );
};

export default ContactForm;
