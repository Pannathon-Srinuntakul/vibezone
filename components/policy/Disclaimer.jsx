import React from "react";

const Disclaimer = ({ language }) => {
  return (
    <>
      {language === "en" && (
        <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-md my-12">
          <h1 className="text-heading3-bold mb-4">Disclaimer</h1>
          <p className="text-sm text-gray-700 mb-4">
            Effective Date: June 13 2024
          </p>
          <p className="text-xl font-bold mb-2">1. Introduction</p>
          <p className="mb-4">
            The website Framefeeling strives to provide accurate and informative
            content for its users. However, we do not guarantee the accuracy or
            completeness of the information published.
          </p>

          <p className="text-xl font-bold mb-2">2. Use of Information</p>
          <p className="mb-4">
            The information provided on this website is for informational
            purposes only and should not be considered financial, medical, or
            legal advice. We do not guarantee the suitability or accuracy of the
            information disclosed.
          </p>

          <p className="text-xl font-bold mb-2">3. Links to Other Websites</p>
          <p className="mb-4">
            Our website may contain links to third-party websites or services.
            These links are provided solely as a convenience to you and not as
            an endorsement or affiliation with those websites. We are not
            responsible for the accuracy, completeness, or suitability of the
            content on those sites.
          </p>

          <p className="text-xl font-bold mb-2">4. Limitation of Liability</p>
          <p className="mb-4">
            We shall not be liable for any damages or losses resulting from the
            use or inability to use the information on this website, including
            financial losses, data loss, or any other damages arising from our
            services.
          </p>

          <p className="text-xl font-bold mb-2">5. Changes</p>
          <p className="mb-4">
            The information and content in this disclaimer may be subject to
            change without notice. Please review this page periodically for
            updates.
          </p>
        </div>
      )}
      {language === "th" && (
        <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-md my-12">
          <h1 className="text-heading3-bold mb-4">ข้อความปฏิเสธความรับผิดชอบ</h1>
          <p className="text-sm text-gray-700 mb-4">
            มีผลตั้งแต่: 13 มิถุนายน 2024
          </p>
          <p className="text-xl font-bold mb-2">1. เบื้องต้น</p>
          <p className="mb-4">
            เว็บไซต์ Framefeeling
            มีเจตจำนงที่จะให้ข้อมูลที่ถูกต้องและประทับใจสำหรับผู้ใช้งาน
            อย่างไรก็ตาม
            เราไม่รับประกันความถูกต้องของข้อมูลทั้งหมดและข้อมูลที่แสดงอาจมีการเปลี่ยนแปลงได้โดยไม่แจ้งให้ทราบล่วงหน้า
          </p>

          <p className="text-xl font-bold mb-2">2. การใช้ข้อมูล</p>
          <p className="mb-4">
            ข้อมูลที่ปรากฏบนเว็บไซต์นี้เป็นเพียงเพื่อเป็นข้อมูลเท่านั้น
            และไม่ควรถือเป็นคำแนะนำทางการเงิน การแพทย์ หรือกฎหมาย
            เราไม่รับประกันถึงความเหมาะสมหรือความถูกต้องของข้อมูลที่เผยแพร่ไว้
          </p>

          <p className="text-xl font-bold mb-2">3. การเชื่อมโยงไปยังเว็บไซต์อื่น</p>
          <p className="mb-4">
            เว็บไซต์ของเราอาจมีการเชื่อมโยงไปยังเว็บไซต์อื่นที่เป็นเว็บไซต์ของบุคคลที่สามหรือบริษัท
            การเชื่อมโยงดังกล่าวเป็นเพียงการให้บริการในการเชื่อมโยงเท่านั้น
            และเราไม่รับประกันความถูกต้อง ความครบถ้วน
            หรือความเหมาะสมของเว็บไซต์เหล่านั้น
          </p>

          <p className="text-xl font-bold mb-2">4. ความรับผิดชอบ</p>
          <p className="mb-4">
            เราไม่รับผิดชอบต่อความเสียหายใด ๆ
            ที่อาจเกิดขึ้นจากการใช้หรือไม่สามารถใช้ข้อมูลที่ปรากฏบนเว็บไซต์นี้ได้
            รวมถึงความสูญเสียทางการเงิน การสูญเสียข้อมูล หรือความเสียหายอื่น ๆ
            ที่เกิดจากการใช้บริการของเรา
          </p>

          <p className="text-xl font-bold mb-2">5. การเปลี่ยนแปลง</p>
          <p>
            ข้อมูลและข้อความใน Disclaimer
            นี้อาจมีการเปลี่ยนแปลงได้โดยไม่ต้องแจ้งให้ทราบล่วงหน้า
            โปรดตรวจสอบหน้าเว็บไซต์นี้เพื่อข้อมูลที่อัปเดตล่าสุด
          </p>
        </div>
      )}
    </>
  );
};

export default Disclaimer;
