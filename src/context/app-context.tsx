'use client';

import { Category, Product } from '@/types/commodity';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AppContextType {
	categories: Category[];
	products: Product[];
	isLoading: boolean;
	error: string | null;
	banglaDate: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
	const [categories, setCategories] = useState<Category[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [banglaDate, setBanglaDate] = useState<string>('');

	useEffect(() => {
		async function loadData() {
			try {
				setIsLoading(true);
				const [categoriesRes, productsRes] = await Promise.all([fetch('https://api.api-store.workers.dev/api/bazardor/categories'), fetch('https://api.api-store.workers.dev/api/bazardor/products')]);

				if (!categoriesRes.ok || !productsRes.ok) {
					throw new Error('Failed to fetch store data');
				}

				const [categoriesData, productsData] = await Promise.all([categoriesRes.json(), productsRes.json()]);

				setCategories(categoriesData);
				setProducts(productsData);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Error fetching data from API');
			} finally {
				setIsLoading(false);
			}
		}

		loadData();

		const date = new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
		setBanglaDate(date);
	}, []);

	return (
		<AppContext.Provider
			value={{
				categories,
				products,
				// selectedCategory,
				// setSelectedCategory,
				isLoading,
				error,
				banglaDate,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export function useApp() {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useApp must be used within an AppProvider');
	}
	return context;
}
