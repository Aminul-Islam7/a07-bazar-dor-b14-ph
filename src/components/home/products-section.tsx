'use client';

import ProductCard from '../product-card';
import { numberInBangla } from '@/lib/utils';
import { useApp } from '@/context/app-context';

export default function ProductsSection() {
	const context = useApp();

	const increasedPriceProducts = context.products.filter(product => product.change.dir === 'up').slice(0, 6);
	const decreasedPriceProducts = context.products.filter(product => product.change.dir === 'down').slice(0, 6);

	return (
		<section className="my-10 space-y-10">
			<div>
				<h2 className="font-bold text-xl mb-4">
					<span className="text-red-600 dark:text-red-400 mr-2">▲</span>
					<span>আজ দাম বেড়েছে</span>
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{increasedPriceProducts.map(product => (
						<ProductCard key={product.id} product={product}></ProductCard>
					))}
				</div>
			</div>
			<div>
				<h2 className="font-bold text-xl mb-4">
					<span className="text-green-600 dark:text-green-400 mr-2">▼</span>
					<span>আজ দাম কমেছে</span>
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{decreasedPriceProducts.map(product => (
						<ProductCard key={product.id} product={product}></ProductCard>
					))}
				</div>
			</div>
			<div>
				<h2 className="font-bold text-xl mb-1">সব পণ্য</h2>
				<p className="text-sm text-muted-foreground mb-3.5">মোট {numberInBangla(context.products.length)} টি পণ্য দেখানো হচ্ছে</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{context.products.map(product => (
						<ProductCard key={product.id} product={product}></ProductCard>
					))}
				</div>
			</div>
		</section>
	);
}
