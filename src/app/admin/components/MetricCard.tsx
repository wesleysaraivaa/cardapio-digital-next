import React from "react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  ariaLabel?: string;
}

const MetricCard = ({ title, value, icon, ariaLabel }: MetricCardProps) => {
  return (
    <div
      className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-5 sm:p-6 border border-gray-100"
      aria-label={ariaLabel || title}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {value}
          </p>
        </div>
        <div className="text-2xl sm:text-2xl p-1 rounded-lg bg-gray-50 shadow-inner">
          {icon}
        </div>
      </div>
    </div>
  );
};

MetricCard.displayName = "MetricCard";
export default MetricCard;
