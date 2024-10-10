"use client";
import React, { useEffect } from "react";
import { useCart } from "@/context/CardContext";

const CartPage = () => {
	const cartContext = useCart();
	if (!cartContext) {
		return <div>Erreur: Impossible de charger le panier !</div>;
	}

	const { cart, updateQuantity, removeFromCart } = cartContext;

	useEffect(() => {
		console.log("Cart state:", cart);
	}, [cart]);

	return (
		<div>
			<h1>Panier</h1>
			{cart.length === 0 ? (
				<p>Votre panier est vide</p>
			) : (
				cart.map((item) => (
					<div key={item.id}>
						<span>{item.title}</span>
						<span>{item.price} €</span>
						<input
							type="number"
							value={item.quantity}
							onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
						/>
						<button onClick={() => removeFromCart(item.id)}>Supprimer</button>
					</div>
				))
			)}
		</div>
	);
};

export default CartPage;
