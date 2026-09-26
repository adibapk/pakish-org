#!/usr/bin/env python3
"""Remove migrated Pakish projects from old Luraflow Coolify DB."""
from __future__ import annotations

import subprocess

PAKISH_PROJECT_IDS = (1, 3, 5)  # pakishnews-coolify, pakish-net, pakish-org
PAKISH_ENV_IDS = (1, 3, 5)
PAKISH_APP_IDS = (22, 29, 30, 32, 34)
PAKISH_SERVICE_IDS = (1, 2)
PAKISH_SERVICE_APP_SERVICE_IDS = (1, 2)

SERVICE_UUIDS = (
    "i2ck4xw2n4hzyeobl325b0lf",  # pakishnews-stack
    "a12bv0pcomnqts0mwpykvjhu",  # pakish-whatsapp-stack
)
APP_UUIDS = (
    "kss4kwgs4w8cs8cskswosog8",  # pakish-net
    "x1d77bx25p08ziy9glnehy8t",  # pakish-org
    "dhmd88lw0iji2jkcnncsy272",  # cf-purge (legacy app)
    "d6z9pg1rpwepa0kfmp7up6t8",  # ai-publisher legacy
    "eveisidjog2rgqmhly80i7zx",  # frontend-nextgen
)


def psql_exec(sql: str) -> str:
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
        ],
        input=sql,
        text=True,
        capture_output=True,
        check=True,
    )
    return proc.stdout


def psql_query(sql: str) -> str:
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
            "-t",
            "-A",
        ],
        input=sql,
        text=True,
        capture_output=True,
        check=True,
    )
    return proc.stdout.strip()


def main() -> None:
    app_ids = ",".join(str(i) for i in PAKISH_APP_IDS)
    app_ids_q = ",".join(f"'{i}'" for i in PAKISH_APP_IDS)
    env_ids = ",".join(str(i) for i in PAKISH_ENV_IDS)
    project_ids = ",".join(str(i) for i in PAKISH_PROJECT_IDS)
    service_ids = ",".join(str(i) for i in PAKISH_SERVICE_IDS)

    print("=== before projects ===")
    print(psql_query("SELECT id,name FROM projects ORDER BY id;"))

    psql_exec(
        f"""
        BEGIN;

        DELETE FROM service_applications WHERE service_id IN ({service_ids});
        DELETE FROM application_settings WHERE application_id IN ({app_ids});
        DELETE FROM additional_destinations WHERE application_id IN ({app_ids});
        DELETE FROM application_deployment_queues WHERE application_id IN ({app_ids_q});
        DELETE FROM application_previews WHERE application_id IN ({app_ids});
        DELETE FROM applications WHERE id IN ({app_ids});
        DELETE FROM services WHERE id IN ({service_ids});
        DELETE FROM standalone_redis WHERE environment_id IN ({env_ids});
        DELETE FROM shared_environment_variables WHERE project_id IN ({project_ids}) OR environment_id IN ({env_ids});
        DELETE FROM environments WHERE id IN ({env_ids});
        DELETE FROM projects WHERE id IN ({project_ids});

        COMMIT;
        """
    )

    for uuid in SERVICE_UUIDS:
        subprocess.run(
            ["sudo", "rm", "-rf", f"/data/coolify/services/{uuid}"],
            check=False,
        )
    for uuid in APP_UUIDS:
        subprocess.run(
            ["sudo", "rm", "-rf", f"/data/coolify/applications/{uuid}"],
            check=False,
        )

    subprocess.run(
        [
            "sudo",
            "bash",
            "-lc",
            "echo '[2026-09-26] Removed Pakish Coolify projects (pakishnews-coolify, pakish-net, pakish-org) from Luraflow UI/DB — migrated to pakish-sg' >> /var/log/pakish-migration.log",
        ],
        check=True,
    )

    print("=== after projects ===")
    print(psql_query("SELECT id,name FROM projects ORDER BY id;"))
    print("=== after services ===")
    print(psql_query("SELECT id,name FROM services ORDER BY id;"))


if __name__ == "__main__":
    main()
