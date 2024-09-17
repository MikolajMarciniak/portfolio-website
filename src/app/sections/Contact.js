import React from 'react';

const ContactSection = () => {
  return (
    <section className="contact-section py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4s ">
        <h2 className="text-3xl font-semibold mb-4">Contact Me</h2>
        <form className="space-y-4">
          <div className="form-group">
            <label htmlFor="name" className="block text-lg">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 bg-gray-800 text-white rounded-lg"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="block text-lg">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 bg-gray-800 text-white rounded-lg"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="block text-lg">Message</label>
            <textarea
              id="message"
              name="message"
              className="w-full p-2 bg-gray-800 text-white rounded-lg"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 p-2 text-white rounded-lg hover:bg-indigo-600"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
