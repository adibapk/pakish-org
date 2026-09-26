-- Prompt 12: LearnHouse hardening (read-only inspection + updates)
SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY 1;

SELECT id, name, public, open_to_contributors, published
FROM course
ORDER BY creation_date;

SELECT orgconfig_id, signup_mode, config
FROM orgconfig
LIMIT 5;
