/** Dev helper: clear rate-limit counters and account lockouts (e.g. after running the smoke test). */
import { connect, disconnect } from "./_db";
import { AdminUser, RateLimit } from "../models";

(async () => {
  await connect();
  const r = await RateLimit.deleteMany({});
  const u = await AdminUser.updateMany({}, { $set: { failedLogins: 0 }, $unset: { lockedUntil: 1 } });
  console.log(`Cleared ${r.deletedCount} rate-limit counters, unlocked ${u.modifiedCount} accounts.`);
  await disconnect();
})();
