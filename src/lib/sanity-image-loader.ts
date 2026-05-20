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

      params.delete("h");
      params.set("w", width.toString());
      params.set("fit", "max");
      params.set("auto", "format");
      params.set("q", (quality || 85).toString());

      return url.toString();
    } catch {
      return src;
    }
  }

  if (src.startsWith("/")) {
    const separator = src.includes("?") ? "&" : "?";
    return `${src}${separator}w=${width}&q=${quality || 85}`;
  }

  try {
    const url = new URL(src);
    url.searchParams.set("w", width.toString());
    url.searchParams.set("q", (quality || 85).toString());
    return url.toString();
  } catch {
    return src;
  }
}
