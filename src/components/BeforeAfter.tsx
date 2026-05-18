"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { SectionHeader } from "./ui/SectionHeader";

interface BeforeAfterItem {
  before: string;
  after: string;
  title: string;
  description?: string;
  titleEdit?: string;
  descriptionEdit?: string;
}

interface BeforeAfterProps {
  items?: BeforeAfterItem[];
  sectionTitle?: string;
  sectionDescription?: string;
  titleEdit?: string;
  descriptionEdit?: string;
}

const examples: BeforeAfterItem[] = [
  {
    before: "/images/przed.jpg",
    after: "/images/placeholder.jpg",
    title: "Upscaling i poprawa jakości",
    description: "Zwiększenie rozdzielczości i wyostrzenie szczegółów produktu",
  },
  {
    before: "/images/placeholder.jpg",
    after: "/images/placeholder.jpg",
    title: "Usunięcie tła",
    description: "Profesjonalne wyizolowanie produktu na czystym tle",
  },
  {
    before: "/images/placeholder.jpg",
    after: "/images/placeholder.jpg",
    title: "Korekta kolorów",
    description: "Naturalne i atrakcyjne odwzorowanie barw produktu",
  },
];

export const BeforeAfter = ({
  items,
  sectionTitle,
  sectionDescription,
  titleEdit,
  descriptionEdit,
}: BeforeAfterProps) => {
  const beforeAfterItems = items?.length ? items : examples;
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  const activeExample = beforeAfterItems[activeIndex] ?? beforeAfterItems[0];

  return (
    <section className="section-padding bg-[var(--secondary)]" id="before-after">
      <div className="container-main">
        <SectionHeader
          title={sectionTitle || "Zobacz różnicę"}
          description={
            sectionDescription ||
            "Profesjonalna obróbka, która wydobywa pełen potencjał Twoich zdjęć produktowych."
          }
          titleEdit={titleEdit}
          descriptionEdit={descriptionEdit}
        />

        {/* Tabs */}
        <div className="mt-12 mb-10 overflow-x-auto pb-2 -mx-2 px-2">
          <div className="flex gap-2 w-max md:w-auto md:flex-wrap md:justify-center">
            {beforeAfterItems.map((example, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIndex(i);
                  setSliderPosition(50);
                }}
                className={`tab-btn ${activeIndex === i ? "active" : ""}`}
              >
                {example.title}
              </button>
            ))}
          </div>
        </div>

        {/* Before/After Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-xl)] overflow-hidden p-6 md:p-8">
            {/* Image Comparison Container */}
            <div
              ref={containerRef}
              className="relative aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden cursor-ew-resize select-none bg-[var(--muted)]"
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchMove={handleTouchMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
            >
              {/* After Image (Full) */}
              <div className="absolute inset-0">
                <Image
                  src={activeExample.after}
                  alt={`${activeExample.title} - Po`}
                  fill
                  className="object-cover"
                  draggable={false}
                />
              </div>

              {/* Before Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <Image
                  src={activeExample.before}
                  alt={`${activeExample.title} - Przed`}
                  fill
                  className="object-cover"
                  draggable={false}
                />
              </div>

              {/* Slider Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Slider Handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-ew-resize slider-handle">
                  <svg
                    width="28"
                    height="24"
                    viewBox="0 0 28 24"
                    fill="none"
                    className="text-[var(--foreground)]"
                  >
                    <path
                      d="M10 8L4 12L10 16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 8L24 12L18 16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                Przed
              </div>
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                Po
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 text-center">
              <h3 className="heading-card text-[var(--foreground)] mb-2" data-sanity={activeExample.titleEdit}>
                {activeExample.title}
              </h3>
              <p className="text-body" data-sanity={activeExample.descriptionEdit}>{activeExample.description}</p>
            </div>
          </div>

          {/* Instruction */}
          <p className="text-center mt-6 text-sm text-[var(--muted-foreground)]">
            Przeciągnij suwak, aby zobaczyć różnicę
          </p>
        </div>
      </div>
    </section>
  );
};
