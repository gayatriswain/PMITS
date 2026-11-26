# ProManage CMS

Backend and admin panel for the ProManage IT Solution website. It runs on Next.js 16 with MongoDB (Mongoose).

- **Admin panel** at `/admin`. Staff use it to edit pages, services, blogs, careers, media, menus, SEO and settings, and to manage leads.
- **Public API** at `/api/public/*`. The website (`../frontend`) reads its content from here.
- **Form endpoints**: `/api/forms`, `/api/leads`, `/api/proposals` and `/api/careers/apply`. Every enquiry form on the website posts here.

The frontend still renders every page with its own coded components, so the design is unchanged. The CMS controls the following:
- each page's SEO
- section order and visibility
- the content of editable sections
- menus and global settings
- pages created in the page builder

The website still renders if the CMS is down: every request has a 3-second timeout, and the built-in content is used instead.

> Next.js 16 has breaking changes compared with older versions. Read [`AGENTS.md`](AGENTS.md) and the bundled docs in `node_modules/next/dist/docs/` before you change framework-level code.

---

## 1. Local setup

```bash
cd cms
npm install --include=dev        # needed if NODE_ENV=production is set on your machine
cp .env.example .env.local       # then fill in the secrets (see §2)

npm run db:dev                   # terminal 1: local MongoDB on 127.0.0.1:27017 (data in .mongo-data/)
npm run seed                     # once: imports pages, sections, menus, settings, services, careers…
npm run admin:create -- --email you@company.com --name "Your Name"   # prompts for a password
npm run dev                      # terminal 2: http://localhost:4000/admin
```

Then start the website (`cd ../frontend && npm run dev`, port 3000) with the CMS values in `frontend/.env.local` (see `frontend/.env.example`).

`npm run db:dev` runs a real `mongod` (from `mongodb-memory-server`) that stores its data on disk, so nothing is lost when it restarts. If you already have MongoDB or Atlas, skip that step and point `MONGODB_URI` at it.

### Scripts

| Script | What it does |
|---|---|
| `npm run dev` / `build` / `start` | Next.js on port 4000 |
| `npm run lint` / `typecheck` | ESLint / `tsc --noEmit` |
| `npm run db:dev` | Local MongoDB for development |
| `npm run seed` | **Idempotent** import of existing site content. It only inserts records that are missing (`$setOnInsert`) and never overwrites anything edited in the admin. Safe to re-run. |
| `npm run admin:create -- --email … --name … [--role super_admin]` | Creates an admin. The password is typed at a hidden prompt (or read from `ADMIN_PASSWORD`). No credentials are hard-coded anywhere. |
| `npm run registry` | Regenerates `lib/sections/pages.generated.json` (pages and their sections, read from the frontend page files) **and** `lib/sections/content.generated.json` (the editable fields of every section). Run it after changing frontend pages or sections, then `npm run seed` to add new sections. |
| `npm run content:codemod [-- --apply] [files…]` | Makes the hard-coded text, images, links and lists of frontend components editable (see §4). A dry run without `--apply`. Safe to re-run; already-converted text is skipped. |
| `npm run test:api` | End-to-end API smoke test (118 checks) against a **running** dev server. Needs `QA_EMAIL` and `QA_PASSWORD` of an existing super admin. It creates `qa.*@example.test` records and deletes them afterwards. |
| `npm run test:mail` | Email (SMTP) end-to-end test (38 checks) against a **running** dev server, using a local test SMTP server. Needs no login details; backs up and restores the saved email settings. |
| `npm run dev:unlock` | Clears login rate limits and lockouts (development helper). |

---

## 2. Environment variables

Put these in `cms/.env.local`, which git ignores. Never commit real values.

