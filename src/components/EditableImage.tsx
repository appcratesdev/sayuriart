"use client";

import React, { useCallback, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { usePreviewMode } from "@/hooks/usePreviewMode";

interface Hotspot {
  x: number;
  y: number;
}

interface Crop {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface SanityImageValue {
  hotspot?: Hotspot;
  crop?: Crop;
}

interface EditableImageProps extends Omit<ImageProps, "src"> {
  src: string;
  documentId?: string;
  fieldPath?: string;
  imageValue?: SanityImageValue | null;
  containerClassName?: string;
}

export function EditableImage({
  src,
  documentId,
  fieldPath,
  imageValue,
  containerClassName,
  fill,
  style,
  alt,
  ...imageProps
}: EditableImageProps) {
  const isPreview = usePreviewMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pendingHotspot, setPendingHotspot] = useState<Hotspot | undefined>(
    imageValue?.hotspot
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const hotspot = pendingHotspot || imageValue?.hotspot || { x: 0.5, y: 0.5 };

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isPreview || !containerRef.current) return;
      e.preventDefault();
      setIsDragging(true);
    },
    [isPreview]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      setPendingHotspot({ x, y });
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const saveHotspot = useCallback(async () => {
    if (!documentId || !fieldPath || !pendingHotspot) return;
    setSaving(true);
    try {
      const res = await fetch("/api/sanity-image-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId,
          fieldPath,
          hotspot: pendingHotspot,
        }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (err) {
      console.error("Failed to save hotspot:", err);
    } finally {
      setSaving(false);
    }
  }, [documentId, fieldPath, pendingHotspot]);

  const imageStyle: React.CSSProperties = fill
    ? { objectPosition: `${hotspot.x * 100}% ${hotspot.y * 100}%`, ...style }
    : { ...style };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${containerClassName || ""}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Image
        src={src}
        alt={alt || ""}
        fill={fill}
        style={imageStyle}
        {...imageProps}
        draggable={false}
      />

      {isPreview && (
        <>
          {/* Overlay label */}
          <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-medium px-2 py-1 rounded backdrop-blur-sm pointer-events-none select-none">
            Preview mode — drag gold dot to move hotspot
          </div>

          {/* Hotspot dot */}
          <div
            className={`absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full border-2 border-white shadow-lg cursor-move z-10 ${
              isDragging ? "scale-125" : ""
            }`}
            style={{
              left: `${hotspot.x * 100}%`,
              top: `${hotspot.y * 100}%`,
              background: saving ? "#999" : "#C4A35A",
              transition: isDragging ? "none" : "all 0.2s ease",
            }}
            onMouseDown={handleMouseDown}
            title="Drag to set focal point"
          />

          {/* Crosshair lines */}
          <div
            className="absolute pointer-events-none opacity-30"
            style={{
              left: `${hotspot.x * 100}%`,
              top: 0,
              bottom: 0,
              width: 1,
              background: "#C4A35A",
            }}
          />
          <div
            className="absolute pointer-events-none opacity-30"
            style={{
              top: `${hotspot.y * 100}%`,
              left: 0,
              right: 0,
              height: 1,
              background: "#C4A35A",
            }}
          />

          {/* Save button */}
          {pendingHotspot &&
            (pendingHotspot.x !== imageValue?.hotspot?.x ||
              pendingHotspot.y !== imageValue?.hotspot?.y) && (
              <button
                onClick={saveHotspot}
                disabled={saving}
                className="absolute bottom-2 right-2 bg-[#1F4A35] text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg hover:bg-[#2A6349] disabled:opacity-50 transition-colors z-20"
              >
                {saving ? "Saving..." : saved ? "Saved!" : "Save hotspot"}
              </button>
            )}
        </>
      )}
    </div>
  );
}
