import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faShoppingCart,
  faBox,
  faUsers,
  faUserShield,
  faClipboard,
  faCalendar,
  faCreditCard,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

export interface MenuItem {
  label: string;
  icon: IconDefinition;
  href: string;
  submenu?: boolean;
  parentId?: string;
}

// Menu base para todos os usuários
export const baseMenuItems: MenuItem[] = [
  { label: "Dashboard", icon: faHome, href: "/admin" },
  { label: "Pedidos", icon: faShoppingCart, href: "/admin/pedidos" },
  { label: "Produtos", icon: faBox, href: "/admin/produtos" },
];

// Itens adicionais para administradores
export const adminMenuItems: MenuItem[] = [
  { label: "Clientes", icon: faUsers, href: "/admin/clientes" },
  { label: "Usuários", icon: faUserShield, href: "/admin/usuarios" },
  { label: "Relatórios", icon: faClipboard, href: "/admin/relatorios" },
];

// Submenus de relatórios
export const relatoriosSubmenus: MenuItem[] = [
  {
    label: "Por Período",
    icon: faCalendar,
    href: "/admin/relatorios/periodo",
    submenu: true,
    parentId: "relatorios",
  },
  {
    label: "Por Pagamento",
    icon: faCreditCard,
    href: "/admin/relatorios/pagamento",
    submenu: true,
    parentId: "relatorios",
  },
  {
    label: "De Produtos",
    icon: faBox,
    href: "/admin/relatorios/produtos",
    submenu: true,
    parentId: "relatorios",
  },
  {
    label: "De Clientes",
    icon: faUsers,
    href: "/admin/relatorios/clientes",
    submenu: true,
    parentId: "relatorios",
  },
  {
    label: "De Desempenho",
    icon: faChartLine,
    href: "/admin/relatorios/desempenho",
    submenu: true,
    parentId: "relatorios",
  },
];

export const getMenuItems = (
  userRole: "admin" | "employee" | null
): MenuItem[] => {
  return userRole === "admin"
    ? [...baseMenuItems, ...adminMenuItems]
    : baseMenuItems;
};
