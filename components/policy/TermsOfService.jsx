import React from "react";

const TermsOfService = ({ language }) => {
  return (
    <>
      {language === "th" && (
        <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-md my-12">
          <h1 className="text-heading3-bold mb-6">เงื่อนไขการให้บริการ</h1>

          <p className="text-sm text-gray-700 mb-4">
            มีผลตั้งแต่: 13 มิถุนายน 2024
          </p>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">1. บทนำ</h2>
            <p className="mb-2">
              ยินดีต้อนรับสู่ Framefeeling โดยการเข้าถึงหรือใช้บริการนี้
              คุณยอมรับที่จะปฏิบัติตามข้อกำหนดการให้บริการเหล่านี้
              หากคุณไม่ยอมรับข้อกำหนดเหล่านี้ กรุณาหยุดการใช้งานเว็บไซต์ทันที
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              2. การแก้ไขข้อกำหนดการให้บริการ
            </h2>
            <p className="mb-2">
              เราขอสงวนสิทธิ์ในการแก้ไขหรือปรับปรุงข้อกำหนดการให้บริการนี้ได้ทุกเมื่อ
              การเปลี่ยนแปลงจะมีผลบังคับใช้ทันทีที่เราโพสต์บนเว็บไซต์
              การใช้บริการหลังจากที่มีการเปลี่ยนแปลงข้อกำหนดนี้ถือว่าคุณยอมรับการเปลี่ยนแปลงดังกล่าว
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              3. การสมัครสมาชิกและบัญชีผู้ใช้
            </h2>
            <p className="mb-2">
              การสมัครสมาชิกและการใช้บัญชีผู้ใช้จะดำเนินการผ่านระบบ Clerk
              คุณต้องรับผิดชอบในการรักษาความปลอดภัยของบัญชีของคุณและข้อมูลการเข้าสู่ระบบทั้งหมด
              หากไม่ได้ล็อกอิน คุณยังสามารถโพสต์ในฐานะแขกโดยเราจะเก็บบันทึก IP
              ของคุณเพื่อการตรวจสอบและรักษาความปลอดภัย
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              4. การชำระเงินและการคืนเงิน
            </h2>
            <p className="mb-2">
              การชำระเงินสำหรับการซื้อเครดิตในเว็บไซต์ของเราเป็นไปตามนโยบายการชำระเงินของเรา
              การคืนเงินจะไม่มีการดำเนินการในทุกกรณี
              ยกเว้นเมื่อเกิดความผิดพลาดที่เกิดจากเว็บไซต์ เช่น
              การเติมเงินแล้วเครดิตไม่เข้า หรือการซื้อสินค้าแล้วไม่ได้รับสินค้า
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              5. การใช้งานเนื้อหาและข้อห้าม
            </h2>
            <p className="mb-2">
              คุณไม่สามารถโพสต์เนื้อหาที่ผิดกฎหมาย เช่น สื่อลามก ความรุนแรง
              ความอันตราย การพนัน และทุกอย่างที่ไม่เหมาะสม นอกจากนี้
              ห้ามนำกรอบรูปที่ได้จากเว็บไซต์ของเราไปใช้ในทางที่ผิดกฎหมายหรือไม่เหมาะสม
              เราขอสงวนสิทธิ์ในการลบเนื้อหาที่ละเมิดข้อกำหนดนี้และดำเนินการตามกฎหมายหากจำเป็น
            </p>
          </section>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">6. การโพสต์โฆษณา</h2>
            <p className="mb-2">
              เพื่อให้เกิดการใช้บริการที่เป็นระเบียบและปลอดภัยสำหรับชุมชนผู้ใช้งาน
              เราขอให้การโพสต์โฆษณาบนเว็บไซต์ของเราปฏิบัติตามนโยบายที่เคร่งครัดและชัดเจน
              ห้ามโพสต์โฆษณาที่มีเนื้อหาซึ่งเป็นสื่อลามกอนาจาร
              หรือเนื้อหาที่เสียหายต่อผู้อื่น เช่น การส่งเสริมความรุนแรง
              การก่อให้เกิดความเสียหาย หรือการละเมิดข้อกำหนดทางกฎหมาย
            </p>
            <p className="mb-2">
              นอกจากนี้ ห้ามโพสต์ลิงก์ที่มีลักษณะเป็นการหลอกลวง
              หรือมีเจตนาเพื่อการฉ้อโกงผู้ใช้งานของเรา
              การละเมิดนโยบายนี้อาจทำให้โฆษณาของคุณถูกลบโดยไม่มีการแจ้งเตือนล่วงหน้า
              และหากพบการกระทำที่ร้ายแรงหรือผิดกฎหมาย
              เราขอสงวนสิทธิ์ในการดำเนินการทางกฎหมาย
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              7. การยกเลิกและการปิดบัญชี
            </h2>
            <p className="mb-2">
              เมื่อเปิดบัญชีแล้ว คุณจะไม่สามารถปิดบัญชีได้
              หากคุณละเมิดข้อกำหนดการให้บริการนี้
              เราขอสงวนสิทธิ์ในการปิดหรือแบนบัญชีของคุณโดยอัตโนมัติ
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              8. ข้อจำกัดความรับผิดชอบ
            </h2>
            <p className="mb-2">
              เราจะไม่รับผิดชอบต่อความเสียหายใดๆ
              ที่เกิดขึ้นจากการใช้หรือไม่สามารถใช้บริการของเรา
              รวมถึงความเสียหายทางตรง ทางอ้อม หรือความเสียหายที่เป็นผลพวง
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              9. ทรัพย์สินทางปัญญา
            </h2>
            <p className="mb-2">
              เนื้อหาและทรัพย์สินทางปัญญาทั้งหมดที่ปรากฏบนเว็บไซต์นี้
              เป็นทรัพย์สินของเราและผู้ร่วมงาน ห้ามทำซ้ำ แจกจ่าย
              หรือใช้เพื่อการค้าโดยไม่ได้รับอนุญาต
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              10. กฎหมายที่ใช้บังคับ
            </h2>
            <p className="mb-2">
              ข้อกำหนดการให้บริการนี้จะถูกตีความและบังคับใช้ตามกฎหมายของประเทศไทย
              ข้อพิพาทใดๆ ที่เกิดขึ้นจะต้องถูกดำเนินการในเขตอำนาจศาลของประเทศไทย
            </p>
          </section>
        </div>
      )}
      {language === "en" && (
        <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-md my-12">
          <h1 className="text-heading3-bold mb-6">Terms of Service</h1>

          <p className="text-sm text-gray-700 mb-4">
            Effective Date: June 13 2024
          </p>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-2">
              Welcome to Framefeeling By accessing or using this service You
              agree to comply with these terms of service If you do not accept
              these terms, please stop using the website immediately.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              2. Modification of Terms of Service
            </h2>
            <p className="mb-2">
              We reserve the right to modify or amend these terms of service at
              any time. Changes will be effective immediately upon posting on
              the website. Your use of the service after such changes
              constitutes your acceptance of the amended terms.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              3. Membership and User Accounts
            </h2>
            <p className="mb-2">
              Membership and use of user accounts will be processed through the
              Clerk system. You are responsible for maintaining the security of
              your account and all login information. If you are not logged in,
              you can still post as a guest and we will record your IP address
              for verification and security purposes.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              4. Payment and Refunds
            </h2>
            <p className="mb-2">
              Payments for purchasing credits on our website are subject to our
              payment policy. Refunds will not be processed in all cases, except
              in cases where errors occur on the website, such as topping up
              credits but not receiving them or purchasing goods but not
              receiving them.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              5. Use of Content and Prohibitions
            </h2>
            <p className="mb-2">
              You may not post content that is illegal, such as hate speech,
              violence, danger, gambling and anything inappropriate. In
              addition, it is prohibited to misuse frames obtained from our
              website for illegal or inappropriate purposes. We reserve the
              right to remove content that violates these terms and take legal
              action if necessary.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              6. Advertising Policy
            </h2>
            <p className="mb-2">
              To ensure a structured and safe user experience, all advertising
              posted on our website must adhere strictly to our policies, which
              are designed to maintain community standards and safety.
              Prohibited content includes advertisements containing hate speech,
              content that harms others, such as promoting violence, causing
              harm, or violating legal terms.
            </p>
            <p className="mb-2">
              Furthermore, posting misleading links or intending to deceive our
              users is strictly prohibited. Violations of this policy may result
              in the immediate removal of your advertisement without prior
              notice. Additionally, severe or unlawful actions may lead to legal
              consequences.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              7. Cancellation and Account Closure
            </h2>
            <p className="mb-2">
              Once an account is opened, you cannot close it. If you violate
              these terms of service, we reserve the right to automatically
              close or ban your account.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              8. Limitation of Liability
            </h2>
            <p className="mb-2">
              We shall not be liable for any damages arising from your use or
              inability to use our services, including direct, indirect, or
              consequential damages.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              9. Intellectual Property
            </h2>
            <p className="mb-2">
              All content and intellectual property appearing on this website
              are our property and our collaborators. Duplication, distribution,
              or commercial use without permission is prohibited.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
            <p className="mb-2">
              These terms of service shall be interpreted and enforced in
              accordance with the laws of Thailand. Any disputes arising shall
              be handled within the jurisdiction of Thai courts.
            </p>
          </section>
        </div>
      )}
    </>
  );
};

export default TermsOfService;
