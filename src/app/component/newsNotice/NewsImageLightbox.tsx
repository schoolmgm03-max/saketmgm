"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface Props {
    image: string;
    title: string;
    onClose: () => void;
}

export default function NewsImageLightbox({ image, title, onClose }: Props) {
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [positionStart, setPositionStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Reset zoom and position when opening
    useEffect(() => {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
    }, [image]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "+" || e.key === "=") setZoom((prev) => Math.min(prev + 0.5, 5));
            if (e.key === "-") setZoom((prev) => Math.max(prev - 0.5, 1));
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const handleZoomIn = useCallback(() => {
        setZoom((prev) => Math.min(prev + 0.5, 5));
    }, []);

    const handleZoomOut = useCallback(() => {
        setZoom((prev) => {
            const newZoom = Math.max(prev - 0.5, 1);
            if (newZoom === 1) setPosition({ x: 0, y: 0 });
            return newZoom;
        });
    }, []);

    const handleReset = useCallback(() => {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
    }, []);

    // Mouse drag handlers for panning when zoomed
    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoom > 1) {
            setIsDragging(true);
            setDragStart({ x: e.clientX, y: e.clientY });
            setPositionStart({ x: position.x, y: position.y });
            e.preventDefault();
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && zoom > 1) {
            const dx = e.clientX - dragStart.x;
            const dy = e.clientY - dragStart.y;
            setPosition({
                x: positionStart.x + dx,
                y: positionStart.y + dy,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Touch drag handlers for mobile panning
    const handleTouchStart = (e: React.TouchEvent) => {
        if (zoom > 1 && e.touches.length === 1) {
            setIsDragging(true);
            setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
            setPositionStart({ x: position.x, y: position.y });
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isDragging && zoom > 1 && e.touches.length === 1) {
            const dx = e.touches[0].clientX - dragStart.x;
            const dy = e.touches[0].clientY - dragStart.y;
            setPosition({
                x: positionStart.x + dx,
                y: positionStart.y + dy,
            });
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    // Double-click to zoom
    const handleDoubleClick = () => {
        if (zoom > 1) {
            handleReset();
        } else {
            setZoom(2);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            {/* Top bar with title and controls */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-black/50 z-10">
                <h3 className="text-white text-sm font-medium truncate max-w-[50%]">
                    {title}
                </h3>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleZoomOut}
                        disabled={zoom <= 1}
                        className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
                        title="Zoom Out (-)"
                    >
                        <ZoomOut size={20} />
                    </button>
                    <span className="text-white text-sm font-medium min-w-[3rem] text-center">
                        {Math.round(zoom * 100)}%
                    </span>
                    <button
                        onClick={handleZoomIn}
                        disabled={zoom >= 5}
                        className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
                        title="Zoom In (+)"
                    >
                        <ZoomIn size={20} />
                    </button>
                    <button
                        onClick={handleReset}
                        className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
                        title="Reset Zoom"
                    >
                        <RotateCcw size={20} />
                    </button>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition ml-2"
                        title="Close (Esc)"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Image container with drag/pan */}
            <div
                ref={containerRef}
                className="flex items-center justify-center w-full h-full overflow-hidden cursor-zoom-in"
                style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onDoubleClick={handleDoubleClick}
            >
                <img
                    src={image}
                    alt={title}
                    className="max-w-full max-h-full object-contain select-none transition-transform duration-200"
                    style={{
                        transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                    }}
                    draggable={false}
                />
            </div>

            {/* Bottom hint */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-white/60 text-xs">
                    Double-click to zoom • Drag to pan when zoomed • Press Esc to close
                </p>
            </div>
        </div>
    );
}