import Image from "next/image";
import { Product } from "@/type";
import ProductsList from "./ProductsList";
import CartGif from "@/public/cart.gif";
import ClientErrorHandler from "./components/ClientErrorHandler";

/* ---//--- 
- Fetch des données DU produit
- Gestion d'erreurs de fetch avec le composant ClientErrorHandler
---//--- */

const fetchProducts = async (): Promise<Product[]> => {
	const res = await fetch("https://fakestoreapi.com/products");
	if (!res.ok) {
		throw new Error("Impossible de charger les produits.");
	}
	return res.json();
};

const HomePage = async () => {
	let products: Product[] = [];
	let error: string | null = null;

	/* ---//--- Gestion CLIENT de l'érreur  ---//--- */
	try {
		products = await fetchProducts();
	} catch (err) {
		error = (err as Error).message;
	}

	/* ---//--- Le handler permet de gérer les erreurs côtés clients sans bloquer le composant  ---//--- */
	return (
		<ClientErrorHandler error={error ?? ""}>
			{/* ---//--- Textes ( Partie gauche ) ---//--- */}
			<div className="flex flex-col justify-center items-center">
				<div className="flex flex-col md:flex-row w-full items-center mt-8 px-4 md:px-10 z-[1]">
					<div className="w-full md:w-1/3 mb-8 md:mb-0">
						<h1 className="flex flex-col text-4xl md:text-6xl font-bold leading-tight md:leading-[80px]">
							Découvrez nos nouveaux produits exclusifs <br />
							<span className="text-[var(--primaryImportantColor)] underline">maintenant</span>
						</h1>
					</div>
					{/* ---//--- Gif ( Partie droite ) ---//--- */}
					<div className="flex justify-center md:justify-end w-full md:w-2/3 z-[-1]">
						<Image
							src={CartGif}
							alt="Gif montrant un panier de course avec un homme qui fait des accrobaties avec"
							width={600}
							height={600}
							quality={100}
							className="w-full h-auto max-w-md md:max-w-full"
						/>
					</div>
				</div>
				{/* ---//--- Malgré le toaster, j'affiche un message constant à l'utilisateur ---//--- */}
				{error ? (
					<div className="flex items-center h-24 text-red-600 mt-12">{error} 😟</div>
				) : (
					<ProductsList products={products} />
				)}
			</div>
		</ClientErrorHandler>
	);
};

export default HomePage;
