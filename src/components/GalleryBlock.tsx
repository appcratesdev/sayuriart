"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { sanityImageUrl } from "@/lib/sanity-mappers";
import type { GalleryBlock, GalleryImage } from "../../sanity/lib/types";
import sanityImageLoader from "@/lib/sanity-image-loader";

type GalleryLayout =
  | "full"
  | "two-col"
  | "one-two"
  | "two-one"
  | "three-col"
  | "hero-two"
  | "portrait-stack"
  | "grid";

interface GalleryBlockProps {
  blocks?: GalleryBlock[];
  onImageClick?: (src: string, alt: string) => void;
}

/**
 * Resolve the effective aspect ratio string for an image slot.
 * 
 * Priority logic:
 *  - Image "custom"  → use image.customAspectRatio
 *  - Image explicit   → use that value (e.g. "4 / 3")
 *  - Image "auto"     → use real asset dimensions, ignore block ratio
 *  - Image unset      → fall through to block level:
 *      - Block "custom" → use block.customAspectRatio
 *      - Block explicit → use that value
 *      - Block "auto"   → use real asset dimensions
 *  - Fallback: "4 / 3"
 */
function getRatio(image: GalleryImage | undefined, block: GalleryBlock): string {
  const imgRatio = image?.aspectRatio;

  // 1. Image-level has an explicit non-auto ratio
  if (imgRatio && imgRatio !== "auto") {
    if (imgRatio === "custom") {
      return image!.customAspectRatio?.trim() || "4 / 3";
    }
    return imgRatio;
  }

  // 2. Image is explicitly "auto" — skip block level, go straight to real dims
  if (imgRatio === "auto") {
    return getAutoRatioFromAsset(image) || "4 / 3";
  }

  // 3. Image ratio is unset (undefined) — fall through to block level
  const blkRatio = block?.aspectRatio;
  if (blkRatio && blkRatio !== "auto") {
    if (blkRatio === "custom") {
      return block.customAspectRatio?.trim() || "4 / 3";
    }
    return blkRatio;
  }

  // 4. Block is also "auto" or unset — try real dims
  return getAutoRatioFromAsset(image) || "4 / 3";
}

/** Try to extract real width/height from Sanity asset metadata. */
function getAutoRatioFromAsset(image: GalleryImage | undefined): string | null {
  const source = (image as any)?.image || image;

  // Method 1: metadata dimensions from the GROQ query
  const dims = source?.asset?.metadata?.dimensions;
  if (dims?.width && dims?.height) {
    return `${dims.width} / ${dims.height}`;
  }

  // Method 2: parse from asset _id (format: image-{hash}-{W}x{H}-{ext})
  const assetId = source?.asset?._id || source?.asset?._ref;
  if (assetId) {
    const match = assetId.match(/-(\d+)x(\d+)-/);
    if (match) {
      return `${match[1]} / ${match[2]}`;
    }
  }

  return null;
}

/**
 * Returns true when the effective ratio is "auto" (real dimensions),
 * meaning we should use object-contain instead of object-cover.
 */
function isAutoRatio(image: GalleryImage | undefined, block: GalleryBlock): boolean {
  const imgRatio = image?.aspectRatio;

  // Image explicitly set to a fixed ratio → not auto
  if (imgRatio && imgRatio !== "auto") return false;

  // Image explicitly set to "auto" → auto (regardless of block)
  if (imgRatio === "auto") return true;

  // Image unset → check block
  const blkRatio = block?.aspectRatio;
  if (blkRatio && blkRatio !== "auto") return false;

  // Block also auto or unset → auto
  return true;
}

function getObjectPosition(image: GalleryImage | undefined) {
  const x = image?.objectPositionX ?? 50;
  const y = image?.objectPositionY ?? 50;
  return `${x}% ${y}%`;
}

function getImageSrc(image: GalleryImage | undefined) {
  if (!image) return undefined;
  // galleryImage type wraps image in .image field; legacy images don't
  const source = (image as { image?: unknown }).image || image;
  return sanityImageUrl(source as Parameters<typeof sanityImageUrl>[0]);
}

