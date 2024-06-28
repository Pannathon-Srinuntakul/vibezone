"use client";

import React, { useState } from "react";

const ToggleStatus = ({ id, postStatus }) => {
  const [status, setStatus] = useState(postStatus);
  const [isLoading, setIsLoading] = useState(false);

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
        console.error("Failed to save bio");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to change status");
      setIsLoading(false);
    }
  };

  return (
    <label
      htmlFor="status"
      className="cursor-pointer flex items-center gap-1.5"
    >
      <p className="text-tiny-medium">{status}</p>
      <div className="relative inline-block w-10 align-middle select-none">
        <input
          type="checkbox"
          id="status"
          checked={status === "Public"}
          onChange={handleToggle}
          className="sr-only peer"
        />

        <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </div>
    </label>
  );
};

export default ToggleStatus;
