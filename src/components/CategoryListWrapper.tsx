"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Category } from "@/lib/types";
import CategoryList from "@/components/CategoryList";

const CategoryListWrapper = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase.from("categories").select("*");
        if (error) {
          console.error("Erro ao buscar categorias", error);
          setCategories([]);
        } else {
          setCategories(data || []);
        }
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500">Carregando categorias...</div>
    );
  }

  return (
    <div>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
    </div>
  );
};

export default CategoryListWrapper;
