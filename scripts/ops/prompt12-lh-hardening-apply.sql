-- Prompt 12: disable public signup and privatize disposable test course
UPDATE organizationconfig
SET config = jsonb_set(
  config::jsonb,
  '{admin_toggles,members,signup_mode}',
  '"inviteOnly"'
)
WHERE org_id = 1;

UPDATE organizationconfig
SET config = jsonb_set(
  config::jsonb,
  '{features,members,signup_mode}',
  '"inviteOnly"',
  true
)
WHERE org_id = 1;

UPDATE course
SET public = false,
    published = false
WHERE id = 1;

SELECT config->'admin_toggles'->'members'->>'signup_mode' AS signup_mode
FROM organizationconfig
WHERE org_id = 1;

SELECT id, name, public, published
FROM course
WHERE id = 1;
