import React from "react";
import { Helmet } from "react-helmet-async";

const FAQs = () => {
    ;
  const faqs = [
    {
      question: "What is this forum platform about?",
      answer:
        "This is a community-driven platform where users can post questions, share knowledge, and interact through voting, comments, and more.",
    },
    {
      question: "How do I become a member?",
      answer:
        "You can become a member by paying a small fee on the Membership page. Members receive a Gold badge and can post unlimited times.",
    },
    {
      question: "How can I upvote or downvote a post?",
      answer:
        "Log in to your account, then click the upvote/downvote buttons on any post or comment to show your support or disapproval.",
    },
    {
      question: "What are tags used for?",
      answer:
        "Tags help categorize posts and make it easier for users to search for topics they're interested in.",
    },
    {
      question: "How does the reporting system work?",
      answer:
        "Users can report inappropriate comments by selecting feedback and submitting it to the admin. Admins review and take actions accordingly.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4 my-10">
      <Helmet>
        <title>FAQs</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">
        Frequently Asked Questions
      </h2>
      {faqs.map((faq, index) => (
        <div key={index} className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-lg font-medium">
            {faq.question}
          </div>
          <div className="collapse-content text-gray-600">{faq.answer}</div>
        </div>
      ))}
    </div>
  );
};

export default FAQs;
