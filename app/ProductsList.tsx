import Image from "next/image";
import Link from "next/link";
import { Product } from "../type";
import HeartSVG from "@/public/icons/heart.svg";
import Arrow from "@/public/icons/arrow.svg";

interface ProductsListProps {
	products: Product[];
}

const ProductsList = ({ products }: ProductsListProps) => {
	return (
		<div className="mt-44 mb-12">
			{/* ---//--- Bannière ---//--- */}
			<div className="py-8 bg-gray-300">
				<div className="flex items-center justify-center text-4xl font-bold gap-4">
					<h1>Nos produits</h1>
					<Image src={HeartSVG} width={50} height={50} alt="Icon d'un coeur" />
				</div>
				<p className="pt-8 text-center text-2xl font-bold">
					Nous avons <span className="text-[var(--primaryImportantColor)]">{products.length} </span>
					produits mais ce sont les meilleurs.
				</p>
			</div>
			{/* ---//--- Indication ---//--- */}
			<div className="flex items-center justify-center mt-20 mb-8 text-gray-600 text-center">
				Passe ta souris sur les titres de nos articles pour voir leur nom complet ! 😎
			</div>
			{/* ---//--- Liste des produits ---//--- */}
			<ul className="flex flex-wrap justify-center gap-6 p-4">
				{products.map((product) => (
					<li
						key={product.id}
						className="flex flex-col justify-between items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-[650px] border rounded-xl"
					>
						{/* ---//--- Image du produit ---//--- */}
						<div className="w-full h-2/3 flex justify-center items-center p-4">
							<div className="w-full h-full relative flex justify-center items-center">
								<Image
									src={product.image}
									width={200}
									height={200}
									alt={product.title}
									className="rounded-3xl"
									style={{
										objectFit: "cover",
										objectPosition: "center",
										width: "auto",
										height: "auto",
										maxWidth: "100%",
										maxHeight: "100%",
									}}
								/>
							</div>
						</div>
						{/* ---//--- Informations du produit et CTA ---//--- */}
						<div className="w-full h-1/3 bg-gray-50 py-4 px-5 rounded-b-xl flex flex-col justify-center gap-3">
							{/* ---//--- Tooltip montrant le titre en entier au hover ---//--- */}
							<span className="text-left text-lg font-bold flex-grow relative group">
								{product.title.length > 55 ? `${product.title.substring(0, 55)}...` : product.title}
								<span className="absolute left-0 bottom-full mb-2 w-max max-w-xs p-2 bg-black text-white text-sm rounded hidden group-hover:block">
									{product.title}
								</span>
							</span>
							{/* ---//--- Prix du produit ---//--- */}
							<span className="text-lg">{product.price} €</span>
							{/* ---//--- CTA du produit ---//--- */}
							<Link
								href={`/product/${product.id}`}
								className="flex justify-between w-full primary-button"
							>
								Voir le produit
								<Image
									src={Arrow}
									alt="Icone de flèche pointant à droite"
									width={25}
									height={25}
									style={{
										width: "auto",
										height: "auto",
									}}
								/>
							</Link>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProductsList;
