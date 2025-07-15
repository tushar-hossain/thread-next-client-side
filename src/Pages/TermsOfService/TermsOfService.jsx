import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto my-10 space-y-6">
      <h1 className="text-3xl font-bold text-center text-primary">
        Terms of Service
      </h1>

      <div>
        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p className="text-gray-700">
          By accessing or using our forum platform, you agree to comply with and
          be legally bound by these Terms of Service. If you do not agree with
          any part, please do not use the platform.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">2. User Accounts</h2>
        <p className="text-gray-700">
          You are responsible for maintaining the confidentiality of your
          account credentials. You must notify us immediately of any
          unauthorized use of your account.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">3. Posting Rules</h2>
        <p className="text-gray-700">
          Users may post content relevant to the platform’s purpose. Content
          that is offensive, spammy, harmful, or violates any law will be
          removed, and repeat offenders may be banned.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">4. Membership & Payments</h2>
        <p className="text-gray-700">
          Premium membership allows users to post more frequently and gain
          access to special features. All payments are non-refundable unless
          explicitly stated otherwise.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
        <p className="text-gray-700">
          You retain ownership of your content but grant us a license to use,
          display, and distribute it within our platform. Content may not be
          copied or reused without permission.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
