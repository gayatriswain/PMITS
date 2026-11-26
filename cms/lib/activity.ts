import "server-only";
import { ActivityLog } from "@/models";
import type { SessionUser } from "./auth";

/** Fire-and-forget audit entry; never blocks or breaks the main request. */
export function logActivity(user: SessionUser | null, action: string, entity: string, entityId?: string, summary?: string) {
  ActivityLog.create({
    user: user?.id,
    userName: user?.name ?? "system",
    action,
    entity,
    entityId,
    summary: summary?.slice(0, 500),
  }).catch((err) => console.error("[activity] failed", err));
}
