"use client";

import useFetch from "@/app/hooks/useFetch";
import { Product } from "@/app/type";

const ProductPage = ({ params }: { params: { id: number } }) => {
	const {
		data: product,
		loading,
		error,
	} = useFetch<Product>(`https://fakestoreapi.com/products/${params.id}`);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (product) {
		return (
			<div>
				<span>Hello Page {params.id}</span>
				<div>
					<span>{product.title}</span>
					<span>{product.price} €</span>
					<p>{product.description}</p>
					<img src={product.image} alt={product.title} />
				</div>
			</div>
		);
	}
};

export default ProductPage;
