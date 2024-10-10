import type { Metadata } from "next";
import { Product } from "@/type";
import ProductsList from "./ProductsList";

export const getMetadata: () => Metadata = () => ({
	title: "SoloGroup - Accueil",
	description: "Page d'accueil de l'application test de Arthur Oberlin--Martins pour SoloGroup.",
});

const fetchProducts = async (): Promise<Product[]> => {
	const res = await fetch("https://fakestoreapi.com/products");
	if (!res.ok) {
		throw new Error("Impossible de charger les produits.");
	}

	return res.json();
};

export default async function HomePage() {
	const products = await fetchProducts();

	return (
		<div>
			<ProductsList products={products} />
		</div>
	);
}
