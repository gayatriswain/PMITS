import "server-only";
import { connectDB } from "@/lib/mongodb";
import { ActivityLog, Blog, Career, JobApplication, Lead, Page, PageSection, Portfolio, Proposal, Service, Testimonial } from "@/models";

/** All numbers come straight from MongoDB. */
export async function dashboardStats() {
  await connectDB();
  const since30 = new Date(Date.now() - 30 * 86400_000);
  const [
    pages, pagesPublished, pagesPending, services, blogs, blogsDraft, testimonials, portfolio, careersOpen,
    leadsTotal, leadsNew, proposalsTotal, proposalsNew, applicationsNew, sectionsTotal,
    recentLeads, recentActivity, perDay, byForm, byStatus,
  ] = await Promise.all([
    Page.countDocuments(),
    Page.countDocuments({ status: "published" }),
    Page.countDocuments({ hasUnpublishedChanges: true }),
    Service.countDocuments({ status: "published" }),
    Blog.countDocuments({ status: "published" }),
    Blog.countDocuments({ status: { $in: ["draft", "scheduled"] } }),
    Testimonial.countDocuments({ status: "published" }),
    Portfolio.countDocuments({ status: "published" }),
    Career.countDocuments({ status: "open" }),
    Lead.countDocuments(),
    Lead.countDocuments({ status: "new" }),
    Proposal.countDocuments(),
    Proposal.countDocuments({ status: "new" }),
    JobApplication.countDocuments({ status: "new" }),
    PageSection.countDocuments(),
    Lead.find({}, "name email formType source status createdAt").sort({ createdAt: -1 }).limit(8).lean(),
    ActivityLog.find().sort({ createdAt: -1 }).limit(12).lean(),
    Lead.aggregate([
      { $match: { createdAt: { $gte: since30 } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, n: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]),
    Lead.aggregate([{ $group: { _id: "$formType", n: { $sum: 1 } } }, { $sort: { n: -1 } }, { $limit: 8 }]),
    Lead.aggregate([{ $group: { _id: "$status", n: { $sum: 1 } } }]),
  ]);

  // Continuous 30-day series (days without leads = 0).
  const map = new Map(perDay.map((d: { _id: string; n: number }) => [d._id, d.n]));
  const series = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(Date.now() - (29 - i) * 86400_000).toISOString().slice(0, 10);
    return { date: d.slice(5), leads: map.get(d) ?? 0 };
  });

  return {
    totals: { pages, pagesPublished, pagesPending, services, blogs, blogsDraft, testimonials, portfolio, careersOpen, leadsTotal, leadsNew, proposalsTotal, proposalsNew, applicationsNew, sectionsTotal },
    recentLeads,
    recentActivity,
    series,
    byForm: byForm.map((x: { _id: string; n: number }) => ({ name: x._id || "unknown", value: x.n })),
    byStatus: byStatus.map((x: { _id: string; n: number }) => ({ name: x._id, value: x.n })),
  };
}
