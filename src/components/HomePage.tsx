"use client";

import { useState } from "react";
import Header from "@/components/Header";
import CategoryContainer from "@/components/CategoryContainer";
import ProductContainer from "@/components/ProductContainer";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 pt-24 md:pt-0">
      <Header />
      <div className="pt-24 flex flex-col items-center justify-center px-4 mb-8 mt-4 ">
        <h1 className="text-3xl md:text-4xl font-extrabold text-pink-600 drop-shadow mb-2 text-center">
          Menu de Sobremesas
        </h1>
        <p className="text-gray-500 text-lg text-center max-w-xl mb-2">
          Experimente nossas delícias, preparadas com ingredientes frescos e
          muito carinho.
        </p>
      </div>
      <CategoryContainer
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <ProductContainer selectedCategory={selectedCategory} />
    </main>
  );
}
