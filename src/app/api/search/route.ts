import { Track } from "@/types/Track";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(
  request: Request
): Promise<NextResponse<{ tracks: Track[] }>> {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const res = await axios(`https://api.deezer.com/search/track?q=${q}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return NextResponse.json({ tracks: res.data?.data });
}
