import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "../../sanity/lib/image";

export function sanityImageUrl(
  image: SanityImageSource | undefined,
  width?: number,
  height?: number
) {
  if (!image) return undefined;

  let builder = urlFor(image).auto("format");

  if (width) {
    builder = builder.width(width);
  }

  if (height) {
    builder = builder.height(height).fit("crop");
  } else {
    builder = builder.fit("max");
  }

  return builder.url();
}

export function portableTextToPlainText(blocks: PortableTextBlock[] | undefined) {
  if (!blocks?.length) return undefined;

  return blocks
    .map((block) =>
      block.children
        ?.map((child) => ("text" in child ? child.text : ""))
        .join("")
    )
    .filter(Boolean)
    .join("\n\n");
}
