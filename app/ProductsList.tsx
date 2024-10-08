"use client";
import Image from "next/image";
import Link from "next/link";
import useFetch from "./hooks/useFetch";
import { Product } from "./type";

const ProductsList = () => {
	const { data, loading, error } = useFetch<Product[]>("https://fakestoreapi.com/products");

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (data) {
		return (
			<div>
				<h1>Products</h1>
				<ul>
					{data.map((product: Product) => (
						<li key={product.id}>
							<div>
								<span>{product.title}</span>
								<span>{product.price} €</span>
								<Image src={product.image} width={500} height={500} alt={product.title} />
								<Link href={`/product/${product.id}`} className="bg-blue-700 p-4">
									Voir le produit
								</Link>
							</div>
						</li>
					))}
				</ul>
			</div>
		);
	}

	return "Nous ne trouvons pas de produits à afficher 😟.";
};

export default ProductsList;
