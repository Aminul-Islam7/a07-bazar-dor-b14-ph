import './globals.css';

import { Hind_Siliguri } from 'next/font/google';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';

const hindSiliguri = Hind_Siliguri({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['bengali'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: 'বাজার দর',
	description: 'চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।',
	icons: {
		icon: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛒</text></svg>`,
	},
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html lang="en" className={cn('h-full', 'antialiased', hindSiliguri.variable, 'font-sans')}>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}

