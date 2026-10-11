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

interface AppProviderProps {
	children: React.ReactNode;
	initialCategories?: Category[];
	initialProducts?: Product[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children, initialCategories = [], initialProducts = [] }: AppProviderProps) {
	const [categories, setCategories] = useState<Category[]>(initialCategories);
	const [products, setProducts] = useState<Product[]>(initialProducts);
	const [isLoading, setIsLoading] = useState<boolean>(initialCategories.length === 0 && initialProducts.length === 0);
	const [error, setError] = useState<string | null>(null);
	const [banglaDate, setBanglaDate] = useState<string>('');

	useEffect(() => {
		const date = new Date().toLocaleDateString('bn-BD', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
		setBanglaDate(date);
	}, []);

	return (
		<AppContext.Provider
			value={{
				categories,
				products,
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
