import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "9u4sqgld";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2025-05-01";

export async function POST(req: NextRequest) {
  try {
    const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_KEY;
    if (!token) {
      return NextResponse.json({ error: "Missing SANITY_API_TOKEN" }, { status: 500 });
    }

    const body = await req.json();
    const { documentId, fieldPath, hotspot, crop } = body as {
      documentId: string;
      fieldPath: string;
      hotspot?: { x: number; y: number };
      crop?: { top: number; bottom: number; left: number; right: number };
    };

    if (!documentId || !fieldPath) {
      return NextResponse.json({ error: "Missing documentId or fieldPath" }, { status: 400 });
    }

    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: false,
    });

    const patch: Record<string, unknown> = {};
    if (hotspot) {
      patch[`${fieldPath}.hotspot`] = hotspot;
    }
    if (crop) {
      patch[`${fieldPath}.crop`] = crop;
    }

    await client
      .patch(documentId)
      .set(patch)
      .commit({ autoGenerateArrayKeys: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sanity image update error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
