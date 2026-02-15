"use client";

import { useEffect, useState } from "react";
import { Trash2, Edit2, Plus, X } from "lucide-react";

interface Result {
    _id: string;
    examClass: string;
    year: string;
    registered: number;
    passed: number;
    percentage: string;
    remarks: string;
    sno: number;
}

export default function ManageResults() {
    const [results, setResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingResult, setEditingResult] = useState<Partial<Result> | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchResults = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/results");
            const data = await res.json();
            if (res.ok) setResults(data);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResults();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingResult) return;

        const method = editingResult._id ? "PUT" : "POST";
        const body = editingResult._id ? { id: editingResult._id, ...editingResult } : editingResult;

        try {
            const res = await fetch("/api/admin/results", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                fetchResults();
                setIsModalOpen(false);
                setEditingResult(null);
            } else {
                alert("Failed to save result");
            }
        } catch (err) {
            console.error("Save error:", err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch("/api/admin/results", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (res.ok) fetchResults();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Manage Exam Results</h2>
                <button
                    onClick={() => {
                        setEditingResult({ examClass: "X", remarks: "-", sno: results.length + 1 });
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-[#f82f53] text-white px-4 py-2 rounded-lg hover:bg-[#e02849] transition"
                >
                    <Plus size={18} /> Add Result
                </button>
            </div>

            {loading ? (
                <p className="text-center py-10 text-gray-500">Loading...</p>
            ) : results.length === 0 ? (
                <p className="text-center py-10 text-gray-500">No results found.</p>
            ) : (
                <div className="space-y-8">
                    {["X", "XII"].map((cls) => (
                        <div key={cls}>
                            <h3 className="text-lg font-semibold text-[#f82f53] mb-3">Class {cls} Results</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white rounded-lg shadow divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium">SNo</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium">Year</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium">Registered</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium">Passed</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium">%</th>
                                            <th className="px-4 py-2 text-center text-sm font-medium">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {results.filter(r => r.examClass === cls).map((result) => (
                                            <tr key={result._id} className="hover:bg-gray-50">
                                                <td className="px-4 py-2 text-sm">{result.sno}</td>
                                                <td className="px-4 py-2 text-sm">{result.year}</td>
                                                <td className="px-4 py-2 text-sm">{result.registered}</td>
                                                <td className="px-4 py-2 text-sm">{result.passed}</td>
                                                <td className="px-4 py-2 text-sm">{result.percentage}</td>
                                                <td className="px-4 py-2 text-center space-x-2">
                                                    <button onClick={() => { setEditingResult(result); setIsModalOpen(true); }} className="text-blue-600 hover:text-blue-800"><Edit2 size={16} /></button>
                                                    <button onClick={() => handleDelete(result._id)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <form onSubmit={handleSave} className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-bold">{editingResult?._id ? "Edit Result" : "Add Result"}</h3>
                            <button type="button" onClick={() => setIsModalOpen(false)}><X size={20} /></button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Class</label>
                                <select
                                    className="w-full border rounded-lg p-2"
                                    value={editingResult?.examClass}
                                    onChange={e => setEditingResult({ ...editingResult, examClass: e.target.value })}
                                >
                                    <option value="X">X</option>
                                    <option value="XII">XII</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">SNo</label>
                                <input type="number" className="w-full border rounded-lg p-2" value={editingResult?.sno} onChange={e => setEditingResult({ ...editingResult, sno: Number(e.target.value) })} required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Year (e.g., 2023-24)</label>
                            <input type="text" className="w-full border rounded-lg p-2" value={editingResult?.year} onChange={e => setEditingResult({ ...editingResult, year: e.target.value })} required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Registered</label>
                                <input type="number" className="w-full border rounded-lg p-2" value={editingResult?.registered} onChange={e => setEditingResult({ ...editingResult, registered: Number(e.target.value) })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Passed</label>
                                <input type="number" className="w-full border rounded-lg p-2" value={editingResult?.passed} onChange={e => setEditingResult({ ...editingResult, passed: Number(e.target.value) })} required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Pass %</label>
                                <input type="text" className="w-full border rounded-lg p-2" value={editingResult?.percentage} onChange={e => setEditingResult({ ...editingResult, percentage: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Remarks</label>
                                <input type="text" className="w-full border rounded-lg p-2" value={editingResult?.remarks} onChange={e => setEditingResult({ ...editingResult, remarks: e.target.value })} />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-[#f82f53] text-white py-2 rounded-lg font-bold">Save Result</button>
                    </form>
                </div>
            )}
        </div>
    );
}
