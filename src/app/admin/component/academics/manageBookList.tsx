"use client";

import { useEffect, useState } from "react";
import { Trash2, FileText, X } from "lucide-react";

interface BookList {
    _id: string;
    url: string;
    public_id: string;
    date: string;
}

export default function ManageBookList() {
    const [bookList, setBookList] = useState<BookList | null>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);

    const fetchBookList = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/booklist");
            const data = await res.json();
            if (res.ok) setBookList(data);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookList();
    }, []);

    const handleDelete = async () => {
        if (!bookList) return;
        if (!confirm("Are you sure you want to delete the current Book List?")) return;

        try {
            const res = await fetch("/api/admin/booklist", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: bookList._id }),
            });

            if (res.ok) {
                setBookList(null);
                setMessage("Book List deleted successfully!");
            } else {
                alert("Failed to delete Book List");
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    return (
        <div>
            {message && (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-3 flex justify-between items-center">
                    <span>{message}</span>
                    <button onClick={() => setMessage(null)}><X size={16} /></button>
                </div>
            )}

            {loading ? (
                <p className="text-center py-10 text-gray-500">Loading...</p>
            ) : !bookList ? (
                <p className="text-center py-10 text-gray-500">No Book List uploaded yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow divide-y divide-gray-200">
                        <thead className="bg-[#f82f53] text-white">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium">File</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">Uploaded Date</th>
                                <th className="px-4 py-2 text-center text-sm font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm">
                                    <a href={bookList.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#f82f53] underline">
                                        <FileText size={16} /> View Book List
                                    </a>
                                </td>
                                <td className="px-4 py-2 text-sm">
                                    {new Date(bookList.date).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        onClick={handleDelete}
                                        className="text-red-600 hover:text-red-800 transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
