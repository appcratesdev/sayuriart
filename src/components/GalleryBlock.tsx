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

function getRatio(image: GalleryImage | undefined, block: GalleryBlock) {
  const ratio =
    image?.aspectRatio === "custom"
      ? image.customAspectRatio
      : image?.aspectRatio && image.aspectRatio !== "auto"
        ? image.aspectRatio
        : block?.aspectRatio === "custom"
          ? block.customAspectRatio
          : block?.aspectRatio;
  return ratio && ratio !== "auto" ? ratio : "4 / 3";
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

  const aspectStyle: CSSProperties = {
    aspectRatio: ratio,
    objectPosition,
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
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ objectPosition }}
        sizes={getSizes(layout, index)}
        loading={index < 3 ? "eager" : "lazy"}
        quality={85}
      />
    </motion.button>
  );
}

export function GalleryBlockRenderer({ blocks, onImageClick }: GalleryBlockProps) {
  if (!blocks?.length) return null;

  return (
    <section className="py-8 md:py-12 bg-[var(--background)]">
      <div className="container-main space-y-8 md:space-y-12">
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
    </section>
  );
}
