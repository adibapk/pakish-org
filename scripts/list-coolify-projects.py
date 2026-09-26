#!/usr/bin/env python3
import subprocess

cmd = r'''php -r '
require "/var/www/html/vendor/autoload.php";
$app = require "/var/www/html/bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
foreach (DB::table("projects")->get(["id","name"]) as $p) {
  echo $p->id . "|" . $p->name . PHP_EOL;
}
foreach (DB::table("services")->get(["id","name","uuid"]) as $s) {
  echo "service:" . $s->id . "|" . $s->name . "|" . $s->uuid . PHP_EOL;
}
foreach (DB::table("applications")->get(["id","name","uuid"]) as $a) {
  echo "app:" . $a->id . "|" . $a->name . "|" . $a->uuid . PHP_EOL;
}
'
'''
out = subprocess.check_output(["docker", "exec", "coolify", "bash", "-lc", cmd], text=True)
print(out)
