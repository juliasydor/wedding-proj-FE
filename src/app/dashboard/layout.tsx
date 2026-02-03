import { Navbar } from '@/widgets/navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="dashboard" />
      <main className="pt-16">{children}</main>
    </div>
  );
}
