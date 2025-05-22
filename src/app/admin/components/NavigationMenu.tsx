"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faClipboard } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getMenuItems, relatoriosSubmenus } from "../config/menuConfig";
import { useState } from "react";

interface NavigationMenuProps {
  userRole: "admin" | "employee" | null;
  collapsed: boolean;
  pathname: string;
}

export function NavigationMenu({
  userRole,
  collapsed,
  pathname,
}: NavigationMenuProps) {
  const [expandedReports, setExpandedReports] = useState(false);
  const menuItems = getMenuItems(userRole);

  const isActiveLink = (href: string) => pathname === href;

  return (
    <nav className="mt-4">
      <ul className="space-y-2 px-3">
        {menuItems.map((item) => {
          // Se for o item de Relatórios
          if (item.label === "Relatórios") {
            return (
              <li key={item.href}>
                <button
                  onClick={() => setExpandedReports(!expandedReports)}
                  className="w-full flex items-center justify-between py-3.5 px-4 hover:bg-gray-800"
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faClipboard}
                      className={`w-5 h-5 text-gray-400 ${
                        collapsed ? "mx-auto" : "mr-3"
                      }`}
                    />
                    {!collapsed && (
                      <span className="text-gray-300">Relatórios</span>
                    )}
                  </div>
                  {!collapsed && (
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className={`w-3 h-3 text-gray-400 ${
                        expandedReports ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {expandedReports && !collapsed && (
                  <ul className="pl-2 py-1 space-y-1">
                    {relatoriosSubmenus.map((subitem) => (
                      <li key={subitem.href}>
                        <Link
                          href={subitem.href}
                          className={`flex items-center py-2.5 px-4 rounded-md ${
                            isActiveLink(subitem.href)
                              ? "bg-blue-600 text-white"
                              : "text-gray-300 hover:bg-gray-800"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={subitem.icon}
                            className={`w-4 h-4 ${
                              isActiveLink(subitem.href)
                                ? "text-white"
                                : "text-gray-400"
                            }`}
                          />
                          <span className="ml-3 text-sm">{subitem.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          }

          // Para outros itens do menu
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center py-3 px-4 rounded-lg ${
                  isActiveLink(item.href)
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`w-5 h-5 ${collapsed ? "mx-auto" : "mr-3"}`}
                />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
