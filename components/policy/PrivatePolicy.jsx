import React from "react";

const PrivatePolicy = ({ language }) => {
  return (
    <>
      {language === "en" && (
        <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-md my-12">
          <h2 className="text-heading3-bold mb-4">Privacy Policy</h2>

          <p className="text-sm text-gray-700 mb-4">
            Effective Date: June 13 2024
          </p>

          <h3 className="text-base font-semibold mb-2">
            1. Information We Collect
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            We may collect personal information from you to improve our services
            and enhance your experience on our website. The information we
            collect includes:
          </p>
          <ul className="list-disc pl-4 mb-4">
            <li>
              <span className="font-semibold">
                Personally Identifiable Information:
              </span>{" "}
              This includes your name, email address, and phone number, which
              you provide to us through registration or other forms on our
              website.
            </li>
            <li>
              <span className="font-semibold">Usage Data:</span> This includes
              your IP address, browser type, access times, and the pages you
              visit. This information helps us analyze and improve our website.{" "}
              <span className="font-bold text-red-600">
                Please note that we will only record IP addresses for guests
                posting without logging in. For logged-in users, we will not
                record IP addresses.
              </span>
            </li>
          </ul>

          <h3 className="text-base font-semibold mb-2">
            2. How We Use Your Information
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            We use the collected information for the following purposes:
          </p>
          <ul className="list-disc pl-4 mb-4">
            <li>To improve and develop our website and services.</li>
            <li>To analyze website usage and enhance user experience.</li>
            <li>
              To communicate with you about updates or changes related to our
              services.
            </li>
            <li>
              To prevent and detect any misuse or violations of our policies.
            </li>
          </ul>

          <h3 className="text-base font-semibold mb-2">
            3. Disclosure of Information
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            We do not disclose your personal information to third parties,
            except in the following circumstances:
          </p>
          <ul className="list-disc pl-4 mb-4">
            <li>With your consent.</li>
            <li>
              To comply with legal obligations, court orders, or other legal
              processes.
            </li>
            <li>
              To protect our rights, property, or the safety of our users.
            </li>
          </ul>

          <h3 className="text-base font-semibold mb-2">4. Data Security</h3>
          <p className="text-sm text-gray-700 mb-4">
            We implement appropriate security measures to protect your personal
            information from unauthorized access, disclosure, or destruction.
            However, no internet transmission or data storage method can be
            guaranteed to be 100% secure.
          </p>

          <h3 className="text-base font-semibold mb-2">
            5. Changes to This Privacy Policy
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            We reserve the right to modify this privacy policy as necessary. Any
            changes will be posted on this page, and we will notify you through
            email or other appropriate means.
          </p>
        </div>
      )}
      {language === "th" && (
        <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-md my-12">
          <h1 className="text-heading3-bold mb-4">นโยบายความเป็นส่วนตัว</h1>
          <p className="text-sm text-gray-700 mb-4">
            มีผลตั้งแต่: 13 มิถุนายน 2024
          </p>

          <h2 className="text-xl font-bold mb-2">1. ข้อมูลที่เราจะเก็บ</h2>
          <p className="mb-4">
            เราอาจจะเก็บข้อมูลส่วนบุคคลจากคุณเพื่อปรับปรุงบริการและเพิ่มประสบการณ์ของคุณในเว็บไซต์ของเรา
            ข้อมูลที่เราเก็บประกอบด้วย:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>
              ข้อมูลที่สามารถระบุตัวตนได้: เช่น ชื่อ, ที่อยู่อีเมล,
              และหมายเลขโทรศัพท์
              ซึ่งคุณจะให้แก่เราผ่านการลงทะเบียนหรือแบบฟอร์มอื่นในเว็บไซต์ของเรา
            </li>
            <li>
              ข้อมูลการใช้งาน: เช่น ที่อยู่ IP, ประเภทของเบราว์เซอร์,
              เวลาที่เข้าถึง, และหน้าที่คุณเยี่ยมชม
              เราใช้ข้อมูลนี้เพื่อวิเคราะห์และปรับปรุงเว็บไซต์ของเรา{" "}
              <span className="font-bold text-red-600">
                โปรดทราบว่า เราจะบันทึกที่อยู่ IP
                เฉพาะผู้ที่โพสต์ในฐานะแขกเท่านั้น สำหรับผู้ที่ล็อกอิน
                เราจะไม่ทำการบันทึกที่อยู่ IP ของคุณ
              </span>
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-2">2. วิธีการใช้ข้อมูลของคุณ</h2>
          <p className="mb-4">เราใช้ข้อมูลที่เก็บได้ดังนี้:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>เพื่อปรับปรุงและพัฒนาเว็บไซต์และบริการของเรา</li>
            <li>เพื่อวิเคราะห์การใช้งานของเว็บไซต์และเพิ่มประสบการณ์ผู้ใช้</li>
            <li>
              เพื่อติดต่อคุณเกี่ยวกับการอัปเดตหรือการเปลี่ยนแปลงที่เกี่ยวข้องกับบริการของเรา
            </li>
            <li>
              เพื่อป้องกันและตรวจจับการใช้งานที่ไม่เหมาะสมหรือการละเมิดนโยบายของเรา
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-2">3. การเปิดเผยข้อมูล</h2>
          <p className="mb-4">
            เราไม่เปิดเผยข้อมูลส่วนบุคคลของคุณแก่บุคคลที่สาม
            ยกเว้นในกรณีต่อไปนี้:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>ด้วยความยินยอมจากคุณ</li>
            <li>
              เพื่อปฏิบัติตามหน้าที่ตามกฎหมาย, คำสั่งศาล
              หรือกระบวนการทางกฎหมายอื่นๆ
            </li>
            <li>
              เพื่อปกป้องสิทธิ์, ทรัพย์สิน, หรือความปลอดภัยของผู้ใช้ของเรา
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-2">4. ความปลอดภัยของข้อมูล</h2>
          <p className="mb-4">
            เราใช้มาตรการความปลอดภัยที่เหมาะสมเพื่อป้องกันข้อมูลส่วนบุคคลของคุณจากการเข้าถึงโดยไม่ได้รับอนุญาต,
            เปิดเผย, หรือทำลาย อย่างไรก็ตาม,
            การส่งข้อมูลทางอินเทอร์เน็ตหรือวิธีการเก็บข้อมูลอาจไม่สามารถรับประกันได้ว่ามีความปลอดภัยอย่างสมบูรณ์
            100%
          </p>

          <h2 className="text-xl font-bold mb-2">
            5. การเปลี่ยนแปลงนโยบายความเป็นส่วนตัวนี้
          </h2>
          <p className="mb-4">
            เราขอสงวนสิทธิ์ในการแก้ไขนโยบายความเป็นส่วนตัวนี้ตามที่จำเป็น
            การเปลี่ยนแปลงใดๆ จะมีการโพสต์บนหน้าเว็บนี้
            และเราจะแจ้งให้คุณทราบผ่านทางอีเมลหรือช่องทางที่เหมาะสม
          </p>
        </div>
      )}
    </>
  );
};

export default PrivatePolicy;
