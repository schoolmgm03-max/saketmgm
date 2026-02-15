"use client";

import { useState } from "react";
import AddBookList from "../component/academics/addBookList";
import ManageBookList from "../component/academics/manageBookList";
import ManageResults from "../component/academics/manageResults";

export default function AcademicsManagerPage() {
    const [activeTab, setActiveTab] = useState<"manage" | "add" | "results">("manage");

    return (
        <main className="bg-gray-50 py-8">
            <div className="max-w-5xl mx-auto px-4">
                <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
                    Academics Management
                </h1>

                <div className="flex flex-wrap gap-3 justify-center mb-6">
                    <button
                        className={`px-5 py-2 rounded-lg font-medium transition ${activeTab === "manage"
                            ? "bg-[#f82f53] text-white shadow-md"
                            : "bg-[#f82f53]/10 text-[#f82f53] hover:bg-[#f82f53]/20"
                            }`}
                        onClick={() => setActiveTab("manage")}
                    >
                        Manage Book List
                    </button>

                    <button
                        className={`px-5 py-2 rounded-lg font-medium transition ${activeTab === "add"
                            ? "bg-[#f82f53] text-white shadow-md"
                            : "bg-[#f82f53]/10 text-[#f82f53] hover:bg-[#f82f53]/20"
                            }`}
                        onClick={() => setActiveTab("add")}
                    >
                        Add Book List
                    </button>

                    <button
                        className={`px-5 py-2 rounded-lg font-medium transition ${activeTab === "results"
                            ? "bg-[#f82f53] text-white shadow-md"
                            : "bg-[#f82f53]/10 text-[#f82f53] hover:bg-[#f82f53]/20"
                            }`}
                        onClick={() => setActiveTab("results")}
                    >
                        Manage Results
                    </button>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    {activeTab === "manage" && <ManageBookList />}
                    {activeTab === "add" && <AddBookList />}
                    {activeTab === "results" && <ManageResults />}
                </div>
            </div>
        </main>
    );
}
