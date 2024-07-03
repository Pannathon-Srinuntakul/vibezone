"use client";

import CopyRightsPolicy from "@components/policy/CopyRightsPolicy";
import Disclaimer from "@components/policy/Disclaimer";
import PaymentPolicy from "@components/policy/PaymentPolicy";
import PrivatePolicy from "@components/policy/PrivatePolicy";
import TermsOfService from "@components/policy/TermsOfService";
import {
  EmailOutlined,
  Facebook,
  Instagram,
  Language,
} from "@mui/icons-material";
import React, { useState } from "react";

const Page = () => {
  const [language, setLanguage] = useState("en");
  const [showPrivatePolicy, setShowPrivatePolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);
  const [showPaymentPolicy, setShowPaymentPolicy] = useState(false);
  const [showCopyRightsPolicy, setShowCopyRightsPolicy] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "th" ? "en" : "th"));
  };

  const toggleShowPrivatePolicy = () => {
    setShowPrivatePolicy((prevState) => !prevState); // สลับการแสดงเนื้อหานโยบายความเป็นส่วนตัว
  };

  const toggleShowTermsOfService = () => {
    setShowTermsOfService((prevState) => !prevState); // สลับการแสดงเนื้อหานโยบายเงื่อนไขการให้บริการ
  };

  const toggleShowPaymentPolicy = () => {
    setShowPaymentPolicy((prevState) => !prevState); // สลับการแสดงเนื้อหานโยบายการชำระเงิน
  };

  const toggleShowCopyRightsPolicy = () => {
    setShowCopyRightsPolicy((prevState) => !prevState); // สลับการแสดงเนื้อหานโยบายลิขสิทธิ์
  };

  const toggleShowDisclaimer = () => {
    setShowDisclaimer((prevState) => !prevState); // สลับการแสดงเนื้อหานโยบายความปลอดภัยและความสงบสุข
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-md my-16 flex flex-col">
      <div className="w-full flex items-center justify-center p-3">
        <button
          className="bg-gray-100 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
          onClick={toggleLanguage}
        >
          {language === "th" ? (
            <>
              <Language /> th
            </>
          ) : (
            <>
              <Language /> en
            </>
          )}
        </button>
      </div>
      <div className="w-full flex flex-col justify-start items-start p-3 sm:p-0 gap-3">
        {/* ปุ่มแสดง/ซ่อน นโยบายแต่ละประเภท */}
        <button
          className={`bg-gray-100 w-full ${
            showPrivatePolicy ? "bg-gray-300" : null
          } hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mb-2`}
          onClick={toggleShowPrivatePolicy}
        >
          {language === "th" ? "นโยบายความเป็นส่วนตัว" : "Private Policy"}
        </button>
        {showPrivatePolicy && <PrivatePolicy language={language} />}

        <button
          className={`bg-gray-100 w-full ${
            showTermsOfService ? "bg-gray-300" : null
          } hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mb-2`}
          onClick={toggleShowTermsOfService}
        >
          {language === "th" ? "เงื่อนไขการให้บริการ" : "Terms of Service"}
        </button>
        {showTermsOfService && <TermsOfService language={language} />}

        <button
          className={`bg-gray-100 w-full ${
            showPaymentPolicy ? "bg-gray-300" : null
          } hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mb-2`}
          onClick={toggleShowPaymentPolicy}
        >
          {language === "th" ? "นโยบายการชำระเงิน" : "Payment Policy"}
        </button>
        {showPaymentPolicy && <PaymentPolicy language={language} />}

        <button
          className={`bg-gray-100 w-full ${
            showCopyRightsPolicy ? "bg-gray-300" : null
          } hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mb-2`}
          onClick={toggleShowCopyRightsPolicy}
        >
          {language === "th" ? "นโยบายลิขสิทธิ์" : "Copy Rights Policy"}
        </button>
        {showCopyRightsPolicy && <CopyRightsPolicy language={language} />}

        <button
          className={`bg-gray-100 w-full ${
            showDisclaimer ? "bg-gray-300" : null
          } hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mb-2`}
          onClick={toggleShowDisclaimer}
        >
          {language === "th" ? "ข้อความปฏิเสธความรับผิดชอบ" : "Disclaimer"}
        </button>
        {showDisclaimer && <Disclaimer language={language} />}
      </div>
      <h3 className="text-base font-semibold mt-5">
        {language === "th" ? "ติดต่อเรา" : "Contact Us"}
      </h3>
      <p className="text-sm text-gray-700 mb-4">
        {language === "th"
          ? "หากคุณมีคำถามหรือข้อกังวลใด ๆ เกี่ยวกับนโยบายเหล่านี้กรุณาติดต่อเราที่:"
          : "If you have any questions or concerns about these policies, please contact us at:"}
      </p>
      <ul className="list-disc pl-4 mb-4">
        <li>
          <EmailOutlined />{" "}
          <a
            href="mailto:lifeblance41@gmail.com"
            className="text-blue-500"
            target="_blank"
          >
            lifeblance41@gmail.com
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/profile.php?id=61561185321578&mibextid=LQQJ4d"
            target="_blank"
          >
            <Facebook /> <span className="text-blue-500">Framefeeling</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/lifeblance41?igsh=MXdlOWxoYnl3eDVpaA%3D%3D&utm_source=qr"
            target="_blank"
          >
            <Instagram /> <span className="text-blue-500">Framefeeling</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Page;
