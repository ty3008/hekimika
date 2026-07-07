-- =============================================================================
-- HEKIMIKA – Supabase RLS Security Fix
-- Run this in Supabase → SQL Editor
-- =============================================================================
-- Context:
--   This app uses a Node.js/Express backend with a direct Postgres connection
--   (service-role level). The Supabase PostgREST API (anon/public access) must
--   be locked down. RLS is enabled on every table, with policies that:
--     • Allow anonymous READ on public-facing content tables
--     • Block all anonymous WRITE access
--     • Block all anonymous access to sensitive/admin tables entirely
-- =============================================================================


-- ─────────────────────────────────────────────────────────────────────────────
-- 1. ADMINS — sensitive table: fully block public API access
--    (passwords are stored here — must never be exposed)
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- No public policies → no one can read/write via the PostgREST API
-- The backend connects via DATABASE_URL (postgres role) which bypasses RLS


-- ─────────────────────────────────────────────────────────────────────────────
-- 2. REGISTRATIONS — sensitive table: contains names, emails, phone numbers
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- No public policies → only backend can access registrations


-- ─────────────────────────────────────────────────────────────────────────────
-- 3. CONTACT_MESSAGES — sensitive table: contains personal messages & emails
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- No public policies → only backend can access contact messages


-- ─────────────────────────────────────────────────────────────────────────────
-- 4. BLOG_COMMENTS — moderated table: email addresses stored
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- No public policies → only backend reads/writes comments


-- ─────────────────────────────────────────────────────────────────────────────
-- 5. PROGRAMS — public read-only (ministry programs, visible on website)
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on programs" ON public.programs;
CREATE POLICY "Allow public read on programs"
    ON public.programs
    FOR SELECT
    TO anon
    USING (true);


-- ─────────────────────────────────────────────────────────────────────────────
-- 6. BOOKS — public read-only
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on books" ON public.books;
CREATE POLICY "Allow public read on books"
    ON public.books
    FOR SELECT
    TO anon
    USING (true);


-- ─────────────────────────────────────────────────────────────────────────────
-- 7. BLOG_POSTS — public read-only (only published posts)
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on published blog posts" ON public.blog_posts;
CREATE POLICY "Allow public read on published blog posts"
    ON public.blog_posts
    FOR SELECT
    TO anon
    USING (status = 'published');


-- ─────────────────────────────────────────────────────────────────────────────
-- 8. BLOG_CATEGORIES — public read-only
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on blog categories" ON public.blog_categories;
CREATE POLICY "Allow public read on blog categories"
    ON public.blog_categories
    FOR SELECT
    TO anon
    USING (true);


-- ─────────────────────────────────────────────────────────────────────────────
-- 9. DEVOTIONALS — public read-only
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.devotionals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on devotionals" ON public.devotionals;
CREATE POLICY "Allow public read on devotionals"
    ON public.devotionals
    FOR SELECT
    TO anon
    USING (true);


-- ─────────────────────────────────────────────────────────────────────────────
-- 10. EVENTS — public read-only (only active events)
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on active events" ON public.events;
CREATE POLICY "Allow public read on active events"
    ON public.events
    FOR SELECT
    TO anon
    USING (is_active = true);


-- ─────────────────────────────────────────────────────────────────────────────
-- 11. FREE_RESOURCES — public read-only
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.free_resources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on free resources" ON public.free_resources;
CREATE POLICY "Allow public read on free resources"
    ON public.free_resources
    FOR SELECT
    TO anon
    USING (true);


-- ─────────────────────────────────────────────────────────────────────────────
-- 12. TESTIMONIALS — public read-only
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on testimonials" ON public.testimonials;
CREATE POLICY "Allow public read on testimonials"
    ON public.testimonials
    FOR SELECT
    TO anon
    USING (true);


-- ─────────────────────────────────────────────────────────────────────────────
-- 13. PROGRAM_HIGHLIGHTS — public read-only
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.program_highlights ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on program highlights" ON public.program_highlights;
CREATE POLICY "Allow public read on program highlights"
    ON public.program_highlights
    FOR SELECT
    TO anon
    USING (true);


-- =============================================================================
-- VERIFICATION QUERIES — run these after applying to confirm the fix
-- =============================================================================

-- Check which tables have RLS enabled:
-- SELECT schemaname, tablename, rowsecurity
-- FROM pg_tables
-- WHERE schemaname = 'public'
-- ORDER BY tablename;

-- Check existing policies:
-- SELECT tablename, policyname, roles, cmd, qual
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename;
