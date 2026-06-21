# Project Constitution - Dental Clinic MVP Website

This constitution establishes the architectural constraints, system logic, design systems, and security protocols for the Dental Clinic MVP Website, in accordance with the BLAST and AntiGravity Frameworks.

---

## 1. Technical Stack & Architectural Constraints
*   **Core Structure:** Single-page scrolling layout (Hero, Services Grid, Meet the Doctor, Patient Testimonials, Teeth Knowledge Hub).
*   **Frontend Framework:** Next.js (App Router) / React, styling using custom HSL/CSS variables or Tailwind CSS.
*   **Backend & DB:** Supabase PostgreSQL database for appointment bookings.
*   **Deployment:** GitHub repository deployed automatically to Vercel.

---

## 2. Design System & Aesthetics (AntiGravity Framework)
*   **Aesthetic Theme:** "Minimalist Luxury" with a friendly, safe medical feel.
*   **Color Palette:**
    *   *Primary / Buttons:* Dark Forest Green
    *   *Background / Canvas:* Soft Cream
    *   *Accents / Highlights:* Light Lime
*   **Typography:** Plus Jakarta Sans or Inter.
*   **Corner Radii:** Extra-rounded corners (`rounded-3xl` / 24px) for cards, modals, and buttons to convey safety and warmth.
*   **Mobile-First UX:**
    *   Vertical grid stacking on small viewports.
    *   Sticky Mobile CTA pinned to the bottom of mobile screens.
    *   Touch-Friendly scaling for tap targets.

---

## 3. Database Schema (Supabase PostgreSQL)
The backend manages data securely using a single `appointments` table:

```sql
create table appointments (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  service text not null,
  preferred_date timestamp with time zone not null,
  completed boolean default false not null,
  contacted boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### Security & Row-Level Security (RLS)
*   **Anonymized Booking:** Public users must be allowed to `INSERT` appointments.
*   **Admin Dashboard Protection:** `SELECT`, `UPDATE`, and `DELETE` access must be restricted to authenticated admin users, or secured via a server-side session/API token verification to prevent data leaks.
*   **Secrets Isolation:** Database secrets, service roles, and API tokens must be saved exclusively in `.env.local` and never checked into Git.

---

## 4. Key Integrations & Features
*   **Floating WhatsApp Button:** Positioned in the bottom-right corner for quick patient chat.
*   **Google Maps Embed:** Located near the footer for clinic navigation (Targeted for Rohtak, Haryana).
*   **Local Booking Popup Modal:** A sleek overlay for booking requests.
*   **Teeth Knowledge Hub ("Oral Health 101"):**
    *   Interactive cards for cavity prevention, braces, and gum health.
    *   An interactive "Tooth Anatomy" SVG clicker.
    *   "Myth vs. Fact" interactive toggles.
    *   Dynamically updating daily tips.
    *   Post-procedure after-care instructions.
*   **Hidden Admin Portal:**
    *   *Secret Trigger:* Double-clicking or long-pressing the clinic logo in the navigation bar.
    *   *Admin UI:* Appointment records table, inbox, quick WhatsApp contact action per patient, and CSV data export capability.

---

## 5. SEO Requirements
The site must target local searches in **Rohtak, Haryana** using:
*   JSON-LD LocalBusiness Schema markup.
*   Semantic heading hierarchy (single H1, structured H2/H3).
*   Meta Open Graph tags for social sharing.
*   Proper robots.txt and sitemap.xml files.
