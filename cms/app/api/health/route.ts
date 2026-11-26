import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

/** Same contract as the old Express health check, plus DB status. */
export async function GET() {
  try {
    await connectDB();
    return Response.json({ status: "ok", db: mongoose.connection.readyState === 1 ? "connected" : "connecting" });
  } catch {
    return Response.json({ status: "degraded", db: "unavailable" }, { status: 503 });
  }
}
