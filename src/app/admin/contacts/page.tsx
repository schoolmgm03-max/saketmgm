"use client";

import { useEffect, useState } from "react";
import { Contact } from "../../../../types/contact";

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;

  useEffect(() => {
    fetch("/api/admin/contacts")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center p-4">Loading...</p>;

  // Pagination logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(contacts.length / contactsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
        Contact Messages
      </h1>

      {/* Responsive table wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full border text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.map((c) => (
              <tr key={c._id} className="border-t hover:bg-gray-50">
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border break-all">{c.email}</td>
                <td className="p-2 border">{c.phone || "—"}</td>
                <td className="p-2 border">{c.subject}</td>
                <td className="p-2 border max-w-xs truncate sm:whitespace-normal">
                  {c.message}
                </td>
                <td className="p-2 border whitespace-nowrap">
                  {new Date(c.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 w-full sm:w-auto"
        >
          Previous
        </button>

        <span className="text-sm sm:text-base">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 w-full sm:w-auto"
        >
          Next
        </button>
      </div>
    </div>
  );
}
