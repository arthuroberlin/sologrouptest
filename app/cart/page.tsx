"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CardContext";
import Link from "next/link";

const CartPage = () => {
	/* ---//--- Context et gestion d'érreur du context ---//--- */
	const cartContext = useCart();
	if (!cartContext) {
		return (
			<div className="flex flex-col justify-center items-center h-96 gap-6">
				Impossible de charger le panier.
				<Link href="/" className="primary-button">
					Retourner à la page d'accueil
				</Link>
			</div>
		);
	}

	const { cart, updateQuantity, removeFromCart } = cartContext;

	/* ---//--- Calcule le total d'articles ---//--- */
	const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6 mt-8">Panier</h1>
			{/* ---//--- Gestion du panier vide ---//--- */}
			{cart.length === 0 ? (
				<div className="flex flex-col justify-center items-center h-96 gap-6">
					Votre panier est vide 😟
					<Link href="/" className="primary-button">
						Retourner à la page d'accueil
					</Link>
				</div>
			) : (
				<div className="flex flex-col md:flex-row gap-16">
					{/* ---//--- Panier ( Partie gauche ) ---//--- */}
					<div className="flex-1">
						{cart.map((item) => (
							<div
								key={item.id}
								className="flex items-center justify-between border-b py-4 md:mb-0 mb-14 "
							>
								<div className="flex items-center gap-6 relative h-[250px] md:h-[150px] pb-8">
									<Image
										src={item.image}
										alt={item.title}
										width={150}
										height={150}
										style={{
											objectFit: "cover",
											objectPosition: "center",
											width: "auto",
											height: "auto",
											maxWidth: "100%",
											maxHeight: "100%",
										}}
									/>
									<div className="pr-6">
										<h2 className="text-xl font-semibold">{item.title}</h2>
										<p className="text-gray-600 pt-2">{item.price} €</p>
									</div>
								</div>
								<div className="flex items-center gap-4">
									<input
										type="number"
										value={item.quantity}
										onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
										className="w-16 border rounded p-1"
									/>
									<button
										onClick={() => removeFromCart(item.id)}
										className="text-red-500 hover:text-red-700 hover:underline"
									>
										Supprimer
									</button>
								</div>
							</div>
						))}
					</div>
					{/* ---//--- Résumé du panier ( Partie droite ) ---//--- */}
					<div className="flex flex-col justify-between w-full md:w-1/3 border p-4 rounded-lg shadow-lg">
						<div className="flex flex-col gap-3">
							<h2 className="text-2xl font-bold">Résumé du panier</h2>
							<div className="flex justify-between">
								<span>Total des articles:</span>
								<span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
							</div>
							<div className="flex justify-between">
								<span>Total:</span>
								{/* ---//--- Fixe le prix ---//--- */}
								<span className="font-bold">{totalAmount.toFixed(2)} €</span>
							</div>
						</div>
						{/* ---//--- Button sans link ou paiement pour l'exercice ---//--- */}
						<button className="w-full text-white p-2 rounded bg-[var(--primaryImportantColor)] hover:bg-[var(--secondaryImportantColor)] hover:scale-105 transition-transform">
							Passer à la caisse
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartPage;
