import React, { useMemo } from "react";
import { type ImageValue } from "sanity";
import { type InputProps } from "sanity";
import { Stack, Text, Card, Flex } from "@sanity/ui";
import { createImageUrlBuilder } from "@sanity/image-url";

const ASPECT_4_3 = 4 / 3;
const ASPECT_16_9 = 16 / 9;
const ASPECT_1_1 = 1;
const ASPECT_4_5 = 4 / 5;

interface PreviewGuide {
  label: string;
  ratio: number;
  bg: string;
}

const guides: PreviewGuide[] = [
  { label: "4:3 (Uslugi)", ratio: ASPECT_4_3, bg: "#1F4A35" },
  { label: "16:9 (Hero)", ratio: ASPECT_16_9, bg: "#214934" },
  { label: "1:1 (Avatar)", ratio: ASPECT_1_1, bg: "#C4A35A" },
  { label: "4:5 (O mnie)", ratio: ASPECT_4_5, bg: "#204636" },
];

function buildUrl(imageValue: ImageValue | undefined, projectId: string, dataset: string, width: number, height: number) {
  if (!imageValue?.asset?._ref) return null;
  const builder = createImageUrlBuilder({ projectId, dataset });
  return builder.image(imageValue).width(width).height(height).fit("crop").url();
}

function PreviewBox({
  label,
  ratio,
  bg,
  src,
  imageValue,
}: PreviewGuide & { src: string | null; imageValue: ImageValue | undefined }) {
  const hasHotspot = !!imageValue?.hotspot;
  const hotspot = imageValue?.hotspot;

  return (
    <Stack space={2}>
      <Text size={1} weight="semibold" style={{ color: bg }}>
        {label}
      </Text>
      <Card
        tone="default"
        border
        padding={0}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: `${ratio}`,
          overflow: "hidden",
          background: "#E6E0D6",
        }}
      >
        {src ? (
          <>{/* eslint-disable-next-line @next/next/no-img-element -- Sanity Studio preview, not Next.js page */}
          <img
            src={src}
            alt={`Preview ${label}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: hotspot
                ? `${hotspot.x * 100}% ${hotspot.y * 100}%`
                : "center",
            }}
          /></>
        ) : (
          <Flex align="center" justify="center" style={{ width: "100%", height: "100%" }}>
            <Text size={1} muted>
              Brak zdjecia
            </Text>
          </Flex>
        )}
        {hasHotspot && (
          <div
            style={{
              position: "absolute",
              left: `${(hotspot?.x ?? 0.5) * 100}%`,
              top: `${(hotspot?.y ?? 0.5) * 100}%`,
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#C4A35A",
              border: "2px solid white",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }}
          />
        )}
      </Card>
    </Stack>
  );
}

export function ServiceImageInput(props: InputProps) {
  const { value, renderDefault, schemaType } = props;
  const imageValue = value as ImageValue | undefined;

  // Extract projectId and dataset from the client in context if available
  // Fallback to env or hardcoded defaults
  const st = schemaType as unknown as { options?: { projectId?: string; dataset?: string } };
  const projectId = st?.options?.projectId || "9u4sqgld";
  const dataset = st?.options?.dataset || "production";

  const previews = useMemo(() => {
    return guides.map((g) => ({
      ...g,
      src: buildUrl(imageValue, projectId, dataset, 400, Math.round(400 / g.ratio)),
    }));
  }, [imageValue, projectId, dataset]);

  const cropInfo = useMemo(() => {
    if (!imageValue?.crop) return null;
    const { top, bottom, left, right } = imageValue.crop;
    return `Crop: top ${(top * 100).toFixed(0)}%, bottom ${(bottom * 100).toFixed(0)}%, left ${(left * 100).toFixed(0)}%, right ${(right * 100).toFixed(0)}%`;
  }, [imageValue]);

  const hotspotInfo = useMemo(() => {
    if (!imageValue?.hotspot) return null;
    const { x, y } = imageValue.hotspot;
    return `Hotspot: x ${(x * 100).toFixed(0)}%, y ${(y * 100).toFixed(0)}%`;
  }, [imageValue]);

  return (
    <Stack space={4}>
      {/* Default Sanity image input (upload + crop/hotspot editor) */}
      {renderDefault(props)}

      {/* Live preview panels */}
      {imageValue?.asset && (
        <Card tone="default" border padding={3} radius={2}>
          <Stack space={4}>
            <Text size={1} weight="bold" style={{ color: "#1F4A35" }}>
              Live Preview — jak zdjecie bedzie wygladac na stronie
            </Text>

            {cropInfo && (
              <Text size={0} muted>
                {cropInfo}
              </Text>
            )}
            {hotspotInfo && (
              <Text size={0} muted>
                {hotspotInfo}
              </Text>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 12,
              }}
            >
              {previews.map((p) => (
                <PreviewBox key={p.label} {...p} imageValue={imageValue} />
              ))}
            </div>
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
