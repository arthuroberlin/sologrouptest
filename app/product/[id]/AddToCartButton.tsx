"use client";
import { useCart } from "@/context/CardContext";
import { Product } from "@/type";

interface AddToCartButtonProps {
	product: Product;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
	const cartContext = useCart();
	if (!cartContext) {
		return;
	}
	const { addToCart } = cartContext;
	return <button onClick={() => addToCart(product)}>Ajouter au panier</button>;
};

export default AddToCartButton;
