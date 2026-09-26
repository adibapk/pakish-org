#!/usr/bin/env python3
"""Register pakish-whatsapp-stack in Coolify DB (UI visibility only)."""
from __future__ import annotations

import subprocess

SERVICE_ID = 2
SERVICE_UUID = "w8k3m9p2q7r4s1t6u0v5x8y3z"
ENVIRONMENT_ID = 3  # pakish-net production
COMPOSE_CMD = [
    "sudo",
    "bash",
    "-lc",
    "cat /opt/pakish-whatsapp-platform/deploy/docker-compose.yml "
    "/opt/pakish-whatsapp-platform/deploy/docker-compose.sg.override.yml",
]


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


def main() -> None:
    server_id = psql("SELECT id FROM servers WHERE name='localhost' LIMIT 1;")
    compose_raw = subprocess.check_output(COMPOSE_CMD, text=True)
    tag = "cw_compose"
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
          {SERVICE_ID},
          '{SERVICE_UUID}',
          'pakish-whatsapp-stack',
          {ENVIRONMENT_ID},
          {server_id},
          'Chatwoot + Copilot WhatsApp platform (inbox.pakish.net, copilot.pakish.net)',
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

        SELECT setval('services_id_seq', (SELECT MAX(id) FROM services));
        """
    )

    print("=== services ===")
    print(psql("SELECT id,name,uuid,environment_id FROM services ORDER BY id;"))


if __name__ == "__main__":
    main()
