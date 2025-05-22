"use client";

import { NavigationMenu } from "./NavigationMenu";

interface SidebarProps {
  userRole: "admin" | "employee" | null;
  collapsed: boolean;
  pathname: string;
  onToggleCollapse: () => void;
}

export function Sidebar({
  userRole,
  collapsed,
  pathname,
  onToggleCollapse,
}: SidebarProps) {
  return (
    <aside
      className={`relative flex flex-col h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl" ${
        collapsed ? "w-64" : "w-64"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none" />

      <div className="relative flex flex-col h-full z-10">
        {/* Botão de toggle */}
        <button
          onClick={onToggleCollapse}
          className="p-4 text-gray-400 hover:text-white"
        >
          {collapsed ? "→" : "←"}
        </button>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <NavigationMenu
            userRole={userRole}
            collapsed={collapsed}
            pathname={pathname}
          />
        </div>

        <div>
          <h1> Logout </h1>
        </div>
      </div>
    </aside>
  );
}
