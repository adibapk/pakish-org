import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { readingResourceHosts } from "@/lib/reading-activity";

export async function POST(request: Request) {
  const host = new URL(request.url).searchParams.get("host");
  if (!host || !readingResourceHosts.has(host)) {
    return new Response(null, { status: 400 });
  }
  if (request.headers.get("sec-fetch-site") !== "same-origin" ||
      request.headers.get("content-type") !== "text/ping") {
    return new Response(null, { status: 403 });
  }
  if (request.headers.get("sec-gpc") !== "1" && request.headers.get("dnt") !== "1") {
    const day = new Date().toISOString().slice(0, 10);
    const directory = path.join(process.cwd(), ".data", "reading-activity", day);
    await mkdir(directory, { recursive: true });
    // O_APPEND preserves concurrent increments. The byte length is the daily count.
    await appendFile(path.join(directory, host), ".");
  }
  return new Response(null, { status: 204 });
}
