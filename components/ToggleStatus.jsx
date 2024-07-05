import React, { useState, useEffect } from "react";

const ToggleStatus = ({ id, postStatus, sx }) => {
  const [status, setStatus] = useState(postStatus);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setStatus(postStatus);
  }, [postStatus]);

  const handleToggle = async () => {
    if (isLoading) return;
    const newStatus = status === "Private" ? "Public" : "Private";
    setStatus(newStatus);
    try {
      setIsLoading(true);
      const response = await fetch(`/api/post/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newStatus }),
      });
      if (response.ok) {
        setIsLoading(false);
      } else {
        console.error("Failed to save status");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to change status");
      setIsLoading(false);
    }
  };

  return (
    <div className="cursor-pointer flex items-center gap-1.5">
      <p className={`text-tiny-medium text-${sx?.color}`}>{status}</p>
      <div className="relative inline-block w-10 align-middle select-none">
        <button
          className={`w-[42px] h-[25px] rounded-full flex items-center focus:outline-none transition-colors ${
            status === "Public" ? "bg-blue-600" : "bg-gray-200"
          }`}
          onClick={handleToggle}
          disabled={isLoading}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
              status === "Public" ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ToggleStatus;
