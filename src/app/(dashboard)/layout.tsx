import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-foreground">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto focus:outline-none bg-zinc-950/50 p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
