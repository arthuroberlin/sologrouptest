import { useState, useEffect } from "react";

interface FetchState<T> {
	data: T | null;
	loading: boolean;
	error: Error | null;
}

const useFetch = <T>(url: string): FetchState<T> => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(url);

				if (!res.ok) {
					throw new Error("Failed to fetch data.");
				}

				const result: T = await res.json();

				setData(result);
			} catch (err) {
				setError(err as Error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [url]);

	return { data, loading, error };
};

export default useFetch;
