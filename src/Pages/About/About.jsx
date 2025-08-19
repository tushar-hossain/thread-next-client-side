import React from "react";
import { Helmet } from "react-helmet-async";
import { FaUsers, FaBullhorn, FaRocket, FaLightbulb } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-11/12 mx-auto my-10">
      <Helmet>
        <title>About | ThreadNest</title>
      </Helmet>

      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 font-poppins">
          About <span className="text-sky-500">ThreadNest</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          ThreadNest is more than just a forum — it’s a place where ideas take
          flight. Our mission is to empower individuals to share knowledge,
          exchange ideas, and build communities around meaningful conversations.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-slate-50 rounded-xl shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <FaRocket className="text-fuchsia-500" /> Our Mission
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We aim to create a safe and engaging digital space where people can
          connect, collaborate, and grow together. Whether you’re here to learn,
          share your expertise, or simply explore, ThreadNest provides the nest
          where every idea matters.
        </p>
      </section>

      {/* Core Values */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
          Why Choose ThreadNest?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <FaUsers className="text-sky-500 text-3xl mb-3" />
            <h3 className="font-semibold text-lg mb-2">Community First</h3>
            <p className="text-gray-600">
              A thriving platform built around people — connect, engage, and
              grow with others.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <FaBullhorn className="text-fuchsia-500 text-3xl mb-3" />
            <h3 className="font-semibold text-lg mb-2">Open Discussions</h3>
            <p className="text-gray-600">
              Share your thoughts freely in a respectful, moderated environment.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <FaLightbulb className="text-emerald-500 text-3xl mb-3" />
            <h3 className="font-semibold text-lg mb-2">Knowledge Sharing</h3>
            <p className="text-gray-600">
              Learn from others, share your expertise, and discover new
              perspectives.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section Placeholder */}
      <section className="text-center bg-slate-50 rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Meet Our Team
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          ThreadNest is built by a passionate team of developers and community
          lovers. This section can feature your core team members, contributors,
          or partners.
        </p>
      </section>
    </div>
  );
};

export default About;
