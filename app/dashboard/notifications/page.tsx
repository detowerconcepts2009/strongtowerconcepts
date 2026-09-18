import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardNotifications from "@/components/dashboard/DashboardNotifications";

export default function DashboardNotificationsPage() {
  return (
    <DashboardLayout title="Notifications">
      <div className="mx-auto max-w-4xl">
        <DashboardNotifications />
      </div>
    </DashboardLayout>
  );
}