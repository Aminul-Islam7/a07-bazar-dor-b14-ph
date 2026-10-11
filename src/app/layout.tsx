import './globals.css';

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

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html lang="en" className={cn('h-full', 'antialiased', hindSiliguri.variable, 'font-sans')} suppressHydrationWarning>
			<body className="min-h-full flex flex-col">
				<AppProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						<Navbar></Navbar>
						{children}
						<Footer></Footer>
					</ThemeProvider>
				</AppProvider>
			</body>
		</html>
	);
}

