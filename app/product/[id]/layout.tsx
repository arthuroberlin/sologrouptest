import React from "react";
import type { Product } from "@/type";

/* ---//--- Fetch des données DU produit pour les meta-datas---//--- */
const fetchProduct = async (id: string): Promise<Product> => {
	const res = await fetch(`https://fakestoreapi.com/products/${id}`);
	if (!res.ok) {
		throw new Error("Impossible de charger le produit.");
	}

	return res.json();
};

/* ---//--- Metadata ---//--- */
export const generateMetadata = async ({ params }: { params: { id: string } }) => {
	try {
		const response = await fetchProduct(params.id);
		const product = await response;

		return {
			title: product.title,
			description: product.description,
		};
	} catch (err) {
		return {
			title: "Produit introuvable.",
			description: "Impossible de charger la description du produit.",
		};
	}
};

const Layout = async ({ children }: { children: React.ReactNode; params: { id: string } }) => {
	return (
		<>
			<div>{children}</div>
		</>
	);
};

export default Layout;
