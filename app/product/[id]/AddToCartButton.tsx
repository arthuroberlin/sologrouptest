"use client";

import { useRef } from "react";
import { useCart } from "@/context/CardContext";
import { Product } from "@/type";

interface AddToCartButtonProps {
	product: Product;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
	const cartContext = useCart();
	const plusIconRef = useRef<HTMLSpanElement>(null);

	/* ---//--- Context et gestion d'érreur du context  ---//--- */
	if (!cartContext) {
		return;
	}
	const { addToCart } = cartContext;

	/* ---//--- Animation de l'id plus-icon ("+")  ---//--- */
	const handleMouseEnter = () => {
		if (plusIconRef.current) {
			plusIconRef.current.classList.add("animate-spin");
		}
	};

	const handleMouseLeave = () => {
		if (plusIconRef.current) {
			plusIconRef.current.classList.remove("animate-spin");
		}
	};

	return (
		<button
			className="flex gap-4 primary-button"
			onClick={() => addToCart(product)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			Ajouter au panier
			<span id="plus-icon" ref={plusIconRef} className="text-xl">
				+
			</span>
		</button>
	);
};

export default AddToCartButton;