| Variable | Required | Notes |
|---|---|---|
| `MONGODB_URI` | yes | `mongodb://127.0.0.1:27017/promanage` locally; an Atlas `mongodb+srv://…` URI in production |
| `AUTH_SECRET` | yes | 32+ random characters; signs the session-token hashes |
| `REVALIDATE_SECRET` | yes | **The same value** must be in `frontend/.env.local`. It protects `/api/revalidate` and the preview links |
| `APP_URL` | yes | Public URL of this CMS. When it starts with `https`, session cookies are marked `Secure` |
| `FRONTEND_URL` | yes | Website URL: used as the CORS allow-list, for revalidation calls and for preview links |
| `EXTRA_IMAGE_HOSTS` | no | Comma-separated extra image hosts allowed in section content (also add them to `frontend/next.config.ts` → `images.remotePatterns`) |
| `EXTRA_CORS_ORIGINS` | no | Comma-separated extra origins allowed to post forms (e.g. `https://www.example.com`) |
| `SESSION_HOURS` | no | Admin session length, default 8 |
| `MEDIA_STORAGE_PROVIDER` | no | `local` (development only) or `cloudinary` |
| `CLOUDINARY_CLOUD_NAME` / `_API_KEY` / `_API_SECRET` | with Cloudinary | |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `MAIL_FROM` | no | Fallback only. Email is normally set up in the admin under **Email (SMTP)**; these are used while that page is switched off. Without any SMTP, reset links are printed to the server console |
| `NEXT_PUBLIC_FRONTEND_URL` | yes | Used by the admin UI for image previews and "View on site" links |

Generate a secret: `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`

---

## 3. Modules (admin panel)

| Menu | What it manages |
|---|---|
| Dashboard | Counts, a 30-day leads chart, recent leads and recent activity |
| Pages | All 31 website pages plus builder pages. Each page has SEO, sections (order, show/hide, content for editable sections), draft → preview → publish, discard and unpublish |
| Services, Blogs, Blog categories, Testimonials, Portfolio, Careers, Team | CRUD with search, filters, pagination, slugs, SEO fields and publish status. Blogs support scheduled publishing |
| Leads / Proposals | Every form submission: status, notes, assignment, filters and CSV export |
| Applications | Job applications. CVs are stored privately and downloaded through an authenticated route |
| Media | Upload images, PDFs and DOCX files (checked by content type, not just extension). Includes the 431 existing images from `frontend/public`. A file cannot be deleted while it is in use |
| Navigation | Header, services mega menu and footer menus (nested items, reorder with up/down) |
| Settings | Site name, logos, contact details, top bar, footer, social links, default SEO, analytics IDs (GA4, GTM, Meta Pixel), notification emails |
| SEO | Overview of every page's title and description with problems flagged (missing, too long or duplicate) |
| Users | Admin accounts and roles (Super Admin only) |
| Activity | Audit log of every admin change |

### Roles

| Role | Can do |
|---|---|
| Super Admin | Everything, including users |
| Admin | Everything except managing users |
| Editor | Pages, sections, content, media, navigation (incl. publish) |
| SEO Manager | Read everything; edit SEO fields only; publish |
| Lead Manager | Leads, proposals, CSV export, job applications |

Permissions are enforced **on the server** for every route (`lib/permissions.ts`). The admin UI only hides buttons the user can't use.

---

### Email (SMTP) and enquiry alerts

*Admin → System → Email (SMTP)* (Super Admin / Admin):

- **Mail server**: host, port, encryption (TLS/STARTTLS on 587, SSL on 465), username and password, with quick-fill buttons for Gmail, Microsoft 365, Zoho, Hostinger, Titan, Brevo and Amazon SES. The password is stored encrypted (AES-256-GCM, key derived from `AUTH_SECRET`) and is never sent back to the browser; leave it empty to keep the saved one. If `AUTH_SECRET` changes, enter the password again.
- **Sender**: From name/email, Reply-To, subject prefix.
- **Recipients**: To, CC and BCC lists. Every website form (all `/api/forms` forms, the legacy lead and proposal forms, and job applications) sends one email to these people. Each email lists every field the visitor filled in, the page it came from and the UTM tags, has a button to open it in the CMS, and its Reply-To is the visitor, so replying goes straight to them. Switches turn alerts on or off for contact forms, proposal requests and job applications.
- **Auto-reply** (optional): a thank-you email to the visitor, with `{name}`, `{siteName}` and `{formName}` placeholders.
- **Send test email**: connects, logs in and sends a test using the values on screen (before saving), with a plain-English error when it fails (wrong password, wrong port/TLS, host unreachable, sender refused). The last result is stored.

