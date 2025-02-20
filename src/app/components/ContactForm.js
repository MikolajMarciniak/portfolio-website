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
        setFormData({
          name: "",
          email: "",
          subject: "Portfolio Email",
          message: "",
        });
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
    <div className=" bg-[--foreground-color] h-full mx-auto max-w-3xl rounded-md shadow-2xl">
      <div className="relative z-10 mx-auto flex flex-col py-12">
        <form
          className="space-y-8 w-full max-w-2xl mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="form-group space-y-2">
            <label
              className="text-lg font-bold text-[--contact-color]"
              htmlFor="name"
            >
              {translation.name}{" "}
            </label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder={translation.entername}
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 shadow-xl rounded-lg bg-[--foreground-color-dark] placeholder-[--text-color] text-[--text-color]  border-[--contact-color] ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="form-group space-y-2">
            <label
              className="text-lg font-bold text-[--contact-color]"
              htmlFor="email"
            >
              {translation.email}{" "}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={translation.enteremail}
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 shadow-xl rounded-lg bg-[--foreground-color-dark] placeholder-[--text-color] text-[--text-color]  border-[--contact-color] ${
                errors.email ? "border-red-500" : ""
              } `}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="form-group space-y-2">
            <label
              className="text-lg font-bold text-[--contact-color]"
              htmlFor="message"
            >
              {translation.message}
            </label>
            <textarea
              id="message"
              name="message"
              placeholder={translation.entermessage}
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-2 shadow-xl rounded-lg bg-[--foreground-color-dark] placeholder-[--text-color] text-[--text-color]  border-[--contact-color] ${
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
              className={`border-2 font-bold shadow-2xl inline-flex items-center hover:text-[--background-color] text-[--contact-color] justify-center w-full dark-mode-button hover:shadow-lg transition-transform transform  border-[--contact-color] bg-[--background-color] hover:bg-[--contact-color] ${
                loading ? "opacity-50" : ""
              }`}
            >
              {loading ? (
                <div className="loader ease-linear rounded-full  border-t-2 border-gray-200 h-6 w-6"></div>
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
