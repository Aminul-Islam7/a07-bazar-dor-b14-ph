import { Category, Product } from '@/types/commodity';

import ProductsListing from './products-listing';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { numberInBangla } from '@/lib/utils';

export async function generateStaticParams() {
	const res = await fetch('https://api.api-store.workers.dev/api/bazardor/categories');
	const categories: Category[] = await res.json();

	return categories.map(cat => ({
		slug: cat.slug,
	}));
}

async function CategoryContent({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
	// await delay(3000);

	const [categoryRes, productsRes] = await Promise.all([
		fetch(`https://api.api-store.workers.dev/api/bazardor/categories/${slug}`, {
			next: { revalidate: 3600 },
		}),
		fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`, {
			next: { revalidate: 3600 },
		}),
	]);

	const category: Category = await categoryRes.json();
	const products: Product[] = await productsRes.json();

	return (
		<>
			<section className="flex bg-card rounded-xl border w-full items-center gap-2 p-4 mb-8">
				<span className="text-5xl">{category.icon}</span>
				<div>
					<h1 className="text-2xl font-bold">{category.nameBn}</h1>
					<p className="text-sm text-muted-foreground">{numberInBangla(products.length)} টি পণ্যের আজকের দাম ও পরিবর্তন</p>
				</div>
			</section>
			<ProductsListing products={products} />
		</>
	);
}

function CategorySkeleton() {
	return (
		<div className="space-y-8 animate-pulse">
			{/* Category Header Banner */}
			<section className="flex bg-card rounded-xl border w-full items-center gap-3 p-4">
				<Skeleton className="h-12 w-12 rounded-lg" />
				<div className="space-y-2">
					<Skeleton className="h-6 w-36 rounded-md" />
					<Skeleton className="h-4 w-52 rounded-md" />
				</div>
			</section>

			{/* Products Listing Section */}
			<section>
				{/* Toolbar: Counter & Sort trigger */}
				<div className="flex justify-between gap-2 items-center mb-4">
					<Skeleton className="h-4 w-40 rounded" />
					<div className="flex items-center gap-2">
						<Skeleton className="h-4 w-10 rounded" />
						<Skeleton className="h-9 w-28 rounded-md" />
					</div>
				</div>

				{/* Grid matching ProductsListing */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{Array.from({ length: 6 }).map((_, i) => (
						<article key={i} className="bg-card p-4 rounded-xl space-y-4 border border-transparent">
							{/* Card Top: Icon + Name + Unit */}
							<div className="flex gap-2">
								<Skeleton className="h-10 w-10 rounded-lg shrink-0" />
								<div className="flex flex-col gap-1.5 w-full">
									<Skeleton className="h-4 w-28 rounded" />
									<Skeleton className="h-3 w-16 rounded" />
								</div>
							</div>

							{/* "আজকের দাম" label */}
							<Skeleton className="h-3 w-20 rounded" />

							{/* Card Bottom: Price + Change Badge */}
							<div className="flex justify-between items-end pt-1">
								<div className="flex items-baseline gap-1">
									<Skeleton className="h-6 w-16 rounded" />
									<Skeleton className="h-4 w-8 rounded" />
								</div>
								<Skeleton className="h-6 w-16 rounded-full" />
							</div>
						</article>
					))}
				</div>
			</section>
		</div>
	);
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
	return (
		<div className="mx-auto container px-6">
			<Suspense fallback={<CategorySkeleton />}>
				<CategoryContent params={params} />
			</Suspense>
		</div>
	);
}
