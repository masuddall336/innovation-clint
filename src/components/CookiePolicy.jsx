import React from "react";
import ScrollTop from "./ScrollTop";

const CookiePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 mt-[10%]   bg-white shadow-lg rounded-2xl p-6">
      <ScrollTop/>
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

      <p className="mb-4">
        This Cookie Policy explains how <strong>Innovation Plastic</strong> 
        ("we", "our", or "us") uses cookies and similar technologies on 
        <strong> www.innovation-plastic.com</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. What Are Cookies</h2>
      <p className="mb-4">
        Cookies are small text files stored on your device when you visit a 
        website. They help websites function properly, improve user experience,
        and provide information to website owners about how visitors interact 
        with the site.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Cookies</h2>
      <p className="mb-4">
        Innovation Plastic uses cookies to:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Ensure the website functions correctly</li>
        <li>Improve website performance and user experience</li>
        <li>Analyze website traffic and visitor behavior</li>
        <li>Remember user preferences</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Types of Cookies We Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>
          <strong>Essential Cookies:</strong> Required for basic website
          functionality such as navigation and secure areas.
        </li>
        <li>
          <strong>Performance Cookies:</strong> Help us understand how visitors
          interact with our website so we can improve it.
        </li>
        <li>
          <strong>Functional Cookies:</strong> Allow the website to remember
          choices you make such as language or region.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        4. Third-Party Cookies
      </h2>
      <p className="mb-4">
        Some cookies may be placed by third-party services such as analytics
        providers. These third parties may collect information about your
        online activities over time and across different websites.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        5. Managing Cookies
      </h2>
      <p className="mb-4">
        You can control or delete cookies through your browser settings.
        Most browsers allow you to block or remove cookies. However, disabling
        cookies may affect the functionality of some parts of the website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        6. Updates to This Policy
      </h2>
      <p className="mb-4">
        We may update this Cookie Policy from time to time to reflect changes
        in technology, law, or our business practices.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        7. Contact Us
      </h2>
      <p>
        If you have any questions about this Cookie Policy, please contact us
        through our website: <strong>www.innovation-plastic.com</strong>
      </p>
    </div>
  );
};

export default CookiePolicy;