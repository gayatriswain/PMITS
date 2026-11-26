import { z } from "zod";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Career, JobApplication } from "@/models";
import { rateLimit } from "@/lib/rate-limit";
import { clientIp, corsHeaders, hmac } from "@/lib/security";
import { uploadMedia } from "@/lib/services/media";
import { HttpError, zodErrors } from "@/lib/api";
import { preflight } from "@/lib/public-form";
import { notifyTeam } from "@/lib/mailer";
import { env } from "@/lib/env";

const fields = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().toLowerCase().email("Please enter a valid email.").max(255),
  phone: z.string().trim().regex(/^$|^\+?[0-9\s\-()]{7,20}$/, "Please enter a valid phone number.").optional(),
  portfolioUrl: z.string().trim().regex(/^$|^https?:\/\/\S+$/, "Use a full https:// link").max(500).optional(),
  coverLetter: z.string().trim().max(5000).optional(),
  careerId: z.string().optional(),
  jobTitle: z.string().trim().max(200).optional(),
});

/** Job application with optional CV (PDF/DOCX), stored privately. multipart/form-data. */
export async function POST(req: Request) {
  const headers = corsHeaders(req);
  try {
    const form = await req.formData();
    if (String(form.get("website") || "")) return NextResponse.json({ success: true, ok: true }, { status: 201, headers });
    await rateLimit(`apply:${hmac(clientIp(req))}`, 5, 3600);
    const data = fields.parse(Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === "string")));
    await connectDB();
    let career = null;
    if (data.careerId && isValidObjectId(data.careerId)) career = await Career.findOne({ _id: data.careerId, status: "open" }).lean();
    const cv = form.get("resume");
    let resumeId;
    if (cv && typeof cv === "object" && "arrayBuffer" in cv && (cv as File).size > 0) {
      const m = await uploadMedia(null, cv as File, { folder: "resumes", privateFile: true, documentsOnly: true });
      resumeId = m._id;
    }
    const app = await JobApplication.create({
      career: career?._id,
      jobTitle: career?.title ?? data.jobTitle ?? "General application",
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      portfolioUrl: data.portfolioUrl || undefined,
      coverLetter: data.coverLetter,
      resume: resumeId,
    });
    void notifyTeam({
      event: "applications",
      title: `New job application: ${app.jobTitle}`,
      visitorEmail: data.email,
      visitorName: data.name,
      formName: "job application",
      link: `${env.appUrl}/admin/applications`,
      rows: [
        ["Position", app.jobTitle],
        ["Name", data.name],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Portfolio", data.portfolioUrl],
        ["Cover letter", data.coverLetter],
        ["CV attached", resumeId ? "Yes - download it from the CMS" : "No"],
      ],
    });
    return NextResponse.json({ success: true, ok: true, id: String(app._id), message: "Application received. Our team will review it soon." }, { status: 201, headers });
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errors = zodErrors(err);
      const first = Object.values(errors)[0];
      return NextResponse.json({ success: false, message: first, error: first, errors }, { status: 400, headers });
    }
    if (err instanceof HttpError) return NextResponse.json({ success: false, message: err.message, error: err.message }, { status: err.status, headers });
    console.error("[careers/apply]", err);
    return NextResponse.json({ success: false, message: "Something went wrong. Please try again.", error: "Something went wrong. Please try again." }, { status: 500, headers });
  }
}
export const OPTIONS = preflight;
