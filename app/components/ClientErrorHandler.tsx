"use client";

import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

interface ClientErrorHandlerProps {
	error: string;
	children: React.ReactNode;
}

/* ---//--- Utilisation de la librairie react-hot-toast ---//--- */

const ClientErrorHandler = ({ error, children }: ClientErrorHandlerProps) => {
	useEffect(() => {
		if (error) {
			toast.error(error);
		}
	}, [error]);

	return (
		<>
			<Toaster toastOptions={{ duration: 10000 }} />
			{children}
		</>
	);
};

export default ClientErrorHandler;
