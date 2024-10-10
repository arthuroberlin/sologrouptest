import type { Metadata, ResolvingMetadata } from "next";
import { Product } from "@/type";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

type Props = {
	params: { id: string };
};

const fetchProduct = async (id: string): Promise<Product> => {
	const res = await fetch(`https://fakestoreapi.com/products/${id}`);
	if (!res.ok) {
		throw new Error("Failed to fetch product.");
	}
	return res.json();
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const id = params.id;
	const product = await fetchProduct(id);
	return {
		title: product.title,
	};
}

const ProductPage = async ({ params }: Props) => {
	const product = await fetchProduct(params.id);

	return (
		<div>
			<span>Hello Page {params.id}</span>
			<Link href="/cart">Voir le panier</Link>
			<div>
				<span>{product.title}</span>
				<span>{product.price} €</span>
				<p>{product.description}</p>
				<img src={product.image} alt={product.title} />
				<AddToCartButton product={product} />
			</div>
		</div>
	);
};

export default ProductPage;
