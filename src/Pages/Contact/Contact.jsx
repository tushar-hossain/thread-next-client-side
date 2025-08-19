import React from "react";
import { Helmet } from "react-helmet-async";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {
  const handelSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;
    // console.log(name, email, message);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your Message has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    form.reset();
  };
  return (
    <div className="w-11/12 mx-auto my-10">
      <Helmet>
        <title>Contact | ThreadNest</title>
      </Helmet>

      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 font-poppins">
          Contact <span className="text-sky-500">Us</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Got questions, suggestions, or feedback? We’d love to hear from you!
          Reach out to our team through the form below or use our direct contact
          details.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Information */}
        <div className="bg-slate-50 rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            Get in Touch
          </h2>
          <ul className="space-y-5 text-gray-700">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-sky-500 text-xl" />
              <span>support@threadnest.com</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-fuchsia-500 text-xl" />
              <span>+880 123 456 789</span>
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-emerald-500 text-xl" />
              <span>Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            Send a Message
          </h2>
          <form onSubmit={handelSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            {/* email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
            {/* message */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="4"
                name="message"
                placeholder="Your Message"
                className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-sky-500 cursor-pointer hover:bg-sky-600 text-white font-semibold px-5 py-3 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
