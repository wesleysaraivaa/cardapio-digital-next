import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu Sobremesas - As mais saborosas sobremesas estão aqui!",
  description:
    "Experimente nossas delícias, preparadas com ingredientes frescos e muito carinho.",
};

export default function Home() {
  return (
    <main className="min-h-screen ng-gradient-to-br from-pink-100 via-white to-purple-100">
      <div className=" flex flex-col items-center justify-center px-4 mb-8 mt-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-pink-600 drop-shadow mb-2 text-center">
          Menu de Sobremesas
        </h1>
        <p className="text-gray-500 text-lg text-center max-w-xl mb-2">
          Experimente nossas delícias, preparadas com ingredientes frescos e
          muito carinho.
        </p>
      </div>
    </main>
  );
}
