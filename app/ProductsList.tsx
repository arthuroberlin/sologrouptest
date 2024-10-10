import Image from "next/image";
import Link from "next/link";
import { Product } from "../type";

interface ProductsListProps {
	products: Product[];
}

const ProductsList = ({ products }: ProductsListProps) => {
	return (
		<div>
			<h1>Products</h1>
			<ul>
				{products.map((product) => (
					<li key={product.id}>
						<div>
							<span>{product.title}</span>
							<span>{product.price} €</span>
							<Image src={product.image} width={500} height={500} alt={product.title} />
							<Link href={`/product/${product.id}`} className="bg-blue-700 p-4">
								Voir le produit
							</Link>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProductsList;
