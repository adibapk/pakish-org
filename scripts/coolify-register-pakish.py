#!/usr/bin/env python3
"""Register Pakish projects in Coolify DB (UI visibility only, no redeploy)."""
from __future__ import annotations

import subprocess
from pathlib import Path

COMPOSE_PATH = Path("/data/coolify/services/pakishnews-stack/docker-compose.yml")


def psql(sql: str) -> str:
    proc = subprocess.run(
        [
            "sudo",
            "docker",
            "exec",
            "-i",
            "coolify-db",
            "psql",
            "-U",
            "coolify",
            "-d",
            "coolify",
            "-v",
            "ON_ERROR_STOP=1",
            "-t",
            "-A",
        ],
        input=sql,
        text=True,
        capture_output=True,
        check=True,
    )
    return proc.stdout.strip()


def psql_exec(sql: str) -> None:
    subprocess.run(
        [
            "sudo",
            "docker",
            "exec",
            "-i",
            "coolify-db",
            "psql",
            "-U",
            "coolify",
            "-d",
            "coolify",
            "-v",
            "ON_ERROR_STOP=1",
        ],
        input=sql,
        text=True,
        check=True,
    )


def clone_application(
    new_id: int,
    uuid: str,
    name: str,
    fqdn: str,
    git_repository: str,
    git_branch: str,
    build_pack: str,
    environment_id: int,
    redirect: str = "both",
    compose_parsing_version: str = "5",
) -> None:
    sql = f"""
    INSERT INTO applications
    SELECT
      {new_id} AS id,
      repository_project_id,
      '{uuid}' AS uuid,
      '{name}' AS name,
      '{fqdn}' AS fqdn,
      config_hash,
      '{git_repository}' AS git_repository,
      '{git_branch}' AS git_branch,
      git_commit_sha,
      git_full_url,
      docker_registry_image_name,
      docker_registry_image_tag,
      '{build_pack}' AS build_pack,
      static_image,
      install_command,
      build_command,
      start_command,
      ports_exposes,
      ports_mappings,
      base_directory,
      publish_directory,
      health_check_path,
      health_check_port,
      health_check_host,
      health_check_method,
      health_check_return_code,
      health_check_scheme,
      health_check_response_text,
      health_check_interval,
      health_check_timeout,
      health_check_retries,
      health_check_start_period,
      limits_memory,
      limits_memory_swap,
      limits_memory_swappiness,
      limits_memory_reservation,
      limits_cpus,
      limits_cpuset,
      limits_cpu_shares,
      'running:healthy' AS status,
      preview_url_template,
      destination_type,
      destination_id,
      source_type,
      source_id,
      private_key_id,
      {environment_id} AS environment_id,
      NOW() AS created_at,
      NOW() AS updated_at,
      description,
      dockerfile,
      health_check_enabled,
      dockerfile_location,
      custom_labels,
      dockerfile_target_build,
      manual_webhook_secret_github,
      manual_webhook_secret_gitlab,
      docker_compose_location,
      docker_compose,
      docker_compose_raw,
      docker_compose_domains,
      deleted_at,
      docker_compose_custom_start_command,
      docker_compose_custom_build_command,
      swarm_replicas,
      swarm_placement_constraints,
      manual_webhook_secret_bitbucket,
      custom_docker_run_options,
      post_deployment_command,
      post_deployment_command_container,
      pre_deployment_command,
      pre_deployment_command_container,
      watch_paths,
      custom_healthcheck_found,
      manual_webhook_secret_gitea,
      '{redirect}' AS redirect,
      '{compose_parsing_version}' AS compose_parsing_version,
      NOW() AS last_online_at,
      custom_nginx_configuration,
      custom_network_aliases,
      is_http_basic_auth_enabled,
      http_basic_auth_username,
      http_basic_auth_password,
      restart_count,
      last_restart_at,
      last_restart_type,
      health_check_type,
      health_check_command,
      max_restart_count,
      noindex_domains,
      domain_dns_statuses,
      true AS container_present,
      restart_limit_reached,
      domain_port_overrides
    FROM applications
    WHERE id = 1
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      uuid = EXCLUDED.uuid,
      fqdn = EXCLUDED.fqdn,
      git_repository = EXCLUDED.git_repository,
      git_branch = EXCLUDED.git_branch,
      build_pack = EXCLUDED.build_pack,
      status = EXCLUDED.status,
      environment_id = EXCLUDED.environment_id,
      updated_at = NOW();
    """
    psql_exec(sql)


