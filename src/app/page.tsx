import Header from "@/components/Header";

import { Metadata } from "next";
import CategoryContainer from "@/components/CategoryContainer";

export const metadata: Metadata = {
  title: "Menu Sobremesas - As mais saborosas sobremesas estão aqui!",
  description:
    "Experimente nossas delícias, preparadas com ingredientes frescos e muito carinho.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100">
      <Header />
      <div className="pt-24 flex flex-col items-center justify-center px-4 mb-8 mt-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-pink-600 drop-shadow mb-2 text-center">
          Menu de Sobremesas
        </h1>
        <p className="text-gray-500 text-lg text-center max-w-xl mb-2">
          Experimente nossas delícias, preparadas com ingredientes frescos e
          muito carinho.
        </p>
      </div>
      <CategoryContainer />
    </main>
  );
}