Emails are sent after the enquiry is saved, so a mail problem never loses an enquiry. While the page is switched off the `SMTP_*` environment variables are used if they are set.

`npm run test:mail` (needs `npm run dev`) checks the whole flow against a local test SMTP server: validation, encrypted storage, the test button, To/CC/BCC delivery, hidden BCC, Reply-To, escaping, auto-reply, the on/off switches. Real settings are backed up and restored.

### Footer and client logos

*Settings → Footer* now also covers the side card (title, text, button), the stats in the dark band and the "Trusted by" text. *Settings → Client logos* holds the logos in the footer marquee (add, remove, reorder, upload).

## 4. How the website uses the CMS

```
Admin publishes ─▶ CMS saves to MongoDB ─▶ POST frontend /api/revalidate (tags)
                                             └▶ the website re-fetches only those pages
Website page ─▶ GET /api/public/page?path=/seo (3 s timeout, cached, tag "page:/seo")
             └▶ CMS down? → page renders its built-in content
```

- **Coded pages.** Every `frontend/app/**/page.tsx` wraps its sections in `<CmsSections path="/x" sections={[["key", <Comp key="key" />], …]} />`. The CMS supplies their order, visibility and (for editable sections) a `content` prop. Metadata comes from `cmsMetadata(path, staticMetadata)` and JSON-LD from `<JsonLd path>`.
- **Every section is editable.** All text, headings, buttons, links, images/videos and lists (cards, stats, steps, FAQs, logos…) of all 213 sections can be edited under *Pages → (page) → Sections*. Each section shows one collapsible group per component file, with a search box.
  - In the frontend code, editable text looks like `{$t("UiUxHero__t3", "Original text")}` and editable lists like `const cards = useCmsData("UiUxHero__cards", cards__cms)`. The second argument is the built-in default, so **the site renders exactly as coded until something is edited**.
  - **Paragraph formatting.** Paragraphs and other long text (about 1,100 fields) have a small editor: bold, italic, underline, strike, links and line breaks. In the code these are `{rich($t("Key", "Original text"))}` (`frontend/components/cms/rich.tsx`). `rich()` turns only those tags into React elements (no `innerHTML`); the CMS cleans the value again on save (`sanitizeInlineRichText`). Headings, lists and headings-in-paragraphs are deliberately not offered, so the section's design stays intact. Text in data lists (cards, steps) stays plain text.
  - **Buttons.** Every call-to-action button on the site is a real link with an editable URL ("Link URL" next to its "Button text"). Defaults: consultation/quote buttons → `/contact`, case studies/results → `/testimonials`, "View our work" → `/portfolio`, "See how it works"-style buttons → the matching section on the same page (`#how-it-works`, `#how-we-work`, `#all-articles`, `#send-profile`, `#what-we-optimize`, `#smart-tools`). Buttons that are part of an illustration (cart/checkout mock-ups, slider arrows, hover cards) are not links.
  - Only edited values are stored in MongoDB. "Reset to the website's original content" clears them.
  - New items added to a list reuse the icon or colour of the last coded item. Layout, styling and animations stay in code.
  - Images must come from the Media library (CMS uploads or Cloudinary), from site paths (`/…`), or from Unsplash, so the image optimiser always accepts them. Add other hosts with `EXTRA_IMAGE_HOSTS` here and in `frontend/next.config.ts`. Links accept `/path`, `#anchor`, `https://`, `mailto:` and `tel:` only.
  - `FAQSection`, `CtaSection` and `TrustedBar` keep their hand-written field sets (`CODED_WITH_FIELDS` in `lib/sections/registry.ts`).
- **New or changed frontend sections.** Write the component normally. Then:
  1. Run `npm run content:codemod -- --apply` to make its text editable.
  2. Run `npm run registry` to regenerate the field lists.
  3. Run `npm run seed` to add any new section to the database.
  Check the diff: the converter skips class names, colours, SVG paths, animation settings and form logic.
