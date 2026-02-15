"use client";

import React from "react";

export default function AdminNewsletter() {
  const handleAddNewsletter = () => {
    alert("Add Newsletter clicked!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#f82f53]">Admin Newsletter</h1>
      <p>Manage newsletter subscriptions here.</p>

      <button
        onClick={handleAddNewsletter}
        className="mt-6 bg-[#f82f53] text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Add Newsletter
      </button>
    </div>
  );
}
