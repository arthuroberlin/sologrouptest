// app/layout.tsx
import { ReactNode } from "react";
import { CartProvider } from "@/context/CardContext";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="fr">
			<body>
				<CartProvider>{children}</CartProvider>
			</body>
		</html>
	);
}
