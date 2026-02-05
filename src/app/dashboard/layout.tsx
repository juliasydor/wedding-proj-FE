import { DashboardSidebar } from '@/widgets/dashboard-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      {/* Add top padding on mobile for the fixed header, left margin on desktop for sidebar */}
      <main className="pt-14 md:pt-0 md:ml-64 min-h-screen">{children}</main>
    </div>
  );
}
