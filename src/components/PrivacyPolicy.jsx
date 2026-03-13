import React from "react";
import ScrollTop from "./ScrollTop";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-[7%]">
      <ScrollTop/>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10">

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-6 text-sm md:text-base text-center">
          Effective Date: March 13, 2026
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          Welcome to <span className="font-semibold">Innovation Plastic Cans Ltd.</span>. 
          Your privacy is important to us. This Privacy Policy explains how we collect, 
          use, and protect your personal information when you visit our website or use our services.
        </p>

        {/* Section */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
            1. Information We Collect
          </h2>

          <p className="text-gray-700 mb-4">
            We may collect personal and non-personal information to improve our services.
          </p>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Phone Number</li>
            <li>Company Name</li>
            <li>Shipping or Billing Address</li>
            <li>IP Address and Browser Information</li>
          </ul>
        </section>

        {/* Section */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
            2. How We Use Your Information
          </h2>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Provide and improve our services</li>
            <li>Respond to inquiries and quote requests</li>
            <li>Process orders and transactions</li>
            <li>Improve website performance</li>
            <li>Send updates and company information</li>
          </ul>
        </section>

        {/* Section */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
            3. Cookies
          </h2>

          <p className="text-gray-700 leading-relaxed">
            Our website may use cookies to enhance your browsing experience. Cookies help us
            understand user behavior and improve website performance. You can disable cookies
            through your browser settings if you prefer.
          </p>
        </section>

        {/* Section */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
            4. Data Protection
          </h2>

          <p className="text-gray-700 leading-relaxed">
            We take appropriate security measures to protect your personal information,
            including secure servers, restricted data access, and monitoring our systems
            for potential vulnerabilities.
          </p>
        </section>

        {/* Section */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
            5. Sharing Your Information
          </h2>

          <p className="text-gray-700 leading-relaxed">
            We do not sell or rent your personal information. Your information may only be
            shared with trusted partners who assist in operating our website or when required
            by law.
          </p>
        </section>

        {/* Section */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
            6. Third-Party Links
          </h2>

          <p className="text-gray-700 leading-relaxed">
            Our website may contain links to third-party websites. We are not responsible
            for the privacy practices or content of those websites.
          </p>
        </section>

        {/* Section */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
            7. Your Rights
          </h2>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Request access to your personal data</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal data</li>
            <li>Opt out of marketing communications</li>
          </ul>
        </section>

        {/* Section */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
            8. Policy Updates
          </h2>

          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be
            posted on this page with an updated effective date.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
            9. Contact Us
          </h2>

          <p className="text-gray-700 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us:
          </p>

          <div className="mt-3 text-gray-700">
            <p className="font-medium">Innovation Plastic Cans Ltd.</p>
            <p>Email: info@innovationplasticcans.com</p>
            <p>Phone: +880XXXXXXXXXX</p>
            <p>Address: Bangladesh</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;