# Memory: index.md
Updated: now

# Project Memory

## Core
Dark blue theme (bg 220 60% 8%), primary YELLOW hsl(45 95% 58%). Apple-style minimal, premium romantic.
Supabase (Lovable Cloud) for DB + Storage (4GB). Tables: media, wedding_folders, bookings, packages, user_credits, generated_designs.
Admin password "ikamba2024". Admin manages folders, media (with category dropdown per item), packages (CRUD + publish toggle), and bookings.
Never use YouTube JS API for hero video; static iframe only.
Pricing/packages are loaded dynamically from `packages` table (published only). Hero buttons: Images + Videos linking to /portfolio?type=...

## Memories
- [Project Identity](mem://project/identity) — Core platform architecture (public galleries vs private protected folders)
- [Brand Identity & Aesthetics](mem://style/branding) — Visual design tokens, colors, themes, and typography references
- [Site Structure & Layout](mem://features/site-structure) — Core page sections and specific storytelling layout rules
- [Hero Section Design](mem://style/hero-design) — Visual elements, animations, and CTAs in the hero section
- [Hero Video Implementation](mem://technical/hero-video-implementation) — Static iframe approach to avoid React reconciliation conflicts
- [Media Management](mem://features/media-management) — Folder structure, event categories, and photo/video separation
- [Social Sharing](mem://features/social-sharing) — Supported platforms for media sharing
- [Booking System](mem://features/booking-system) — Booking request flow, admin management, and packages
