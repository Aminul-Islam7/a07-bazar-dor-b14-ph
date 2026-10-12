import Hero from '@/components/home/hero';
import ProductsSection from '@/components/home/products-section';

export default function Home() {
	return (
		<main className="container mx-auto px-6 py-10">
			<Hero></Hero>
			<ProductsSection></ProductsSection>
		</main>
	);
}

