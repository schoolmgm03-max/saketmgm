// components/AffiliationCard.tsx
import React from "react";
import Image from "next/image";

const AffiliationCard = () => {
  return (
    <div className="max-w-2xl mx-auto bg-green-50 border rounded-lg shadow p-6 text-center mt-5">
      <p className="text-red-600 font-semibold uppercase text-sm mb-4">
        AN ISO 9001:2020 CERTIFIED SCHOOL
      </p>

      <p className="text-green-800 italic font-medium mb-6">
        The school is affiliated to <br />
        <span className="text-orange-600 font-semibold">
          Central Board of Secondary Education,
        </span>
        <br />
        New Delhi Class Nursery to 12th
      </p>

      <div className="flex justify-center items-center border border-orange-400 rounded mb-6 max-w-md mx-auto">
        <div className="px-4 py-2 border-r border-orange-400 font-medium text-gray-700">
          Affiliation No.
        </div>
        <div className="px-6 py-2 text-gray-800 font-semibold">1030477</div>
      </div>

      <div className="flex justify-center mb-6">
        <Image
          src="https://res.cloudinary.com/drlidswcd/image/upload/v1756448764/cbse-logo_wnbmjw.png" // ✅ place logo inside /public folder
          alt="CBSE Logo"
          width={200}
          height={200}
          style={{ width: "150px", height: "auto" }}
          className="mx-auto"
        />
      </div>

      <hr className="my-6 border-green-300" />

      <div className="text-green-900 font-semibold text-lg">
        केंद्रीय माध्यमिक शिक्षा बोर्ड
      </div>
      <div className="text-green-900 font-semibold text-lg mb-2">
        Central Board of Secondary Education
      </div>

      <p className="text-xs text-gray-600">
        COMMITTED TO EQUITY AND EXCELLENCE IN EDUCATION <br />
        Visit Central Board of Secondary Education Web Site
      </p>
    </div>
  );
};

export default AffiliationCard;
