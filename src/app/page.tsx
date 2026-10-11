import Hero from '@/components/home/hero';
import ProductsSection from '@/components/home/products-section';

export default function Home() {
	return (
		<main className="container mx-auto px-4">
			<Hero></Hero>
			<ProductsSection></ProductsSection>
		</main>
	);
}

