import { ReactNode, Suspense } from "react";
import { CartProvider } from "@/context/CardContext";
import "./globals.css";
import Loading from "./loading";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="fr">
			<body className="w-full">
				<header className="flex">
					<h1>SoloGroup Shop</h1>
				</header>
				<CartProvider>
					<Suspense fallback={<Loading />}>{children}</Suspense>
				</CartProvider>
			</body>
		</html>
	);
}
