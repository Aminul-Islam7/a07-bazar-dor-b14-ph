'use client';

import { Product } from '@/types/commodity';
import ProductCard from '@/components/product-card';
import SortDropdown from './sort-dropdown';
import { SortOptionValue } from '@/types/sort';
import { numberInBangla } from '@/lib/utils';
import { useState } from 'react';

export default function ProductsListing({ products }: { products: Product[] }) {
	const [sortDirection, setSortDirection] = useState<SortOptionValue>('default');

	const onSortChange = (val: SortOptionValue) => {
		setSortDirection(val);
	};

	let sortedProducts = products;

	switch (sortDirection) {
		case 'default':
			sortedProducts = products;
			break;
		case 'price-asc':
			sortedProducts = products.toSorted((a, b) => a.today - b.today);
			break;
		case 'price-dsc':
			sortedProducts = products.toSorted((a, b) => b.today - a.today);
			break;
	}

	return (
		<section>
			<div className="flex justify-between gap-2 items-center mb-4">
				<p className="text-sm text-muted-foreground">মোট {numberInBangla(products.length)} টি পণ্য দেখানো হচ্ছে</p>
				<div>
					<span className="text-sm text-muted-foreground mr-2">সাজান</span>
					<SortDropdown sortDirection={sortDirection} onSortChange={onSortChange}></SortDropdown>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{sortedProducts.map(product => (
					<ProductCard key={product.id} product={product}></ProductCard>
				))}
			</div>
		</section>
	);
}
