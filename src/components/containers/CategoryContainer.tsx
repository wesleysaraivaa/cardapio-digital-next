"use client";

import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Category } from "@/types/category";
import CategoryList from "@/components/ui/CategoryList";

interface CategoryContainerProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const CategoryContainer = ({
  selectedCategory,
  onSelectCategory,
}: CategoryContainerProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("sort_order");

      if (error) {
        throw error;
      }

      setCategories(data || []);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      setError("Não foi possível carregar as categorias");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="text-gray-500">Carregando categorias...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
    </div>
  );
};

export default CategoryContainer;
