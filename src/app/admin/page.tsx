"use client";

import MetricCard from "./components/MetricCard";

import {
  faSync,
  faMoneyBill,
  faShoppingCart,
  faUser,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AdminDashboard() {
  const metricCards = [
    {
      id: "vendas-hoje",
      title: "Vendas de Hoje",
      value: `R$ 200,00`,
      icon: <FontAwesomeIcon icon={faMoneyBill} className="text-blue-500" />,
      ariaLabel: "Vendas de Hoje",
    },
    {
      id: "pedidos-hoje",
      title: "Pedidos de Hoje",
      value: `R$ 200,00`,
      icon: (
        <FontAwesomeIcon icon={faShoppingCart} className="text-green-500" />
      ),
      ariaLabel: "Pedidos de Hoje",
    },
    {
      id: "clientes-novos",
      title: "Clientes Novos",
      value: `R$ 200,00`,
      icon: <FontAwesomeIcon icon={faUser} className="text-purple-500" />,
      ariaLabel: "Clientes Novos",
    },
    {
      id: "ticket-medio",
      title: "Ticket Médio",
      value: `R$ 200,00`,
      icon: <FontAwesomeIcon icon={faChartLine} className="text-orange-500" />,
      ariaLabel: "Ticket Médio",
    },
  ];

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <button
          className="px-6 py-2.5 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          aria-label="Atualizar dados do dashboard"
        >
          <FontAwesomeIcon icon={faSync} className="w-4 h-4" />
          <span>Atualizar</span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {metricCards.map((card) => (
          <MetricCard
            key={card.id}
            title={card.title}
            value={card.value}
            icon={card.icon}
            ariaLabel={card.ariaLabel}
          />
        ))}
      </div>
    </div>
  );
}
