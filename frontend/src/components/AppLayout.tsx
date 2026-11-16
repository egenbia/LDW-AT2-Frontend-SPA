import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const linkClass = ({ isActive }: { isActive: boolean }): string =>
  cn(
    "rounded-sm px-3 py-2 text-base font-medium transition-opacity duration-150 ease-in",
    isActive
      ? "bg-white font-bold text-primary"
      : "text-white hover:bg-white/10 hover:opacity-70"
  );

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-black text-white shadow-md">
  <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
    <span className="text-lg font-bold"> Funko Pop Manager</span>
          <nav className="flex gap-4">
            <NavLink to="/" end className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/sobre" className={linkClass}>
              Sobre
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl p-4">
        <Outlet />
      </main>
    </div>
  );
}