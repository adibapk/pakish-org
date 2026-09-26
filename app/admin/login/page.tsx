import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { isAdminConfigured, requireAdminSession } from "@/lib/admin/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: { absolute: "Admin Login | Pakish Institute" },
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await requireAdminSession()) {
    redirect("/admin/leads");
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mx-auto mb-8 max-w-sm text-center">
        <p className="text-sm tracking-wider text-primary">Pakish Institute</p>
        <h1 className="mt-2 text-3xl font-bold">Admin Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage admission leads and payment verification.
        </p>
      </div>
      {!isAdminConfigured() ? (
        <p className="mx-auto max-w-md text-center text-sm text-destructive">
          Set <code>ADMIN_SECRET</code> (or <code>ADMIN_PASSWORD</code>) in the
          environment before using admin login.
        </p>
      ) : (
        <AdminLoginForm />
      )}
    </main>
  );
}
