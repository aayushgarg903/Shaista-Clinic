# Project Task Plan - Dental Clinic MVP Website

This plan details the checklist of milestones to take the Dental Clinic MVP website from initialization to live production.

---

## Milestone 1: Initialization (Protocol Zero)
- [x] Create project memory directory (`docs/`)
- [x] Write project `constitution.md`
- [x] Write checklist of milestones (`task_plan.md`)
- [x] Write `notebook_manifest.md`

## Milestone 2: Technical Architecture & Schema Definition
- [x] Query the **Building a Dental Clinic MVP Website Roadmap** notebook for specific feature and schema requirements
- [x] Define the Supabase database schema (`appointments` table)
- [x] Write DB setup SQL scripts with enabled Row-Level Security (RLS) policies

## Milestone 3: Next.js/React Project Setup
- [x] Initialize the Next.js App Router project in the root directory
- [x] Configure custom styles matching the AntiGravity Design Framework (colors: Dark Forest Green, Soft Cream, Light Lime; fonts: Plus Jakarta Sans; rounded-3xl)
- [x] Create the `.env.local` configuration for Supabase credentials

## Milestone 4: Frontend UI Scaffolding & Components
- [x] Develop the single-page layout structure (Hero, Services Grid, Meet the Doctor, Testimonials)
- [x] Build the interactive **Teeth Knowledge Hub** ("Oral Health 101" SVG anatomy, Myth vs. Fact toggles, tips)
- [x] Implement the Google Maps embed and Floating WhatsApp CTA
- [x] Design the Local Booking Popup Modal

## Milestone 5: Backend & Hidden Admin Portal
- [x] Integrate Supabase Client SDK for appointment bookings
- [x] Implement the **Secret Trigger** (double-click logo) to show the login modal/admin view
- [x] Develop the Admin Dashboard (appointment table, WhatsApp click-to-contact, CSV export)
- [x] Add RLS rules & test security constraints

## Milestone 6: Deployment & Verification
- [ ] Set up SEO JSON-LD schema, metadata, sitemap.xml, and robots.txt
- [ ] Put the code on GitHub and deploy to Vercel
- [ ] Create the final walkthrough verification report
