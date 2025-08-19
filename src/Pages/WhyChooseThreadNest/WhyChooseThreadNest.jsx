import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { BiSolidZap } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";

export default function WhyChooseThreadNest() {
  const reasons = [
    {
      title: "Secure & Reliable",
      description:
        "ThreadNest is built with strong role-based authentication and validation to keep your data safe and secure.",
      icon: IoShieldCheckmarkSharp,
      color: "text-sky-500",
    },
    {
      title: "Fast & Intuitive",
      description:
        "Enjoy a smooth and responsive interface with real-time updates, quick sorting, and instant feedback.",
      icon: BiSolidZap,
      color: "text-fuchsia-500",
    },
    {
      title: "Community Driven",
      description:
        "A thriving space where members share posts, engage in meaningful discussions, and grow together.",
      icon: FaUsers,
      color: "text-emerald-500",
    },
    {
      title: "Powerful Insights",
      description:
        "Admins gain access to dashboards for analytics, reports, and smarter community management.",
      icon: MdBarChart,
      color: "text-red-500",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
          Why Choose <span className="text-sky-500">ThreadNest</span>?
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-16">
          Discover what makes ThreadNest unique and why our community platform
          is the perfect choice for open discussions, collaboration, and growth.
        </p>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl shadow bg-white hover:shadow-lg transition duration-300"
            >
              <item.icon className={`w-12 h-12 ${item.color} mx-auto mb-4`} />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