def main() -> None:
    team_id = psql("SELECT id FROM teams LIMIT 1;")
    server_id = psql("SELECT id FROM servers WHERE name='localhost' LIMIT 1;")

    psql_exec(
        f"""
        INSERT INTO projects (id, name, uuid, description, team_id, created_at, updated_at)
        VALUES
          (2, 'pakishnews-coolify', 'aabc3bbe-79b6-446b-a18b-66fb663dd8d4', 'Pakish News (Ghost + Next)', {team_id}, NOW(), NOW()),
          (3, 'pakish-net', 'iml93uu746x57xqp4o72qv3b', 'pakish.net', {team_id}, NOW(), NOW()),
          (4, 'pakish-org', 'dv9jr1cvubrccz7ztcv1yy5v', 'pakish.org', {team_id}, NOW(), NOW())
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          uuid = EXCLUDED.uuid,
          description = EXCLUDED.description,
          updated_at = NOW();

        INSERT INTO environments (id, name, uuid, project_id, created_at, updated_at)
        VALUES
          (2, 'production', '74fe4b07-53ef-477f-a5d8-a18a000f7dbf', 2, NOW(), NOW()),
          (3, 'production', 'zazm5xr91kahe2unizptldej', 3, NOW(), NOW()),
          (4, 'production', 'ax209dmy1xhqfq3md5lfksep', 4, NOW(), NOW())
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          uuid = EXCLUDED.uuid,
          project_id = EXCLUDED.project_id,
          updated_at = NOW();

        SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));
        SELECT setval('environments_id_seq', (SELECT MAX(id) FROM environments));
        """
    )

    clone_application(
        new_id=2,
        uuid="x1d77bx25p08ziy9glnehy8t",
        name="pakish-org",
        fqdn="https://pakish.org,https://www.pakish.org",
        git_repository="adibapk/pakish-org",
        git_branch="master",
        build_pack="dockerfile",
        environment_id=4,
    )
    clone_application(
        new_id=3,
        uuid="kss4kwgs4w8cs8cskswosog8",
        name="adibapk/pakish-net:main",
        fqdn="https://pakish.net,https://www.pakish.net",
        git_repository="git@github.com:adibapk/pakish-net.git",
        git_branch="main",
        build_pack="dockerfile",
        environment_id=3,
        compose_parsing_version="5",
    )

    compose_raw = subprocess.check_output(
        ["sudo", "cat", str(COMPOSE_PATH)], text=True
    )
    # Dollar-quote to safely embed YAML in SQL
    tag = "coolify_compose"
    while f"${tag}$" in compose_raw:
        tag += "_x"
    compose_sql = f"${tag}${compose_raw}${tag}$"
    psql_exec(
        f"""
        INSERT INTO services (
          id, uuid, name, environment_id, server_id, description,
          docker_compose_raw, connect_to_docker_network, is_container_label_escape_enabled,
          compose_parsing_version, created_at, updated_at
        )
        VALUES (
          1,
          'i2ck4xw2n4hzyeobl325b0lf',
          'pakishnews-stack',
          2,
          {server_id},
          'Ghost multilingual + Next frontend + MySQL + cf-purge + ai-publisher',
          {compose_sql},
          true,
          false,
          '5',
          NOW(),
          NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          uuid = EXCLUDED.uuid,
          name = EXCLUDED.name,
          environment_id = EXCLUDED.environment_id,
          server_id = EXCLUDED.server_id,
          description = EXCLUDED.description,
          docker_compose_raw = EXCLUDED.docker_compose_raw,
          updated_at = NOW();

        SELECT setval('applications_id_seq', (SELECT MAX(id) FROM applications));
        SELECT setval('services_id_seq', (SELECT MAX(id) FROM services));
        """
    )

    psql_exec(
        """
        INSERT INTO application_settings (
          is_static, is_git_submodules_enabled, is_git_lfs_enabled, is_auto_deploy_enabled,
          is_force_https_enabled, is_debug_enabled, is_preview_deployments_enabled,
          application_id, created_at, updated_at, is_log_drain_enabled, is_gpu_enabled,
          gpu_driver, gpu_count, gpu_device_ids, gpu_options, is_include_timestamps,
          is_swarm_only_worker_nodes, is_raw_compose_deployment_enabled, is_build_server_enabled,
          is_consistent_container_name_enabled, is_gzip_enabled, is_stripprefix_enabled,
          connect_to_docker_network, custom_internal_name, is_container_label_escape_enabled,
          is_env_sorting_enabled, is_container_label_readonly_enabled, is_preserve_repository_enabled,
          disable_build_cache, is_spa, is_git_shallow_clone_enabled, is_pr_deployments_public_enabled,
          use_build_secrets, stop_grace_period, inject_build_args_to_dockerfile,
          include_source_commit_in_build, docker_images_to_keep
        )
        SELECT
          s.is_static, s.is_git_submodules_enabled, s.is_git_lfs_enabled, s.is_auto_deploy_enabled,
          s.is_force_https_enabled, s.is_debug_enabled, s.is_preview_deployments_enabled,
          a.id, NOW(), NOW(), s.is_log_drain_enabled, s.is_gpu_enabled,
          s.gpu_driver, s.gpu_count, s.gpu_device_ids, s.gpu_options, s.is_include_timestamps,
          s.is_swarm_only_worker_nodes, s.is_raw_compose_deployment_enabled, s.is_build_server_enabled,
          s.is_consistent_container_name_enabled, s.is_gzip_enabled, s.is_stripprefix_enabled,
          s.connect_to_docker_network, s.custom_internal_name, s.is_container_label_escape_enabled,
          s.is_env_sorting_enabled, s.is_container_label_readonly_enabled, s.is_preserve_repository_enabled,
          s.disable_build_cache, s.is_spa, s.is_git_shallow_clone_enabled, s.is_pr_deployments_public_enabled,
          s.use_build_secrets, s.stop_grace_period, s.inject_build_args_to_dockerfile,
          s.include_source_commit_in_build, s.docker_images_to_keep
        FROM applications a
        CROSS JOIN application_settings s
        WHERE a.id IN (2, 3)
          AND s.application_id = 1
          AND NOT EXISTS (
            SELECT 1 FROM application_settings existing WHERE existing.application_id = a.id
          );
        """
    )

    for uuid in ("x1d77bx25p08ziy9glnehy8t", "kss4kwgs4w8cs8cskswosog8"):
        subprocess.run(
            ["sudo", "mkdir", "-p", f"/data/coolify/applications/{uuid}"],
            check=True,
        )

    print("=== projects ===")
    print(psql("SELECT id,name,uuid FROM projects ORDER BY id;"))
    print("=== applications ===")
    print(psql("SELECT id,name,uuid,environment_id,status FROM applications ORDER BY id;"))
    print("=== services ===")
    print(psql("SELECT id,name,uuid,environment_id FROM services ORDER BY id;"))


if __name__ == "__main__":
    main()
