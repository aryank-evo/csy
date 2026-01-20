import AdminRoute from "@/components/common/AdminRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminRoute>{children}</AdminRoute>;
}
