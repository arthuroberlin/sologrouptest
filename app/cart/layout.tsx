import React, { ReactNode } from "react";
import type { Metadata } from "next";

interface CartLayoutProps {
	children: ReactNode;
}

/* ---//--- Metadata ---//--- */
export const metadata: Metadata = {
	title: "SoloGroup - Cart",
	description: "Page panier de l'application test de Arthur Oberlin--Martins pour SoloGroup.",
};

/* ---//--- Layout ---//--- */

const CartLayout: React.FC<CartLayoutProps> = ({ children }) => {
	return <>{children}</>;
};

export default CartLayout;
