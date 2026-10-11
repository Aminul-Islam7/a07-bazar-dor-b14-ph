import { Category, Product } from '@/types/commodity';

import CategoryHeading from './category-heading';
import ProductCard from '@/components/product-card';
import { numberInBangla } from '@/lib/utils';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	const categoryData = await fetch(`https://api.api-store.workers.dev/api/bazardor/categories/${slug}`);
	const category: Category = await categoryData.json();

	const productsData = await fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`);
	const products: Product[] = await productsData.json();

	return (
		<div className="mx-auto container px-6">
			<section className="flex bg-card rounded-xl border w-ful items-center gap-2 p-4 mb-8">
				<span className="text-5xl">{category.icon}</span>
				<div>
					<h1 className="text-2xl font-bold">{category.nameBn}</h1>
					<p className="text-sm text-muted-foreground">{numberInBangla(products.length)} টি পণ্যের আজকের দাম ও পরিবর্তন</p>
				</div>
			</section>
			<section>
				<p className="text-sm text-muted-foreground mb-4">মোট {numberInBangla(products.length)} টি পণ্য দেখানো হচ্ছে</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{products.map(product => (
						<ProductCard key={product.id} product={product}></ProductCard>
					))}
				</div>
			</section>
		</div>
	);
}
