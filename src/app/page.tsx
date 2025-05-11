import { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Menu Sobremesas - As mais saborosas sobremesas estão aqui!",
  description:
    "Experimente nossas delícias, preparadas com ingredientes frescos e muito carinho.",
};

export default function Home() {
  return <HomePage />;
}
