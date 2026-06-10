"use client";

import { useEffect, useState } from "react";
import PdfViewer from "@/app/component/PdfViewer";

export default function BookListPage() {
    const [bookListUrl, setBookListUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookList = async () => {
            try {
                // First check mandatory disclosure for BOOK LIST
                const discRes = await fetch("/api/admin/mandatoryDisclosure");
                const discData = await discRes.json();
                if (discRes.ok && discData?.academicDocs) {
                    const bookDoc = discData.academicDocs.find(
                        (doc: { id: number; title: string; file: string }) =>
                            doc.title.toUpperCase().includes("BOOK LIST")
                    );
                    if (bookDoc && bookDoc.file && bookDoc.file !== "#") {
                        setBookListUrl(bookDoc.file);
                        return;
                    }
                }

                // Fallback to standalone BookList model
                const res = await fetch("/api/admin/booklist");
                const data = await res.json();
                if (res.ok && data?.url) {
                    setBookListUrl(data.url);
                }
            } catch (err) {
                console.error("Failed to fetch Book List:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookList();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f82f53]"></div>
            </div>
        );
    }

    if (!bookListUrl) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Book List</h1>
                <p className="text-gray-500">The book list is currently unavailable. Please check back later.</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <PdfViewer fileUrl={bookListUrl} title="Book List" />
        </div>
    );
}
