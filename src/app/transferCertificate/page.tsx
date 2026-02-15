"use client";

import { useEffect, useState } from "react";

interface TC {
  _id: string;
  studentName: string;
  studentClass: string;
  admissionNumber: string;
  tcUrl: string;
  date: string;
}

export default function StudentTCSearch() {
  const [tcList, setTcList] = useState<TC[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [foundTC, setFoundTC] = useState<TC | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // -------------------- Fetch All TCs --------------------
  const fetchTCs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/tc");
      const data = await res.json();
      if (res.ok) {
        setTcList(data);
      } else {
        console.error("Failed to fetch TC data:", data);
      }
    } catch (err) {
      console.error("Error fetching TC data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTCs();
  }, []);

  // -------------------- Handle Search --------------------
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert("Please enter your admission number.");
      return;
    }

    const term = searchTerm.trim().toLowerCase();

    // Find TC by Admission Number
    const tc = tcList.find(
      (t) => t?.admissionNumber?.toLowerCase() === term
    );

    setFoundTC(tc || null);
    setHasSearched(true);
  };

  // -------------------- UI --------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-[#f82f53]">
          Search Your Transfer Certificate
        </h2>

        {/* Input field */}
        <input
          type="text"
          placeholder="Enter Admission Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f82f53] outline-none transition"
        />

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="w-full bg-[#f82f53] hover:bg-[#e02849] text-white font-medium py-3 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Search
        </button>

        {/* Loading State */}
        {loading && (
          <p className="text-gray-500 text-center">Loading data...</p>
        )}

        {/* Found TC */}
        {!loading && hasSearched && foundTC && (
          <div className="border border-gray-200 rounded-lg p-4 mt-4 space-y-2 bg-gray-50">
            <h3 className="font-semibold text-[#f82f53] text-lg">
              {foundTC.studentName}
            </h3>
            <p>
              <span className="font-medium">Class:</span>{" "}
              {foundTC.studentClass}
            </p>
            <p>
              <span className="font-medium">Admission No:</span>{" "}
              {foundTC.admissionNumber}
            </p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {new Date(foundTC.date).toLocaleDateString()}
            </p>
            <a
              href={foundTC.tcUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f82f53] underline block mt-2"
            >
              View TC
            </a>
          </div>
        )}

        {/* No TC Found */}
        {!loading && hasSearched && !foundTC && (
          <p className="text-red-600 text-center mt-4">
            No TC found for “{searchTerm}”
          </p>
        )}
      </div>
    </div>
  );
}
