import './globals.css';

import { Category, Product } from '@/types/commodity';

import { AppProvider } from '@/context/app-context';
import Footer from '@/components/layout/footer';
import { Hind_Siliguri } from 'next/font/google';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

const hindSiliguri = Hind_Siliguri({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['bengali'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: 'বাজার দর',
	description: 'চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।',
};

async function getInitialStoreData(): Promise<{ categories: Category[]; products: Product[] }> {
	try {
		const [categoriesRes, productsRes] = await Promise.all([
			fetch('https://api.api-store.workers.dev/api/bazardor/categories', {
				next: { revalidate: 3600 },
			}),
			fetch('https://api.api-store.workers.dev/api/bazardor/products', {
				next: { revalidate: 3600 },
			}),
		]);

		if (!categoriesRes.ok || !productsRes.ok) {
			return { categories: [], products: [] };
		}

		const [categories, products] = await Promise.all([categoriesRes.json(), productsRes.json()]);

		return { categories, products };
	} catch {
		return { categories: [], products: [] };
	}
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const { categories, products } = await getInitialStoreData();

	return (
		<html lang="bn" className={cn('h-full', 'antialiased', hindSiliguri.variable, 'font-sans')} suppressHydrationWarning>
			<body className="min-h-full flex flex-col">
				<AppProvider initialCategories={categories} initialProducts={products}>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						<Navbar />
						{children}
						<Footer />
					</ThemeProvider>
				</AppProvider>
			</body>
		</html>
	);
}

