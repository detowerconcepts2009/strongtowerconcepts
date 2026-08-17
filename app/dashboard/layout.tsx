import { requireRole } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole([
    "CUSTOMER",
    "PROPERTY_OWNER",
    "REALTOR",
    "STAFF",
    "ADMIN",
    "SUPER_ADMIN",
  ]);

  return children;
}