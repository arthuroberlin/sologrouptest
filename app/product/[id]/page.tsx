import React from "react";
import Image from "next/image";
import { Product } from "@/type";
import AddToCartButton from "./AddToCartButton";
import ClientErrorHandler from "@/app/components/ClientErrorHandler";
import Layout from "./layout";

/* ---//--- 
- Fetch des données DU produit
- Gestion d'erreurs de fetch avec le composant ClientErrorHandler
---//--- */

const fetchProduct = async (id: string): Promise<Product> => {
	const res = await fetch(`https://fakestoreapi.com/products/${id}`);

	if (res.status === 404) {
		throw new Error("Produit introuvable.");
	}
	if (!res.ok) {
		throw new Error("Impossible de charger le produit.");
	}

	try {
		return JSON.parse(await res.text());
	} catch (error) {
		throw new Error(
			"L'article n'existe pas ou alors nous avons un problème du côté de nos serveurs."
		);
	}
};

const ProductPage = async ({ params }: { params: { id: string } }) => {
	let product: Product | null = null;
	let error: string | null = null;

	/* ---//--- Gestion CLIENT de l'érreur  ---//--- */
	try {
		product = await fetchProduct(params.id);
	} catch (err) {
		error = (err as Error).message;
	}

	/* ---//--- Le handler permet de gérer les erreurs côtés clients sans bloquer le composant  ---//--- */
	return (
		<Layout params={params}>
			<ClientErrorHandler error={error ?? ""}>
				<div className="container mx-auto pt-12 px-6">
					{product ? (
						<div className="flex items-center flex-col gap-9 md:gap-0 md:flex-row">
							{/* ---//--- Image ( Partie gauche ) ---//--- */}
							<div className="md:w-1/2 p-4">
								<Image
									src={product.image}
									alt={product.title}
									width={400}
									height={400}
									priority
									quality={100}
									className="w-full h-auto max-w-sm object-cover mx-auto"
								/>
							</div>
							{/* ---//--- Informations ( Partie droite ) ---//--- */}
							<div className="flex flex-col items-start gap-8 md:w-1/2 p-4">
								<h1 className="text-3xl font-bold">{product.title}</h1>
								<span className="text-2xl font-bold text-[var(--primaryImportantColor)]">
									{product.price} €
								</span>
								{/* ---//--- Plusieurs articles renvoyés par l'API on des descriptions sans majuscule. ---//--- */}
								<p className="text-gray-700">
									{product.description
										? product.description.charAt(0).toUpperCase() + product.description.slice(1)
										: "Aucune description disponible pour cet article. 🤔"}
								</p>
								<AddToCartButton product={product} />
							</div>
						</div>
					) : (
						<div className="flex items-center w-full h-24 justify-center text-red-600 mt-12">
							{/* ---//--- Malgré le toaster, j'affiche un message constant à l'utilisateur ---//--- */}
							{error} 😟
						</div>
					)}
				</div>
			</ClientErrorHandler>
		</Layout>
	);
};

export default ProductPage;
