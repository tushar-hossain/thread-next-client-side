import { FaArrowRight } from "react-icons/fa";

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-sky-500 to-fuchsia-500 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Join the Conversation on{" "}
          <span className="text-yellow-200">ThreadNest</span>
        </h2>
        <p className="text-lg md:text-xl mb-10 text-slate-100">
          Be part of a thriving community. Share your thoughts, connect with
          others, and explore insightful discussions tailored for you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/joinUs"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-sky-600 font-semibold hover:bg-slate-100 transition"
          >
            Get Started <FaArrowRight className="ml-2 w-5 h-5" />
          </a>
          <a
            href="/explore"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-900 bg-opacity-30 text-white border border-white/30 font-semibold hover:bg-opacity-50 transition"
          >
            Explore Community
          </a>
        </div>
      </div>
    </section>
  );
}