- **Collections drive their sections.**
  - **Careers:** open jobs feed the Career page's *Open positions*.
  - **Testimonials:** published entries replace the *Client stories* cards and videos on every page that shows them.
  - **Portfolio:** published projects with an image feed the home *Featured projects* carousel and the `/portfolio` and `/portfolio/[slug]` pages. Those pages return 404 while nothing is published.
  - **Services:** name, short description, icon and badge feed the matching items in the header's Services mega menu, matched by page URL. *Navigation → services* still decides the groups and order.
  - **Team:** the website has no team section yet, so it doesn't use Team.
  - When a collection has nothing published, the section shows its own (editable) content.
- **Builder pages.** Pages created under *Pages → New page* are built from Hero, Rich text, Cards, Image + text, Stats, FAQ and CTA blocks. They are rendered by `frontend/app/[...slug]/page.tsx`. URLs starting with `/api`, `/admin` or `/blog` are reserved, and coded routes (e.g. `/portfolio`) take precedence.
- **Blog.** `/blog` lists published posts (it falls back to the built-in cards while no posts are published). `/blog/[slug]` renders the article with `BlogPosting` and breadcrumb JSON-LD.
- **Preview.** *Preview* in the page editor opens a signed, expiring link (`/api/draft?path=…&exp=…&sig=…`) that switches the website into Draft Mode. A banner lets you exit.
- **Sitemap and robots.** `frontend/app/sitemap.ts` lists published pages, blog posts and portfolio items. `robots.ts` allows indexing **only** when `ALLOW_INDEXING=true` (set it on the live site only).

---

## 5. API reference

All responses use `{ success, message, data }`, or `{ success:false, message, errors }` on failure. The public form endpoints also return the old Express fields (`ok`, `id`, `error`), so older forms keep working.

### Public (no login)

| Method | Path | Notes |
|---|---|---|
| GET | `/api/health` | DB status |
| GET | `/api/public/page?path=/seo` | Published page and sections |
| GET | `/api/public/navigation/:key` | `header`, `services`, `footer` |
| GET | `/api/public/settings` | Public settings only (no notification emails) |
| GET | `/api/public/collections/:name` | `blogs` (`?category&tag&q&featured&page&limit`), `services`, `testimonials`, `portfolio`, `careers`, `team`, `blog-categories` |
| GET | `/api/public/collections/:name/:slug` | `blogs` (includes related posts), `services`, `portfolio`, `careers` |
| GET | `/api/public/sitemap` | Paths and lastModified for sitemap.xml |
| POST | `/api/forms` | Generic enquiry: `{ formType, name?, email, phone?, company?, service?, budget?, message?, details?, hp }` |
| POST | `/api/leads` | Legacy: `{ idea, email, source?, website }` |
| POST | `/api/proposals` | Legacy: `{ firstName, lastName, email, phone, location, message?, source?, website }` |
| POST | `/api/careers/apply` | multipart: `name, email, phone?, portfolioUrl?, coverLetter?, careerId?, jobTitle?, resume (PDF/DOCX ≤10 MB), website` |

`hp` and `website` are honeypot fields. If a bot fills them in, it gets a normal "success" response and nothing is stored. Form endpoints are rate limited per IP: 6 per 10 minutes per form and 40 per day.

### Auth

`POST /api/auth/login | logout | change-password | forgot-password | reset-password`, `GET /api/auth/me`

### Admin (session cookie + same-origin check on every write)

| Path | Methods |
|---|---|
| `/api/admin/dashboard`, `/api/admin/activity`, `/api/admin/sections` | GET |
| `/api/admin/pages` | GET, POST (builder page) |
| `/api/admin/pages/:id` | GET, PUT (save draft), DELETE (builder pages) |
| `/api/admin/pages/:id/sections` | PUT (save draft sections) |
| `/api/admin/pages/:id/publish`, `/unpublish`, `/discard` | POST |
| `/api/admin/pages/:id/preview` | GET (signed preview URL) |
| `/api/admin/resources/:resource` and `/:id` | GET, POST / GET, PUT, DELETE. Resources: `services`, `blogs`, `blog-categories`, `testimonials`, `portfolio`, `careers`, `team` |
| `/api/admin/enquiries/:kind` and `/:id`, `/export` | `leads` or `proposals`: list, update (status/note/assign), delete, CSV |
| `/api/admin/applications` and `/:id` | list, update, delete |
| `/api/admin/files/:id` | GET private file (CV) |
| `/api/admin/media` and `/:id` | list and upload / update, delete |
| `/api/admin/navigation` and `/:key` | list / GET, PUT |
| `/api/admin/settings` | GET, PUT |
| `/api/admin/users`, `/:id`, `/:id/reset-link` | Super Admin only |

