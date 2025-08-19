import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { FaCheck, FaCrown, FaStar } from "react-icons/fa";

const Membership = () => {
  const memberFeatures = [
    "Unlimited post creation",
    "Priority support response",
    "Exclusive member badges",
    "Advanced commenting features",
    "Access to premium content",
    "Early access to new features",
    "Ad-free browsing experience",
    "Member-only community forums",
  ];

  return (
    <div className="w-11/12 mx-auto my-10">
      <Helmet>
        <title>Membership - Thread Nest</title>
      </Helmet>

      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-2 mb-4">
          <FaCrown className="text-fuchsia-500 text-3xl" />
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800">
            Become a Member
          </h2>
          <FaCrown className="text-fuchsia-500 text-3xl" />
        </div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Unlock premium features and join our exclusive community of content
          creators and discussants.
        </p>
      </div>

      {/* Membership Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-sky-50 to-fuchsia-50 rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Premium Badge */}
          <div className="bg-gradient-to-r from-sky-500 to-fuchsia-500 text-white text-center py-3">
            <div className="flex justify-center items-center gap-2">
              <FaStar className="text-yellow-300" />
              <span className="font-semibold uppercase tracking-wide">
                Premium Membership
              </span>
              <FaStar className="text-yellow-300" />
            </div>
          </div>

          <div className="p-8">
            {/* Pricing */}
            <div className="text-center mb-8">
              <div className="flex justify-center items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold text-slate-800">$10</span>
                <span className="text-xl text-slate-500">/month</span>
              </div>
              <p className="text-slate-600">
                One-time payment to unlock all member features
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {memberFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-slate-100"
                >
                  <div className="flex-shrink-0">
                    <FaCheck className="text-emerald-500 text-sm" />
                  </div>
                  <span className="text-slate-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Link
                to="/payment"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-500 to-fuchsia-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-sky-600 hover:to-fuchsia-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaCrown className="text-yellow-300" />
                Get Premium Membership
                <FaCrown className="text-yellow-300" />
              </Link>

              <p className="text-sm text-slate-500 mt-4">
                🔒 Secure payment processing • Cancel anytime • 30-day
                money-back guarantee
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-slate-50 rounded-xl p-6 border border-slate-200">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              Why Choose Premium Membership?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto">
                  <FaStar className="text-sky-500 text-xl" />
                </div>
                <h4 className="font-semibold text-slate-800">
                  Premium Experience
                </h4>
                <p className="text-sm text-slate-600">
                  Enjoy an ad-free, enhanced browsing experience with priority
                  features.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-12 h-12 bg-fuchsia-100 rounded-full flex items-center justify-center mx-auto">
                  <FaCheck className="text-fuchsia-500 text-xl" />
                </div>
                <h4 className="font-semibold text-slate-800">
                  Exclusive Access
                </h4>
                <p className="text-sm text-slate-600">
                  Access member-only content and participate in exclusive
                  discussions.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <FaCrown className="text-emerald-500 text-xl" />
                </div>
                <h4 className="font-semibold text-slate-800">
                  Priority Support
                </h4>
                <p className="text-sm text-slate-600">
                  Get faster responses and dedicated support from our team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
