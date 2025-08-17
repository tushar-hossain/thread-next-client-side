import { FaUserShield } from "react-icons/fa";
import { LuMessageSquareMore } from "react-icons/lu";
import { MdBarChart } from "react-icons/md";
import { BiSolidZap } from "react-icons/bi";

export default function Features() {
  const features = [
    {
      title: "Secure Role-based Login",
      description:
        "Differentiate between users, moderators, and admins with a powerful role-based authentication system.",
      icon: FaUserShield,
      color: "text-sky-500", // primary
    },
    {
      title: "Engaging Discussions",
      description:
        "Create posts, comment, upvote, and interact with community members in real time.",
      icon: LuMessageSquareMore,
      color: "text-fuchsia-500", // secondary
    },
    {
      title: "Admin Dashboard",
      description:
        "Manage users, posts, and reported comments with a dedicated dashboard for full control.",
      icon: MdBarChart,
      color: "text-emerald-500", // success
    },
    {
      title: "Real-time Sorting",
      description:
        "Sort posts by newest or most popular instantly, ensuring you never miss trending topics.",
      icon: BiSolidZap,
      color: "text-red-500", // error (used here as a highlight)
    },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-12">
          Powerful Features for a Modern Community
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 border border-slate-200"
            >
              <feature.icon
                className={`w-12 h-12 ${feature.color} mx-auto mb-4`}
              />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
