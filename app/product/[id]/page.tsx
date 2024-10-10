import useFetch from "@/hooks/useFetch";
import { Product } from "@/type";
import { useCart } from "@/context/CardContext";
import Link from "next/link";

const ProductPage = ({ params }: { params: { id: number } }) => {
	const {
		data: product,
		loading,
		error,
	} = useFetch<Product>(`https://fakestoreapi.com/products/${params.id}`);

	const cartContext = useCart();
	if (!cartContext) {
		return;
	}
	const { cart, addToCart } = cartContext;

	if (cart) {
		console.log(cart);
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (product) {
		return (
			<div>
				<Link href="/cart">Voir le panier</Link>
				<span>Hello Page {params.id}</span>
				<div>
					<span>{product.title}</span>
					<span>{product.price} €</span>
					<p>{product.description}</p>
					<img src={product.image} alt={product.title} />
					{/* <button onClick={() => addToCart(product)}>Ajouter au panier</button> */}
				</div>
			</div>
		);
	}

	return null;
};

export default ProductPage;
