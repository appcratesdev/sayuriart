"use client";

export default function sanityImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.includes("cdn.sanity.io")) {
    try {
      const url = new URL(src);
      const params = url.searchParams;

      const origWStr = params.get("w");
      const origHStr = params.get("h");

      if (origWStr) {
        const origW = parseInt(origWStr, 10);
        params.set("w", width.toString());

        if (origHStr) {
          const origH = parseInt(origHStr, 10);
          if (!isNaN(origW) && !isNaN(origH) && origW > 0) {
            const aspect = origH / origW;
            const newHeight = Math.round(width * aspect);
            params.set("h", newHeight.toString());
          }
        }
      } else {
        params.set("w", width.toString());
      }

      // Enforce high quality (85) instead of Next.js's default 75
      params.set("q", (quality || 85).toString());
      params.set("auto", "format");

      return url.toString();
    } catch (e) {
      return src;
    }
  }

  return src;
}
