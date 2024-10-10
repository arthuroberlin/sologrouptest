"use client";

import React, { createContext, useContext, useState } from "react";
import { Product } from "@/type";

interface CartItem extends Product {
	quantity: number;
}

interface CartProviderProps {
	children: React.ReactNode;
}

interface CartContextType {
	cart: CartItem[];
	addToCart: (product: Product) => void;
	updateQuantity: (id: number, quantity: number) => void;
	removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
	const [cart, setCart] = useState<CartItem[]>([]);

	const addToCart = (product: Product) => {
		setCart((prevCart) => {
			const existingProduct = prevCart.find((item) => item.id === product.id);
			if (existingProduct) {
				return prevCart.map((item) =>
					item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
				);
			}
			return [...prevCart, { ...product, quantity: 1 }];
		});
	};

	const updateQuantity = (id: number, quantity: number) => {
		setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)));
	};

	const removeFromCart = (id: number) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== id));
	};

	return (
		<CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	return context;
};
