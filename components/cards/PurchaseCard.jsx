import { frames } from "@constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PurchaseCard = ({ postId, user }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPurchase, setConfirmPurchase] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  const handleUpgrade = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setShowConfirmation(false);
    try {
      if (user.credit < confirmPurchase.credit) {
        setShowAlert(true);
        setIsLoading(false);
        return;
      }
      const response = await fetch(`/api/post/${postId}/frame`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: confirmPurchase.type,
          credit: confirmPurchase.credit,
          userId: user._id,
        }),
      });

      if (response.ok) {
        router.push(`/profile/${user.username}`);
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error("Error upgrade:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-xl mt-20 w-5/6 sm:w-2/3 lg:mt-0 lg:w-1/2 shadow-lg grid grid-cols-2 grid-rows-3 sm:grid-cols-3 sm:grid-rows-2 gap-5 place-items-center justify-items-center p-5">
      {frames.map((frame, index) => (
        <div key={index} className="purchase-card">
          <Image
            src={frame.frame}
            alt={frame.label}
            width={150}
            height={50}
            className="shadow-lg"
          />
          {frame.type === "Cloud" ? (
            <p className="text-red-600 font-bold text-tiny-medium">*DEMO*</p>
          ) : null}
          <p className="flex gap-2">
            {frame.credit === 0 ? "Free" : `${frame.credit} Credit`}
            <Image src="/assets/coin.svg" alt="credit" width={15} height={15} />
          </p>
          <button
            className="upgrade-button"
            onClick={() => {
              setConfirmPurchase(frame), setShowConfirmation(true);
            }}
          >
            Upgrade
          </button>
        </div>
      ))}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-10">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="mb-4">
              Confirm to spend{" "}
              <span className="text-body-bold">{confirmPurchase.credit}</span>{" "}
              credits?
            </p>
            <p className="mb-4 text-red-600 text-body-bold">
              *Please check the details before submitting. Once confirmed, you
              will not be able to edit it.
            </p>
            <p className="mb-4 text-body-bold">
              Upgrade frame to {confirmPurchase.label}
              {confirmPurchase.type === "Cloud" ? (
            <p className="text-red-600 text-body-bold">*DEMO*</p>
          ) : null}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowConfirmation(false), setConfirmPurchase({});
                }}
                className="py-2 px-4 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpgrade}
                className="py-2 px-4 bg-[#f1592a] text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-red-500">You do not have enough credits.</p>
            <button
              onClick={() => setShowAlert(false)}
              className="py-2 px-4 bg-gray-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-red-500">Frame type is already the same.</p>
            <button
              onClick={() => setShowError(false)}
              className="py-2 px-4 bg-gray-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseCard;
