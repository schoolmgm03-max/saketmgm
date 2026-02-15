"use client";
import React from "react";

type Result = {
  _id?: string;
  sno: number;
  year: string;
  registered: number;
  passed: number;
  percentage: string;
  remarks?: string;
  examClass: string;
};

const ResultsTable: React.FC = () => {
  const [results, setResults] = React.useState<Result[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch("/api/admin/results");
        const data = await res.json();
        if (res.ok) setResults(data);
      } catch (err) {
        console.error("Failed to fetch results:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) return <div className="text-center py-10">Loading results...</div>;

  const classXResults = results.filter(r => r.examClass === "X");
  const classXIIResults = results.filter(r => r.examClass === "XII");


  const renderTable = (title: string, data: Result[]) => (
    <div className="my-10">
      <h2 className="text-lg font-semibold italic mb-4 text-[#f82f53] text-center">
        {title}
      </h2>

      <div className="overflow-x-auto">
        <div className="max-w-5xl mx-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-sm">S. NO.</th>
                <th className="border px-4 py-2 text-sm">YEAR</th>
                <th className="border px-4 py-2 text-sm">
                  NO. OF REGISTERED STUDENTS
                </th>
                <th className="border px-4 py-2 text-sm">
                  NO. OF STUDENTS PASSED
                </th>
                <th className="border px-4 py-2 text-sm">PASS PERCENTAGE</th>
                <th className="border px-4 py-2 text-sm">REMARKS</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={row.sno}
                  className={i % 2 === 1 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="border px-4 py-2 text-center">{row.sno}</td>
                  <td className="border px-4 py-2 text-center">{row.year}</td>
                  <td className="border px-4 py-2 text-center">{row.registered}</td>
                  <td className="border px-4 py-2 text-center">{row.passed}</td>
                  <td className="border px-4 py-2 text-center">{row.percentage}</td>
                  <td className="border px-4 py-2 text-center">{row.remarks || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {renderTable("RESULT CLASS : X", classXResults)}
      {renderTable("RESULT CLASS : XII", classXIIResults)}
    </>
  );
};

export default ResultsTable;
