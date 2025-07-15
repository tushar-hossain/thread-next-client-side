import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto my-10 space-y-6">
      <h1 className="text-3xl font-bold text-center text-primary">
        Privacy Policy
      </h1>

      <div>
        <h2 className="text-xl font-semibold mb-2">
          1. Information We Collect
        </h2>
        <p className="text-gray-700 text-justify">
          We collect basic information such as your name, email, profile
          picture, and posts. We also log usage data like votes, comments, and
          browsing patterns to improve the site.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-700 text-justify">
          Your information is used for account management, content
          personalization, and platform moderation. We never sell or share your
          data with third parties without your consent.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">3. Cookies and Tracking</h2>
        <p className="text-gray-700 text-justify">
          Our site uses cookies for authentication and to remember your
          preferences. You can disable cookies in your browser settings.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
        <p className="text-gray-700 text-justify">
          We implement modern security practices to protect your data. However,
          no system is completely secure and you share data at your own risk.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">5. User Rights</h2>
        <p className="text-gray-700 text-justify">
          You can request to view, edit, or delete your data by contacting
          support. We’ll process requests within a reasonable timeframe.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">6. Changes to Policy</h2>
        <p className="text-gray-700 text-justify">
          This policy may change over time. You’ll be notified of significant
          updates via announcements or email.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
