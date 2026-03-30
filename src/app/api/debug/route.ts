import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

export async function GET() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const token = process.env.SANITY_API_TOKEN;

  if (!projectId) {
    return NextResponse.json({ error: "No project ID" });
  }

  try {
    const client = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      useCdn: false,
      apiVersion: "2024-01-01",
      token,
    });

    const debates = await client.fetch('*[_type == "debate"]');
    return NextResponse.json({ ok: true, count: debates.length, debates, projectId, hasToken: !!token });
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) });
  }
}
