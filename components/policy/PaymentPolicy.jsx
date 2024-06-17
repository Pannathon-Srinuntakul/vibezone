import React from "react";

const PaymentPolicy = ({ language }) => {
  return (
    <>
      {language === "th" && (
        <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-md my-12">
          <h1 className="text-heading3-bold mb-4">นโยบายการชำระเงิน</h1>
          <p className="text-sm text-gray-700 mb-4">
            มีผลตั้งแต่: 13 มิถุนายน 2024
          </p>
          <p className="text-sm mb-4">
            เอกสารนี้อธิบายเงื่อนไขและเงื่อนไขที่เกี่ยวข้องกับการชำระเงินสำหรับบริการและสินค้าที่นำเสนอโดย
            Framefeeling โดยการทำรายการชำระเงินใดๆ
            บนเว็บไซต์ของเราถือว่าคุณยินยอมปฏิบัติตามนโยบายนี้
          </p>

          <h2 className="text-xl font-bold mb-2">1. บทนำ</h2>
          <p className="mb-4">
            เอกสารนี้กำหนดเงื่อนไขและเงื่อนไขที่เกี่ยวข้องกับการชำระเงินสำหรับบริการและสินค้าที่นำเสนอโดย
            Framefeeling โดยการทำรายการชำระเงินใดๆ
            บนเว็บไซต์ของเราถือว่าคุณยินยอมปฏิบัติตามนโยบายนี้
          </p>

          <h2 className="text-xl font-bold mb-2">2. วิธีการชำระเงิน</h2>
          <p className="mb-4">
            เราใช้ Stripe
            เป็นผู้ประมวลผลการชำระเงินเพื่อให้การทำธุรกรรมการชำระเงินที่ปลอดภัยและทันสมัย
            เราไม่เก็บข้อมูลการชำระเงินของคุณบนเว็บไซต์ของเรา
          </p>

          <h2 className="text-xl font-bold mb-2">3. การซื้อเครดิต</h2>
          <p className="mb-4">
            คุณสามารถซื้อเครดิตผ่าน Stripe โดยใช้บัตรเครดิต/เดบิต
            หลังจากทำการชำระเงินเสร็จสมบูรณ์
            เครดิตจะถูกเพิ่มอัตโนมัติลงในบัญชีของคุณ
            เครดิตที่ซื้อสามารถใช้แลกกับสินค้าหรือบริการบนเว็บไซต์ของเรา
            ของที่ซื้อไปนั้นไม่สามารถขอคืนหรือโอนไปยังบุคคลอื่นได้
          </p>

          <h2 className="text-xl font-bold mb-2">4. ราคา</h2>
          <p className="mb-4">
            ราคาทั้งหมดสำหรับเครดิตและผลิตภัณฑ์แสดงใน [USD,THB]
            และรวมภาษีที่เกี่ยวข้อง ยกเว้นระบุไว้เป็นอย่างอื่น
            เราขอสงวนสิทธิ์ในการเปลี่ยนราคาได้โดยไม่ต้องแจ้งล่วงหน้า
            ราคาที่เรียกเก็บสำหรับการซื้อจะเป็นราคาในขณะที่ทำการสั่งซื้อ
          </p>

          <h2 className="text-xl font-bold mb-2">
            5. ความปลอดภัยในการชำระเงิน
          </h2>
          <p className="mb-4">
            เราใช้ Stripe เพื่อให้มั่นใจในความปลอดภัยของข้อมูลการชำระเงินของคุณ
            การทำธุรกรรมอยู่ภายใต้มาตรฐานความปลอดภัยสูงของ Stripe อย่างไรก็ตาม
            เราไม่รับผิดชอบต่อการแฮ็กหรือการเข้าถึงที่ไม่ได้รับอนุญาตจากบุคคลที่สาม
          </p>

          <h2 className="text-xl font-bold mb-2">
            6. ข้อผิดพลาดและปัญหาในการชำระเงิน
          </h2>
          <p className="mb-4">
            ในกรณีที่เกิดข้อผิดพลาดในการชำระเงิน เช่น
            เครดิตไม่ได้เพิ่มลงในบัญชีหลังจากชำระเงินหรือไม่ได้รับสินค้าที่ซื้อ
            กรุณาติดต่อเราที่{" "}
            <a href="mailto:lifeblance41@gmail.com" className="text-blue-500">
              lifeblance41@gmail.com
            </a>{" "}
            ทันที เราจะพิจารณาและแก้ไขปัญหาโดยเร็วที่สุด
          </p>

          <h2 className="text-xl font-bold mb-2">7. นโยบายการคืนเงิน</h2>
          <p className="mb-4">
            เราจะไม่คืนเงินสำหรับเครดิตที่ซื้อ
            ยกเว้นในกรณีมีข้อผิดพลาดที่เกิดจากเว็บไซต์ของเรา เช่น
            เครดิตไม่ได้รับหลังจากชำระเงินหรือไม่ได้รับสินค้าที่ซื้อ
            การคืนเงินที่ได้รับการอนุมัติจะใช้วิธีการชำระเงินเดิม
            การคืนเงินจะใช้เวลาอย่างน้อย 3 วันทำการหลังจากที่อนุมัติ
            และการตรวจสอบการคืนเงินจะใช้เวลาอย่างน้อย 3
            วันทำการก่อนที่จะอนุมัติว่าจะคืนเงินหรือไม่
          </p>

          <h2 className="text-xl font-bold mb-2">8. การเรียกร้องคืนเงิน</h2>
          <p className="mb-4">
            การเริ่มกระบวนการเรียกร้องคืนเงินกับบริษัทหรือผู้ให้บริการชำระเงินโดยไม่ติดต่อเราเพื่อแก้ไขปัญหาจะถือว่าเป็นการละเมิดนโยบายการชำระเงินของเรา
            กรุณาติดต่อเราทางอีเมล{" "}
            <a href="mailto:lifeblance41@gmail.com" className="text-blue-500">
              lifeblance41@gmail.com
            </a>{" "}
            เพื่อให้เรามีโอกาสแก้ไขปัญหาในทันที หากไม่ทำตามนี้
            เราขอสงวนสิทธิ์ในการระงับหรือยกเลิกบัญชีของคุณโดยไม่ต้องแจ้งล่วงหน้า
            ในกรณีที่มีปัญหาเกี่ยวกับการเติมเงินและมาแจ้งหลังจากผ่านไปแล้ว 7 วัน
            การตรวจสอบอาจใช้เวลานานขึ้นหรือนำไปสู่การไม่คืนเงิน
          </p>
        </div>
      )}
      {language === "en" && (
        <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-md my-12">
          <h1 className="text-heading3-bold mb-4">Payment Policy</h1>
          <p className="text-sm text-gray-700 mb-4">
            Effective Date: June 13 2024
          </p>
          <p className="text-sm mb-4">
            This Payment Policy outlines the terms and conditions related to
            payments for services and products offered by Framefeeling. By
            making a payment on our website, you agree to comply with this
            policy.
          </p>

          <h2 className="text-xl font-bold mb-2">1. Introduction</h2>
          <p className="mb-4">
            This Payment Policy outlines the terms and conditions related to
            payments for services and products offered by Framefeeling. By
            making a payment on our website, you agree to comply with this
            policy.
          </p>

          <h2 className="text-xl font-bold mb-2">2. Payment Methods</h2>
          <p className="mb-4">
            We utilize Stripe as our payment processor, which ensures secure and
            modern payment transactions. We do not store your payment
            information on our website.
          </p>

          <h2 className="text-xl font-bold mb-2">3. Purchase of Credits</h2>
          <p className="mb-4">
            You can purchase credits through Stripe using credit/debit cards.
            After successful payment, credits will be automatically credited to
            your account. Purchased credits can be used to exchange for goods or
            services on our website. Purchased credits are non-refundable and
            non-transferable.
          </p>

          <h2 className="text-xl font-bold mb-2">4. Pricing</h2>
          <p className="mb-4">
            All prices for credits and products are displayed in [USD,THB] and
            include applicable taxes unless otherwise stated. We reserve the
            right to change prices without prior notice. The price charged for a
            purchase will be the price in effect at the time the order is
            placed.
          </p>

          <h2 className="text-xl font-bold mb-2">5. Payment Security</h2>
          <p className="mb-4">
            We use Stripe to ensure the security of your payment information.
            Transactions are subject to Stripe's high-security standards.
            However, we are not liable for any security breaches or unauthorized
            access by third parties.
          </p>

          <h2 className="text-xl font-bold mb-2">
            6. Errors and Payment Issues
          </h2>
          <p className="mb-4">
            In case of payment errors, such as credits not being credited after
            payment or not receiving purchased products, please contact us
            immediately at{" "}
            <a href="mailto:lifeblance41@gmail.com" className="text-blue-500">
              lifeblance41@gmail.com
            </a>
            . We will investigate and resolve the issue promptly.
          </p>

          <h2 className="text-xl font-bold mb-2">7. Refund Policy</h2>
          <p className="mb-4">
            Refunds will not be processed for any credits purchased unless there
            is an error caused by our website, such as credits not being
            credited after payment or not receiving purchased products. Approved
            refunds will be processed using the original payment method. Refunds
            may take at least 3 business days to process, and refund
            verification may take an additional 3 business days before approval
            to refund or not.
          </p>

          <h2 className="text-xl font-bold mb-2">8. Chargebacks</h2>
          <p className="mb-4">
            Initiating a chargeback with the company or payment service provider
            without contacting us to resolve the issue will be considered a
            violation of our payment policy. Please contact us at
            lifeblance41@gmail.com immediately to allow us an opportunity to
            address the issue. Failure to do so may result in the suspension or
            termination of your account without prior notice. Verification of
            issues related to recharging after notification within 7 days.
          </p>
        </div>
      )}
    </>
  );
};

export default PaymentPolicy;
