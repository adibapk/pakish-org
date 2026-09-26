import { AdminLeadsDashboard } from "@/components/admin/admin-leads-dashboard";
import { requireAdminSession } from "@/lib/admin/auth";
import { listAdmissionLeads } from "@/lib/admission/store";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: { absolute: "Admission Leads | Pakish Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLeadsPage() {
  if (!(await requireAdminSession())) {
    redirect("/admin/login");
  }

  const leads = await listAdmissionLeads();
  return <AdminLeadsDashboard initialLeads={leads} />;
}
