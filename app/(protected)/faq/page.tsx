'use client';

import React from 'react';

const FAQPage = () => {
  const faqs = [
    {
      question: "What can I charge per link?",
      answer: "Each link can be as little as $0.99 and as much as $999. Feel limited? ",
      linkText: "Email us",
      linkHref: "mailto:hi@gumroad.com"
    },
    {
      question: "What is Gumroad's cut?",
      answer: "Simple. It's 5% + $0.30 for each transaction. We're working hard to get this lower."
    },
    {
      question: "How do I get paid?",
      answer: "A PayPal deposit at the end of every month. We are looking into alternatives."
    },
    {
      question: "Why is this FAQ so short?",
      answer: "We believe that with simple products come short FAQs. Please ",
      linkText: "send us an email",
      linkHref: "mailto:hi@gumroad.com"
    }
  ];

  return (
    <div id="main-content">
      <h3>Learn the ins and outs of Gumroad.</h3>
      <div className="mini-rule"></div>
      <ol>
        {faqs.map((faq, index) => (
          <li key={index}>
            <h4>{faq.question}</h4>
            <p>
              {faq.answer}
              {faq.linkText && (
                <>
                  <a href={faq.linkHref}>{faq.linkText}</a>.
                </>
              )}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default FAQPage;
