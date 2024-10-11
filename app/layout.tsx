import { ReactNode, Suspense } from "react";
import { CartProvider } from "@/context/CardContext";
import { Poppins } from "next/font/google";
import Loading from "./loading";
import Navbar from "./components/Navbar";
import "./globals.css";

const poppins = Poppins({
	weight: ["500", "600", "700", "800"],
	subsets: ["latin"],
});

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html lang="fr">
			<body className={`${poppins.className} w-full`}>
				{/* ---//--- 
				Le provider englobe également le header pour permettre l'affichage en temps réel du panier et de son contenu
				 ---//--- */}
				<CartProvider>
					<header>
						<Navbar />
					</header>
					{/* ---//--- Loading global de l'application via le composant <Loading /> ---//--- */}
					<Suspense fallback={<Loading />}>{children}</Suspense>
				</CartProvider>
			</body>
		</html>
	);
};

export default RootLayout;
