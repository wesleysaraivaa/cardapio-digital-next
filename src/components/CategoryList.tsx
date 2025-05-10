"use client";

import React from "react";
import { Category } from "@/lib/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { IconName } from "@fortawesome/fontawesome-svg-core";

// Adicionar todos os ícones solid à biblioteca
library.add(fas);

interface CategoryListProps {
  categories?: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const CategoryList = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
}: CategoryListProps) => {
  // Função para converter o nome do ícone para o formato correto
  const getIconName = (iconName: string): IconName | undefined => {
    try {
      // Remover o prefixo "fa-" se existir
      const cleanName = iconName.replace(/^fa-/, '');
      return cleanName as IconName;
    } catch (error) {
      console.error("Erro ao converter nome do ícone:", error);
      return undefined;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
          selectedCategory === null
            ? "bg-[#FF6B6B] text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Todos
      </button>

      {categories.map((category) => {
        const iconName = getIconName(category.icon);
        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2
              ${
                selectedCategory === category.id
                  ? "bg-[#FF6B6B] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {iconName && (
              <FontAwesomeIcon 
                icon={["fas", iconName]} 
                className="w-4 h-4" 
              />
            )}
            {category.name}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryList;
