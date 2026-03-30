import { AccessToken } from "livekit-server-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { roomName, participantName, role } = await req.json();

    if (!roomName || !participantName || !role) {
      return NextResponse.json(
        { error: "roomName, participantName, and role are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

    if (!apiKey || !apiSecret || !wsUrl) {
      return NextResponse.json(
        { error: "LiveKit credentials not configured" },
        { status: 500 }
      );
    }

    const at = new AccessToken(apiKey, apiSecret, {
      identity: participantName,
      name: participantName,
    });

    const isDebater = role === "debater";

    at.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: isDebater,
      canSubscribe: true,
      canPublishData: isDebater,
    });

    const token = await at.toJwt();

    return NextResponse.json({ token, wsUrl });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}
