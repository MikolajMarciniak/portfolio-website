import React, { useState } from "react";
import Button from "../components/Button";
import { toast } from "react-toastify";
const ContactForm = ({ translation }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
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
    if (!formData.email) tempErrors.email = translation.errors.emailrequired;
    else if (!validateEmail(formData.email))
      tempErrors.email = translation.errors.emailinvalid;

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error(translation.errors.forminvalid);
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
        },
      );

      if (response.ok) {
        toast.success("Email sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(translation.errors.emailfailed);
      }
    } catch (error) {
      toast.error(translation.errors.genericerror);
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="relative z-10 mx-auto w-full max-w-6xl flex flex-col gap-8 px-6">
        <form
          className="space-y-4 w-full max-w-lg mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="form-group flex justify-between gap-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder={translation.name}
              value={formData.name}
              onChange={handleChange}
              className={`w-1/2 p-2 shadow-lg rounded-lg bg-[--foreground-color] placeholder-[--text-color] text-[--text-color] border-2 border-[--contact-color] ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}

            <input
              type="text"
              id="subject"
              name="subject"
              placeholder={translation.subject}
              value={formData.subject}
              onChange={handleChange}
              className={`w-1/2 p-2 shadow-lg rounded-lg bg-[--foreground-color] placeholder-[--text-color] text-[--text-color] border-2 border-[--contact-color]`}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder={translation.email}
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 shadow-lg rounded-lg bg-[--foreground-color] placeholder-[--text-color] text-[--text-color] border-2 border-[--contact-color] ${
                errors.email ? "border-red-500" : ""
              } `}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <textarea
              id="message"
              name="message"
              placeholder={translation.message}
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-2 shadow-lg rounded-lg bg-[--foreground-color] placeholder-[--text-color] text-[--text-color] border-2 border-[--contact-color] ${
                errors.message ? "border-red-500" : ""
              }`}
              rows="4"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>
          <div className="">
            <Button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center dark-mode-button hover:text-[--text-color] hover:shadow-lg transition-transform transform hover:scale-105 border-2 border-[--contact-color] hover:bg-[--contact-color] ${
                loading ? "opacity-50" : ""
              }`}
            >
              {loading ? (
                <div className="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-6 w-6"></div>
              ) : (
                translation.submit
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
