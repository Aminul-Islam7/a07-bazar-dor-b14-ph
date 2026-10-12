import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types/commodity';
import ProductMarketPriceTable from './product-market-price-table';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { numberInBangla } from '@/lib/utils';

export async function generateStaticParams() {
	const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products');
	const products: Product[] = await res.json();

	return products.map(product => ({
		id: String(product.id),
	}));
}

async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${id}`, {
		next: { revalidate: 3600 },
	});

	if (!res.ok) {
		throw new Error('Product not found');
	}

	const product: Product = await res.json();

	const minPrice = Math.min(...product.markets.map(m => m.min));
	const maxPrice = Math.max(...product.markets.map(m => m.max));
	const avgPrice = Math.round((minPrice + maxPrice) / 2);

	const priceChangeInfo = () => {
		const diff = numberInBangla(Math.abs(product.today - product.yesterday));
		if (product.change.dir === 'up') {
			return (
				<>
					গতকালকের তুলনায় আজ দাম <strong>বেড়েছে</strong> • {diff} টাকা
				</>
			);
		}
		if (product.change.dir === 'down') {
			return (
				<>
					গতকালকের তুলনায় আজ দাম <strong>কমেছে</strong> • {diff} টাকা
				</>
			);
		}
		return <>দাম গতকালের মতোই আছে</>;
	};

	const priceChangePercentage = () => {
		const pctBangla = numberInBangla(Math.abs(product.change.pct).toFixed(1));
		if (product.change.dir === 'up') return <span className="text-red-600 dark:text-red-400">▲ {pctBangla}%</span>;
		if (product.change.dir === 'down') return <span className="text-green-600 dark:text-green-400">▼ {pctBangla}%</span>;
		return <>— {pctBangla}%</>;
	};

	return (
		<>
			<div className="text-sm text-muted-foreground font-medium flex items-center mb-4 gap-2">
				<Link href={'/'}>হোম</Link>
				<ChevronRight size={14}></ChevronRight>
				<Link href={`/categories/${product.category}`}>{product.categoryNameBn}</Link>
				<ChevronRight size={14}></ChevronRight>
				<span>{product.nameBn}</span>
			</div>
			<article className="flex flex-col sm:flex-row justify-between items-center bg-card rounded-xl border w-full gap-6 p-6 mb-6">
				<div className="flex items-center gap-4">
					<div className="text-7xl">{product.image}</div>
					<div>
						<h1 className="text-3xl sm:text-4xl font-bold">{product.nameBn}</h1>
						<p className="text-sm text-muted-foreground mt-1">প্রতি কেজি • {product.categoryNameBn}</p>
						<p className="text-sm mt-2">{priceChangeInfo()}</p>
					</div>
				</div>

				<div className="bg-background w-full sm:w-fit px-10 py-4 text-center flex flex-col justify-center items-center rounded-xl border">
					<span className="text-xs text-muted-foreground">আজকের দাম</span>
					<span className="text-3xl font-bold my-0.5">{numberInBangla(product.today)}</span>
					<span className="text-xs text-muted-foreground">টাকা / কেজি</span>
					<span className="text-sm font-semibold mt-1">{priceChangePercentage()}</span>
				</div>
			</article>

			<section className="bg-card rounded-xl border p-6">
				<h2 className="font-semibold text-xl mb-3">দামের সারসংক্ষেপ</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
					<div className="border rounded-xl px-5 py-3.5 bg-background/50">
						<span className="text-xs text-muted-foreground">সর্বনিম্ন দাম</span>
						<div className="text-green-600 dark:text-green-400 flex gap-1 items-end my-0.5">
							<span className="font-bold text-2xl">{numberInBangla(minPrice)}</span>
							<span className="font-medium text-sm mb-0.5">টাকা</span>
						</div>
						<span className="text-xs text-muted-foreground">সবচেয়ে কম দামের বাজার</span>
					</div>

					<div className="border rounded-xl px-5 py-3.5 bg-background/50">
						<span className="text-xs text-muted-foreground">সর্বাধিক দাম</span>
						<div className="text-red-600 dark:text-red-400 flex gap-1 items-end my-0.5">
							<span className="font-bold text-2xl">{numberInBangla(maxPrice)}</span>
							<span className="font-medium text-sm mb-0.5">টাকা</span>
						</div>
						<span className="text-xs text-muted-foreground">সবচেয়ে বেশি দামের বাজার</span>
					</div>

					<div className="border rounded-xl px-5 py-3.5 bg-background/50">
						<span className="text-xs text-muted-foreground">গড় দাম</span>
						<div className="flex gap-1 items-end my-0.5">
							<span className="font-bold text-2xl">{numberInBangla(avgPrice)}</span>
							<span className="font-medium text-sm mb-0.5">টাকা</span>
						</div>
						<span className="text-xs text-muted-foreground">প্রতি কেজি-এর হিসাবে</span>
					</div>
				</div>

				<h2 className="font-semibold text-xl mb-3">বাজারভিত্তিক আজকের দাম</h2>
				<ProductMarketPriceTable product={product} />
			</section>
		</>
	);
}

function ProductPageSkeleton() {
	return (
		<div className="animate-pulse space-y-6">
			<Skeleton className="bg-card h-5 mb-4 w-42"></Skeleton>
			{/* Header Hero Card */}
			<div className="flex flex-col sm:flex-row justify-between items-center bg-card rounded-xl border p-6 gap-6">
				<div className="flex items-center gap-4 w-full">
					<Skeleton className="h-20 w-20 rounded-xl shrink-0" />
					<div className="space-y-2 w-full max-w-sm">
						<Skeleton className="h-9 w-48 rounded-md" />
						<Skeleton className="h-4 w-32 rounded" />
						<Skeleton className="h-4 w-60 rounded mt-2" />
					</div>
				</div>
				<Skeleton className="h-32 w-full sm:w-36 rounded-xl shrink-0" />
			</div>

			{/* Content Container */}
			<div className="bg-card rounded-xl border p-6 space-y-6">
				{/* Summary Title & 3 Cards */}
				<div>
					<Skeleton className="h-6 w-36 rounded mb-3" />
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<Skeleton className="h-30 rounded-xl" />
						<Skeleton className="h-30 rounded-xl" />
						<Skeleton className="h-30 rounded-xl" />
					</div>
				</div>

				{/* Table Title & Skeleton Table */}
				<div>
					<Skeleton className="h-6 w-48 rounded mb-3" />
					<div className="rounded-xl border overflow-hidden">
						{/* Table Header Row */}
						<div className="flex justify-between items-center px-4 py-3 border-b bg-muted/40">
							<Skeleton className="h-2.5 w-20 rounded" />
							<Skeleton className="h-2.5 w-16 rounded" />
							<Skeleton className="h-2.5 w-16 rounded" />
							<Skeleton className="h-2.5 w-16 rounded" />
							<Skeleton className="h-2.5 w-14 rounded" />
						</div>
						{/* Table Body Rows */}
						{Array.from({ length: 12 }).map((_, i) => (
							<div key={i} className="flex justify-between items-center px-4 py-3.5 border-b last:border-0">
								<Skeleton className="h-2.5 w-28 rounded" />
								<Skeleton className="h-2.5 w-14 rounded" />
								<Skeleton className="h-2.5 w-20 rounded" />
								<Skeleton className="h-2.5 w-20 rounded" />
								<Skeleton className="h-2.5 w-20 rounded" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
	return (
		<div className="mx-auto container px-6">
			<Suspense fallback={<ProductPageSkeleton />}>
				<ProductDetails params={params} />
			</Suspense>
		</div>
	);
}