The old `/api/tasks` endpoints from the Express backend are kept for compatibility.

---

## 6. Collections

`adminusers`, `sessions`, `ratelimits` (TTL), `activitylogs`, `pages`, `pagesections`, `services`, `blogs`, `blogcategories`, `testimonials`, `portfolios`, `careers`, `jobapplications`, `teammembers`, `media`, `navigations`, `leads`, `proposals`, `tasks`, `websitesettings`. Schemas are in [`models/`](models).

---

## 7. Security notes

- Passwords are hashed with bcrypt (cost 12) and must be 10+ characters with upper case, lower case and a number. Accounts lock for 15 minutes after 5 failed logins, and logins are rate limited per IP.
- Session tokens are random; only their HMAC is stored. The cookie is `httpOnly`, `SameSite=Lax`, and `Secure` on https. Changing a password or a role revokes the user's sessions.
- Every admin write checks `Origin` (CSRF). All input is validated with Zod. Rich text is sanitized with an allow-list, and links and images must be `/path` or `http(s)://`.
- Uploads are checked by their magic bytes, SVGs containing scripts are rejected, and CVs are stored outside `public/`.
- Admin pages are `noindex` and `no-store`. Security headers are set in `next.config.ts`.

---

## 8. Production checklist

1. MongoDB Atlas (or a managed server) with a dedicated database user that has access to this database only. Put the URI in `MONGODB_URI`.
2. Set `MEDIA_STORAGE_PROVIDER=cloudinary` and the `CLOUDINARY_*` keys. Local `public/uploads` doesn't survive redeploys on most hosts.
3. Set up outgoing email in *Email (SMTP)*: server details, To/CC/BCC recipients, then **Send test email** and Save.
4. New `AUTH_SECRET` and `REVALIDATE_SECRET` values, with the same `REVALIDATE_SECRET` on the website. Set `APP_URL`/`FRONTEND_URL` to the real https URLs, and on the website `CMS_URL`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL` and `ALLOW_INDEXING=true`.
5. `npm run seed` once against the production database, then `npm run admin:create` for the first Super Admin.
6. Replace the placeholder contact details in *Settings* (header top bar and footer currently show different sample phone numbers and addresses). Review the seeded draft blogs and testimonials before publishing them.

## 9. Not migrated (needs a decision)

- The old Express API in `../backend` is untouched and still works. Its MySQL tables were never created, so there was no lead data to move.
- The local MySQL database `promanage` is actually a **WordPress** database (about 19.5k posts, 203 Elementor form submissions, 3 career applications). It was **not** imported. Migrating it needs an explicit decision about which records to bring over.

## Sharing the content database through git

The website content (pages, sections, global sections, services, blogs, careers, menus, settings,
media records) is kept in `db/data/*.json` so the whole team works with the same content.

| When | Run (in `cms/`) |
|---|---|
| Before you commit/push, if you changed anything in the admin | `npm run db:export`, then commit `db/data/` with your code |
| After `git pull` | `npm run db:import` |

- **Not shared, ever:** admin users, sessions, leads, proposal requests, job applications, SMTP/email
  settings, activity log, private files (CVs in `storage/`). Each developer creates their own admin
  with `npx tsx scripts/create-admin.ts` and sets up email in the admin.
- `db:import` **replaces** the shared content in your local database. Your previous data is saved
  first to `.db-backups/<date>/` (not committed). It refuses to run against a non-local database
  (Atlas/production) unless you add `-- --allow-remote`.
- Images uploaded in the admin (`public/uploads/`) are committed too, so they arrive with the data.
- Two people editing the same page in the admin at the same time will get a git conflict in
  `db/data/*.json`, like any code conflict - agree who edits what, and export/commit often.
