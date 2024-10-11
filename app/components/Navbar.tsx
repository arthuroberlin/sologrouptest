"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CardContext";

import SoloGroupLogo from "@/public/soloGroup_logo.png";
import CartSVG from "@/public/icons/cart.svg";

const Navbar = () => {
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

	const { cart } = cartContext;

	/* ---//--- Calcule le total d'articles avec la quantité ---//--- */
	const quantity = cart.reduce((total, item) => total + item.quantity, 0);
	const totalQuantity = quantity > 0 ? `(${quantity})` : "";

	return (
		<div className="flex flex-col md:flex-row w-full font-semibold border-b-2 pb-2 md:pb-0">
			<div className="flex justify-center items-center w-full md:justify-between md:w-1/2 p-4">
				<Link href="/">
					<Image
						src={SoloGroupLogo}
						alt="SoloGroup Logo"
						width={140}
						height={140}
						priority
						style={{ objectFit: "contain", objectPosition: "center" }}
					/>
				</Link>
			</div>
			<ul className="flex flex-col md:flex-row w-full md:w-1/2 justify-end items-center space-y-4 md:space-y-0 md:space-x-16 md:px-8">
				<li className="navbar-link-facility hover-underline-animation">
					<Link className="navbar-link-facility" href="/">
						Home
					</Link>
				</li>
				<li className="navbar-link-facility hover-underline-animation">
					<a
						className="navbar-link-facility"
						href="https://sologrouptest.vercel.app/"
						target="_blank"
					>
						Live
					</a>
				</li>
				<li className="navbar-link-facility hover-underline-animation">
					<a
						className="navbar-link-facility"
						href="https://github.com/arthuroberlin/sologrouptest"
						target="_blank"
					>
						Github
					</a>
				</li>
				<li>
					<Link href="/cart" className="flex gap-2 ">
						<Image
							src={CartSVG}
							alt="Icone d'un panier de course"
							width={30}
							height={30}
							style={{
								width: "auto",
								height: "auto",
							}}
						/>
						<span className="text-[var(--primaryImportantColor)]">{totalQuantity}</span>
					</Link>
				</li>
			</ul>
		</div>
	);
};
export default Navbar;
