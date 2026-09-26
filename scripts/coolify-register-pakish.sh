#!/usr/bin/env bash
# Register Pakish projects in Coolify DB on pakish-sg without redeploying live containers.
set -euo pipefail

DB="sudo docker exec -i coolify-db psql -U coolify -d coolify -v ON_ERROR_STOP=1"

run_sql() {
  echo "$1" | $DB
}

echo "=== Current state ==="
echo "SELECT id,name,uuid FROM projects;" | $DB
echo "SELECT id,name,uuid FROM applications;" | $DB
echo "SELECT id,name,uuid FROM services;" | $DB

# Reference row from adibapk app
ADIBA=$(
  echo "SELECT environment_id, destination_id, destination_type, build_pack, ports_exposes, ports_mappings, base_directory, publish_directory, dockerfile, dockerfile_location, docker_registry_image_name, docker_registry_image_tag, health_check_enabled, health_check_path, health_check_port, health_check_host, health_check_method, health_check_return_code, health_check_scheme, health_check_response_text, health_check_interval, health_check_timeout, health_check_retries, health_check_start_period, limits_memory, limits_memory_swap, limits_memory_swappiness, limits_memory_reservation, limits_cpus, limits_cpuset, limits_cpu_shares, status, preview_url_template, is_auto_deploy_enabled, is_force_https_enabled, is_static, is_git_submodules_enabled, is_git_lfs_enabled, is_preserve_repository_enabled, is_public, is_log_drain_enabled, is_include_timestamps_enabled, is_gzip_enabled, is_stripprefix_enabled, is_build_server_enabled, manual_webhook_secret_github, manual_webhook_secret_gitlab, manual_webhook_secret_bitbucket, manual_webhook_secret_gitea, manual_webhook_secret_custom, redirect, custom_nginx_configuration, custom_healthcheck_found, custom_healthcheck_string, custom_docker_run_options, post_deployment_command, post_deployment_command_container, pre_deployment_command, pre_deployment_command_container, watch_paths, server_id, source_id, source_type, private_key_id, git_repository, git_branch, git_commit_sha, git_full_url, git_is_repository_public, git_is_commit_production, git_is_first_commit, git_is_repository_deployable, git_repository_id, git_repository_project_id, git_repository_server_url, git_repository_type, git_repository_web_url, git_repository_clone_url, git_repository_ssh_url, git_repository_http_url, git_repository_default_branch, git_repository_provider, git_repository_owner, git_repository_name, git_repository_full_name, git_repository_description, git_repository_language, git_repository_is_private, git_repository_is_fork, git_repository_is_archived, git_repository_is_disabled, git_repository_is_template, git_repository_is_empty, git_repository_is_mirror, git_repository_is_bare, git_repository_is_shallow, git_repository_has_issues, git_repository_has_projects, git_repository_has_wiki, git_repository_has_pages, git_repository_has_downloads, git_repository_has_discussions, git_repository_stargazers_count, git_repository_forks_count, git_repository_open_issues_count, git_repository_watchers_count, git_repository_size, git_repository_created_at, git_repository_updated_at, git_repository_pushed_at, git_repository_homepage, git_repository_license, git_repository_topics, git_repository_visibility, git_repository_permissions, git_repository_allow_rebase_merge, git_repository_allow_squash_merge, git_repository_allow_merge_commit, git_repository_delete_branch_on_merge, git_repository_has_pull_requests, git_repository_has_actions, git_repository_has_packages, git_repository_has_security, git_repository_has_dependabot, git_repository_has_code_scanning, git_repository_has_secret_scanning, git_repository_has_vulnerability_alerts, git_repository_has_discussions_enabled, git_repository_has_projects_enabled, git_repository_has_wiki_enabled, git_repository_has_issues_enabled, git_repository_has_downloads_enabled, git_repository_has_pages_enabled, git_repository_has_pull_requests_enabled, git_repository_has_actions_enabled, git_repository_has_packages_enabled, git_repository_has_security_enabled, git_repository_has_dependabot_enabled, git_repository_has_code_scanning_enabled, git_repository_has_secret_scanning_enabled, git_repository_has_vulnerability_alerts_enabled FROM applications WHERE id=1;" | $DB -t -A 2>/dev/null || true
)

echo "Adiba app columns dump skipped (too wide); using minimal inserts."

SERVER_ID=$(echo "SELECT id FROM servers WHERE name='localhost' LIMIT 1;" | $DB -t -A | tr -d ' ')
TEAM_ID=$(echo "SELECT id FROM teams LIMIT 1;" | $DB -t -A | tr -d ' ')

echo "SERVER_ID=$SERVER_ID TEAM_ID=$TEAM_ID"

# --- Projects ---
run_sql "
INSERT INTO projects (id, name, uuid, description, team_id, created_at, updated_at)
VALUES
  (2, 'pakishnews-coolify', 'aabc3bbe-79b6-446b-a18b-66fb663dd8d4', 'Pakish News stack (Ghost + Next)', ${TEAM_ID}, NOW(), NOW()),
  (3, 'pakish-net', 'iml93uu746x57xqp4o72qv3b', 'pakish.net Next.js site', ${TEAM_ID}, NOW(), NOW()),
  (4, 'pakish-org', 'dv9jr1cvubrccz7ztcv1yy5v', 'pakish.org Next.js site', ${TEAM_ID}, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));