function getLayoutClass(layout: GalleryLayout, index: number, total: number): string {
  switch (layout) {
    case "full":
      return "col-span-full";
    case "two-col":
      return "col-span-1";
    case "three-col":
      return "col-span-1";
    case "grid":
      return index === 0 && total >= 5
        ? "col-span-1 md:col-span-2 md:row-span-2"
        : "col-span-1";
    case "one-two":
      if (index === 0) return "col-span-1 md:col-span-2 md:row-span-2";
      return "col-span-1";
    case "two-one":
      if (index === 2) return "col-span-1 md:col-span-2 md:row-span-2";
      return "col-span-1";
    case "hero-two":
      if (index === 0) return "col-span-1 md:col-span-2";
      return "col-span-1";
    case "portrait-stack":
      if (index === 0) return "col-span-1 md:row-span-2";
      return "col-span-1";
    default:
      return "col-span-1";
  }
}

function getSizes(layout: GalleryLayout, index: number): string {
  switch (layout) {
    case "full":
      return "(max-width: 640px) 100vw, 1200px";
    case "two-col":
    case "three-col":
      return "(max-width: 640px) 100vw, 600px";
    case "grid":
      return index === 0 ? "(max-width: 640px) 100vw, 800px" : "(max-width: 640px) 100vw, 400px";
    case "one-two":
    case "two-one":
    case "hero-two":
    case "portrait-stack":
      return index === 0 || index === 2
        ? "(max-width: 640px) 100vw, 800px"
        : "(max-width: 640px) 100vw, 400px";
    default:
      return "(max-width: 640px) 100vw, 1200px";
  }
}

function GalleryImageItem({
  image,
  block,
  index,
  total,
  onClick,
}: {
  image: GalleryImage | undefined;
  block: GalleryBlock;
  index: number;
  total: number;
  onClick?: () => void;
}) {
  const src = getImageSrc(image);
  if (!src) return null;

  const layout = (block.layout || "full") as GalleryLayout;
  const ratio = getRatio(image, block);
  const objectPosition = getObjectPosition(image);
  const layoutClass = getLayoutClass(layout, index, total);
  const useContain = isAutoRatio(image, block);

  const aspectStyle: CSSProperties = {
    aspectRatio: ratio,
  };

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`img-wrapper group cursor-pointer overflow-hidden w-full ${layoutClass}`}
      style={aspectStyle}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 duration-500" />
      <Image
        loader={sanityImageLoader}
        src={src}
        alt=""
        fill
        className={`${useContain ? "object-contain" : "object-cover"} transition-transform duration-700 group-hover:scale-105`}
        style={{ objectPosition: useContain ? "center" : objectPosition }}
        sizes={getSizes(layout, index)}
        loading={index < 3 ? "eager" : "lazy"}
        quality={85}
      />
    </motion.button>
  );
}

export function GalleryBlockRenderer({ blocks, onImageClick, standalone = true }: GalleryBlockProps & { standalone?: boolean }) {
  if (!blocks?.length) return null;

  const content = (
    <div className={standalone ? "container-main space-y-8 md:space-y-12" : "space-y-8 md:space-y-12"}>
      {blocks.map((block, blockIdx) => {
        const images = block.images || [];

        return (
          <div
            key={block._key || blockIdx}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
            data-sanity={block._key ? `gallery[${blockIdx}]` : undefined}
          >
            {images.map((image, imgIdx) => (
              <GalleryImageItem
                key={image._key || imgIdx}
                image={image}
                block={block}
                index={imgIdx}
                total={images.length}
                onClick={() => {
                  const src = getImageSrc(image);
                  if (src && onImageClick) onImageClick(src, "");
                }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );

  if (!standalone) {
    return content;
  }

  return (
    <section className="py-8 md:py-12 bg-[var(--background)]">
      {content}
    </section>
  );
}
