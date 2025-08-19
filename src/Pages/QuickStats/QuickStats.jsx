import { FaUsersCog } from "react-icons/fa";
import { LuMessageSquareMore } from "react-icons/lu";
import { MdThumbsUpDown } from "react-icons/md";
import { FiActivity } from "react-icons/fi";

export default function QuickStats() {
  const stats = [
    {
      title: "Active Members",
      value: "12K+",
      description: "Engaged users sharing knowledge daily",
      icon: FaUsersCog,
      color: "text-sky-500",
    },
    {
      title: "Posts Shared",
      value: "45K+",
      description: "Community-driven discussions and ideas",
      icon: LuMessageSquareMore,
      color: "text-fuchsia-500",
    },
    {
      title: "Upvotes Given",
      value: "230K+",
      description: "Contributions recognized by peers",
      icon: MdThumbsUpDown,
      color: "text-emerald-500",
    },
    {
      title: "Real-time Activity",
      value: "1.2K+",
      description: "New posts and comments every day",
      icon: FiActivity,
      color: "text-red-500",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-12">
          Quick Community Stats
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl shadow bg-slate-50 hover:bg-slate-100 transition duration-300"
            >
              <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
              <h3 className="text-2xl font-bold text-slate-900">
                {stat.value}
              </h3>
              <p className="text-lg font-semibold text-slate-700">
                {stat.title}
              </p>
              <p className="text-sm text-slate-500 mt-2">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