"

run_sql "
INSERT INTO environments (id, name, uuid, project_id, created_at, updated_at)
VALUES
  (2, 'production', '74fe4b07-53ef-477f-a5d8-a18a000f7dbf', 2, NOW(), NOW()),
  (3, 'production', 'zazm5xr91kahe2unizptldej', 3, NOW(), NOW()),
  (4, 'production', 'ax209dmy1xhqfq3md5lfksep', 4, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
SELECT setval('environments_id_seq', (SELECT MAX(id) FROM environments));
"

# Copy minimal application fields from adibapk template
run_sql "
INSERT INTO applications (
  id, name, uuid, description, fqdn, ports_exposes, destination_type, destination_id,
  repository_project_id, git_repository, git_branch, build_pack, status, environment_id,
  server_id, health_check_enabled, health_check_path, health_check_port, health_check_method,
  health_check_return_code, health_check_scheme, health_check_interval, health_check_timeout,
  health_check_retries, is_auto_deploy_enabled, is_force_https_enabled, is_public,
  created_at, updated_at
)
SELECT
  2, 'pakish-org', 'x1d77bx25p08ziy9glnehy8t', 'pakish.org', 'https://pakish.org,https://www.pakish.org',
  ports_exposes, destination_type, destination_id, repository_project_id,
  'adibapk/pakish-org', 'master', build_pack, 'running:healthy', 4,
  server_id, health_check_enabled, health_check_path, health_check_port, health_check_method,
  health_check_return_code, health_check_scheme, health_check_interval, health_check_timeout,
  health_check_retries, is_auto_deploy_enabled, is_force_https_enabled, is_public,
  NOW(), NOW()
FROM applications WHERE id=1
ON CONFLICT (id) DO NOTHING;

INSERT INTO applications (
  id, name, uuid, description, fqdn, ports_exposes, destination_type, destination_id,
  repository_project_id, git_repository, git_branch, build_pack, status, environment_id,
  server_id, health_check_enabled, health_check_path, health_check_port, health_check_method,
  health_check_return_code, health_check_scheme, health_check_interval, health_check_timeout,
  health_check_retries, is_auto_deploy_enabled, is_force_https_enabled, is_public,
  created_at, updated_at
)
SELECT
  3, 'adibapk/pakish-net:main', 'kss4kwgs4w8cs8cskswosog8', 'pakish.net', 'https://pakish.net,https://www.pakish.net',
  ports_exposes, destination_type, destination_id, repository_project_id,
  'git@github.com:adibapk/pakish-net.git', 'main', build_pack, 'running:healthy', 3,
  server_id, health_check_enabled, health_check_path, health_check_port, health_check_method,
  health_check_return_code, health_check_scheme, health_check_interval, health_check_timeout,
  health_check_retries, is_auto_deploy_enabled, is_force_https_enabled, is_public,
  NOW(), NOW()
FROM applications WHERE id=1
ON CONFLICT (id) DO NOTHING;

SELECT setval('applications_id_seq', (SELECT MAX(id) FROM applications));
"

# Service for pakishnews-stack - read compose from disk
COMPOSE_RAW=$(sudo python3 - <<'PY'
import json, pathlib
p = pathlib.Path('/data/coolify/services/pakishnews-stack/docker-compose.yml')
print(json.dumps(p.read_text()))
PY
)

run_sql "
INSERT INTO services (
  id, name, uuid, description, environment_id, server_id, docker_compose_raw,
  docker_compose, docker_compose_location, connect_to_docker_network, is_container_label_escape_enabled,
  created_at, updated_at
)
VALUES (
  1,
  'pakishnews-stack',
  'i2ck4xw2n4hzyeobl325b0lf',
  'Ghost multilingual + Next frontend + MySQL + cf-purge + ai-publisher',
  2,
  ${SERVER_ID},
  ${COMPOSE_RAW}::text,
  NULL,
  '/data/coolify/services/pakishnews-stack/docker-compose.yml',
  true,
  false,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  uuid = EXCLUDED.uuid,
  environment_id = EXCLUDED.environment_id,
  docker_compose_raw = EXCLUDED.docker_compose_raw,
  updated_at = NOW();
SELECT setval('services_id_seq', (SELECT MAX(id) FROM services));
"

# Link service applications (cf-purge, frontend-nextgen) as optional - skip for now

# Create application directories Coolify expects
sudo mkdir -p /data/coolify/applications/x1d77bx25p08ziy9glnehy8t
sudo mkdir -p /data/coolify/applications/kss4kwgs4w8cs8cskswosog8
sudo chown -R 9999:root /data/coolify/applications/x1d77bx25p08ziy9glnehy8t /data/coolify/applications/kss4kwgs4w8cs8cskswosog8 2>/dev/null || true

echo "=== Final state ==="
echo "SELECT id,name,uuid FROM projects ORDER BY id;" | $DB
echo "SELECT id,name,uuid,environment_id,status,fqdn FROM applications ORDER BY id;" | $DB
echo "SELECT id,name,uuid,environment_id FROM services ORDER BY id;" | $DB

echo "Done. Refresh Coolify UI at https://coolify.adiba.pk"
