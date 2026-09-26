#!/usr/bin/env python3
import subprocess

php = r'''php -r '
require "/var/www/html/vendor/autoload.php";
$app = require "/var/www/html/bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "=== PROJECTS ===\n";
foreach (DB::table("projects")->get() as $p) {
  echo "project|{$p->id}|{$p->name}|{$p->uuid}\n";
}
echo "=== ENVIRONMENTS ===\n";
foreach (DB::table("environments")->get() as $e) {
  echo "env|{$e->id}|{$e->name}|project={$e->project_id}|{$e->uuid}\n";
}
echo "=== SERVICES ===\n";
foreach (DB::table("services")->get() as $s) {
  echo "service|{$s->id}|{$s->name}|{$s->uuid}|env={$s->environment_id}\n";
}
echo "=== APPLICATIONS ===\n";
foreach (DB::table("applications")->get() as $a) {
  echo "app|{$a->id}|{$a->name}|{$a->uuid}|env={$a->environment_id}|fqdn={$a->fqdn}\n";
}
'
'''
print(subprocess.check_output(["docker", "exec", "coolify", "sh", "-lc", php], text=True))
