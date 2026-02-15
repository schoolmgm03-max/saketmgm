"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { Trash2, Edit2, X } from "lucide-react";

interface TC {
  _id: string;
  studentName: string;
  studentClass: string;
  admissionNumber: string;
  tcUrl: string;
  date: string;
}

export default function ManageTC() {
  const [tcList, setTcList] = useState<TC[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTC, setEditingTC] = useState<TC | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // -------- Pagination --------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // -------- Fetch all TCs --------
  const fetchTCs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/tc");
      const data: TC[] = await res.json();
      setTcList(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch Transfer Certificates.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTCs();
  }, []);

  // -------- Delete TC --------
  const handleDelete = async (id: string, studentName: string) => {
    if (!confirm(`Are you sure you want to delete TC of "${studentName}"?`))
      return;

    try {
      const res = await fetch("/api/admin/tc", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (res.ok) {
        setTcList(tcList.filter((tc) => tc._id !== id));
        setMessage(`TC of "${studentName}" deleted successfully!`);
      } else {
        setError(data?.error || "Failed to delete TC");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError("Delete request failed. Check console.");
    }
  };

  // -------- Edit TC --------
  const handleEdit = (tc: TC) => {
    setEditingTC(tc);
    setNewImage(null);
    setMessage(null);
    setError(null);
  };

  // -------- Update TC --------
  const handleUpdate = async () => {
    if (!editingTC) return;
    setUpdating(true);
    setMessage(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("id", editingTC._id);
      formData.append("studentName", editingTC.studentName);
      formData.append("studentClass", editingTC.studentClass);
      formData.append("admissionNumber", editingTC.admissionNumber);
      if (newImage) formData.append("tcImage", newImage);

      const res = await fetch("/api/admin/tc/update", {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to update TC");
        return;
      }

      setTcList(tcList.map((tc) => (tc._id === data._id ? data : tc)));
      setMessage(`TC of "${editingTC.studentName}" updated successfully!`);
      setEditingTC(null);
      setNewImage(null);
    } catch (err) {
      console.error("Update request failed:", err);
      setError("Update request failed. Check console.");
    } finally {
      setUpdating(false);
    }
  };

  // -------- Pagination helpers --------
  const totalPages = Math.ceil(tcList.length / itemsPerPage);
  const paginatedList = tcList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Alerts */}
      {message && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-3 flex justify-between items-center">
          <span>{message}</span>
          <button
            onClick={() => setMessage(null)}
            aria-label="Close success message"
          >
            <X size={16} className="text-green-700 hover:text-green-900" />
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-3 flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            aria-label="Close error message"
          >
            <X size={16} className="text-red-700 hover:text-red-900" />
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-center py-10 text-gray-500">Loading...</p>
      ) : tcList.length === 0 ? (
        <p className="text-center py-10 text-gray-500">No TCs found.</p>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow divide-y divide-gray-200 table-auto">
              <thead className="bg-[#f82f53] text-white">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Student Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Class
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Admission No
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    TC Image
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Date
                  </th>
                  <th className="px-4 py-2 text-center text-sm font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedList.map((tc) => (
                  <tr key={tc._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm">{tc.studentName}</td>
                    <td className="px-4 py-2 text-sm">{tc.studentClass}</td>
                    <td className="px-4 py-2 text-sm">{tc.admissionNumber}</td>
                    <td className="px-4 py-2 text-sm">
                      <a
                        href={tc.tcUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#f82f53] underline"
                      >
                        View
                      </a>
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {new Date(tc.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-center flex justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(tc)}
                        className="text-blue-600 hover:text-blue-800 transition"
                        aria-label={`Edit TC of ${tc.studentName}`} // accessible label
                        title={`Edit TC of ${tc.studentName}`} // optional tooltip on hover
                      >
                        <Edit2 size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(tc._id, tc.studentName)}
                        className="text-red-600 hover:text-red-800 transition"
                        aria-label={`Delete TC of ${tc.studentName}`} // accessible label
                        title={`Delete TC of ${tc.studentName}`} // optional tooltip on hover
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-[#f82f53] text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Edit Modal */}
      {editingTC && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Edit TC</h2>

            <label
              htmlFor="studentName"
              className="block mb-2 text-sm font-medium"
            >
              Student Name
            </label>
            <input
              id="studentName"
              type="text"
              className="border p-2 mb-3 w-full"
              value={editingTC.studentName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditingTC({ ...editingTC, studentName: e.target.value })
              }
            />

            <label
              htmlFor="studentClass"
              className="block mb-2 text-sm font-medium"
            >
              Class
            </label>
            <input
              id="studentClass"
              type="text"
              className="border p-2 mb-3 w-full"
              value={editingTC.studentClass}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditingTC({ ...editingTC, studentClass: e.target.value })
              }
            />

            <label
              htmlFor="admissionNumber"
              className="block mb-2 text-sm font-medium"
            >
              Admission Number
            </label>
            <input
              id="admissionNumber"
              type="text"
              className="border p-2 mb-3 w-full"
              value={editingTC.admissionNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditingTC({ ...editingTC, admissionNumber: e.target.value })
              }
            />

            <label htmlFor="tcImage" className="block mb-2 text-sm font-medium">
              TC Image
            </label>
            <input
              id="tcImage"
              type="file"
              accept="image/*"
              className="mb-3 w-full"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewImage(e.target.files?.[0] || null)
              }
            />

            {newImage && (
              <img
                src={URL.createObjectURL(newImage)}
                alt="New TC Preview"
                className="mb-3 w-full h-40 object-contain border"
              />
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                  setEditingTC(null);
                  setNewImage(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                className="px-4 py-2 bg-[#f82f53] text-white rounded disabled:opacity-50"
                disabled={updating}
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
