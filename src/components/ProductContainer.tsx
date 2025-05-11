"use client";

import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import ProductList from "@/components/PoductList";
import { Product } from "@/types/product";

interface ProductContainerProps {
  selectedCategory: string | null;
}

const ProductContainer = ({ selectedCategory }: ProductContainerProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("name");

      if (selectedCategory) {
        query = query.eq("category_id", selectedCategory);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setProducts(data || []);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setError("Não foi possível carregar os produtos");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="text-gray-500">Carregando produtos...</div>
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

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="text-gray-500">
          Nenhum produto encontrado nesta categoria.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <ProductList products={products} />
    </div>
  );
};

export default ProductContainer;
