import { DashboardSidebar } from '@/widgets/dashboard-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className="ml-64 min-h-screen">{children}</main>
    </div>
  );
}
