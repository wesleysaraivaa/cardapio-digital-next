"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { usePathname } from "next/navigation";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const userRole = "admin";

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        userRole={userRole}
        collapsed={collapsed}
        pathname={pathname}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      {/* Área principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
