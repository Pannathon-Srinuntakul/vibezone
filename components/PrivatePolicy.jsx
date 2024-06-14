

import { EmailOutlined, Facebook, Instagram } from "@mui/icons-material";
import React from "react";

const PrivatePolicy = () => {
  return (
<div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-md my-16">
  <h2 className="text-lg font-semibold mb-4">Privacy Policy</h2>

  <p className="text-sm text-gray-700 mb-4">
    Effective Date: June 13 2024
  </p>

  <h3 className="text-base font-semibold mb-2">1. Information We Collect</h3>
  <p className="text-sm text-gray-700 mb-4">
    We may collect personal information from you to improve our services and enhance your experience on our website. The information we collect includes:
  </p>
  <ul className="list-disc pl-4 mb-4">
    <li>
      <span className="font-semibold">Personally Identifiable Information:</span> This includes your name, email address, and phone number, which you provide to us through registration or other forms on our website.
    </li>
    <li>
      <span className="font-semibold">Usage Data:</span> This includes your IP address, browser type, access times, and the pages you visit. This information helps us analyze and improve our website. <span className="font-bold">Note that we only log IP addresses for guests who are logged in.</span>
    </li>
  </ul>

  <h3 className="text-base font-semibold mb-2">2. How We Use Your Information</h3>
  <p className="text-sm text-gray-700 mb-4">
    We use the collected information for the following purposes:
  </p>
  <ul className="list-disc pl-4 mb-4">
    <li>To improve and develop our website and services.</li>
    <li>To analyze website usage and enhance user experience.</li>
    <li>To communicate with you about updates or changes related to our services.</li>
    <li>To prevent and detect any misuse or violations of our policies.</li>
  </ul>

  <h3 className="text-base font-semibold mb-2">3. Disclosure of Information</h3>
  <p className="text-sm text-gray-700 mb-4">
    We do not disclose your personal information to third parties, except in the following circumstances:
  </p>
  <ul className="list-disc pl-4 mb-4">
    <li>With your consent.</li>
    <li>To comply with legal obligations, court orders, or other legal processes.</li>
    <li>To protect our rights, property, or the safety of our users.</li>
  </ul>

  <h3 className="text-base font-semibold mb-2">4. Data Security</h3>
  <p className="text-sm text-gray-700 mb-4">
    We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, or destruction. However, no internet transmission or data storage method can be guaranteed to be 100% secure.
  </p>

  <h3 className="text-base font-semibold mb-2">5. Your Rights</h3>
  <p className="text-sm text-gray-700 mb-4">
    You have the right to access, correct, or delete your personal information that we have collected. If you wish to exercise these rights, please contact us using the information below.
  </p>

  <h3 className="text-base font-semibold mb-2">6. Changes to This Privacy Policy</h3>
  <p className="text-sm text-gray-700 mb-4">
    We reserve the right to modify this privacy policy as necessary. Any changes will be posted on this page, and we will notify you through email or other appropriate means.
  </p>

  <h3 className="text-base font-semibold mb-2">7. Contact Us</h3>
  <p className="text-sm text-gray-700 mb-4">
    If you have any questions or concerns about this privacy policy, please contact us at:
  </p>
  <ul className="list-disc pl-4 mb-4">
    <li><EmailOutlined />lifeblance41@gmail.com</li>
    <li><a href="https://www.facebook.com/profile.php?id=61561185321578&mibextid=LQQJ4d" className="font-semibold"><Facebook />Framefeeling</a></li>
    <li><a href="https://www.instagram.com/lifeblance41?igsh=MXdlOWxoYnl3eDVpaA%3D%3D&utm_source=qr" className="font-semibold"><Instagram />Framefeeling</a></li>
  </ul>
</div>

  );
};

export default PrivatePolicy;
