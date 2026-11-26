# Promanage

The monorepo for the ProManage IT Solution website.

| Folder | What it is | Port |
|---|---|---|
| [`frontend/`](frontend/) | The public website (Next.js 16). Every page keeps its coded design and reads content, SEO, menus and settings from the CMS | 3000 |
| [`cms/`](cms/) | **Backend + admin CMS** (Next.js 16 + MongoDB). Provides the admin panel at `/admin`, the public content API and every form endpoint | 4000 |
| [`backend/`](backend/) | The **old** Express + MySQL API. It is kept unchanged for reference. The website no longer uses it: forms now post to the CMS, which accepts the same `/api/leads` and `/api/proposals` payloads | 5000 |

## Run locally

```bash
# 1. CMS + database
cd cms
npm install --include=dev
cp .env.example .env.local        # fill AUTH_SECRET and REVALIDATE_SECRET (see cms/README.md)
npm run db:dev                    # terminal 1: local MongoDB
npm run seed                      # first time only
npm run admin:create -- --email you@company.com --name "Your Name"
npm run dev                       # terminal 2: http://localhost:4000/admin

# 2. Website
cd ../frontend
npm install --include=dev
cp .env.example .env.local        # same REVALIDATE_SECRET as the CMS
npm run dev                       # terminal 3: http://localhost:3000
```

> If `NODE_ENV=production` is set globally on your machine, `npm install` skips dev dependencies. Use `npm install --include=dev`.

Read [`cms/README.md`](cms/README.md) for the modules, roles, API reference, environment variables and production checklist. Read [`frontend/README.md`](frontend/README.md) for the site structure and how pages connect to the CMS.

## Never commit

`.env.local` / `.env*` (except `.env.example`), `cms/.mongo-data/`, `cms/storage/` (private CVs), `cms/public/uploads/`, and the design-reference folders in `frontend/public/` (`AI Seo`, `local seo`).
