'use client';

import { Fragment, Suspense } from 'react';
import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { directionColor, directionSymbol, numberInBangla } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Category } from '@/types/commodity';
import { FaCartShopping } from 'react-icons/fa6';
import Link from 'next/link';
import { Marquee } from '../ui/marquee';
import { Menu } from 'lucide-react';
import NavbarAvatar from '../ui/navbar-avatar';
import { Skeleton } from '../ui/skeleton';
import ThemeSwitcherButton from '../ui/theme-switcher-button';
import { useApp } from '@/context/app-context';
import { usePathname } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

function CategoryLinks({ categories }: { categories: Category[] }) {
	const pathname = usePathname();

	return (
		<>
			{categories.map((category: Category) => {
				const isActive = pathname === `/categories/${category.slug}`;
				return (
					<Link key={category.slug} className={`rounded-md px-3 py-2 text-xs font-semibold transition-colors ${isActive ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-neutral-700 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-800'}`} href={`/categories/${category.slug}`}>
						<span className="mr-2">{category.icon}</span>
						<span>{category.nameBn}</span>
					</Link>
				);
			})}
		</>
	);
}

function CategoryLinksFallback({ count = 8 }: { count?: number }) {
	return (
		<div className="flex items-center gap-2">
			{Array.from({ length: count }).map((_, index) => (
				<Skeleton key={index} className="h-7 w-20 rounded-md" />
			))}
		</div>
	);
}

function AuthSection() {
	const { data: session, isPending: isSessionPending } = useSession();

	if (isSessionPending) {
		return <Skeleton className="h-8 w-28 rounded-lg" />;
	}

	if (session?.user) {
		return <NavbarAvatar user={session.user} />;
	}

	return (
		<div className="flex flex-col lg:flex-row gap-2 lg:gap-1.5">
			<Button variant="ghost" size="sm" className="w-full lg:w-auto">
				<Link href="/sign-in">Sign In</Link>
			</Button>
			<Button size="sm" className="w-full lg:w-auto">
				<Link href="/sign-up">Sign Up</Link>
			</Button>
		</div>
	);
}

export default function Navbar() {
	const context = useApp();

	return (
		<section className="sticky top-0 z-50">
			<nav className="relative w-full border-b bg-card/80 backdrop-blur-2xl">
				<div className="container mx-auto px-6">
					<div className="flex h-16 items-center justify-between">
						{/* Logo & Brand */}
						<div className="flex items-center gap-6">
							<Link href="/" className="flex items-center gap-2">
								<div className="bg-primary rounded-md text-primary-foreground flex h-10 w-10 items-center justify-center">
									<FaCartShopping size={20} />
								</div>
								<div className="flex flex-col">
									<span className="text-xl font-bold">বাজার দর</span>
									{context.banglaDate ? <span className="text-xs text-muted-foreground">{context.banglaDate}</span> : <Skeleton className="mt-0.5 h-3.5 w-32 rounded" />}
								</div>
							</Link>
						</div>

						{/* Right Actions */}
						<div className="flex items-center gap-1 md:gap-2">
							<ThemeSwitcherButton />
							<div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800" />

							{/* Desktop Auth */}
							<div className="hidden lg:block">
								<AuthSection />
							</div>

							{/* Mobile Menu */}
							<div className="text-neutral-700 lg:hidden">
								<Sheet>
									<SheetTrigger
										render={
											<Button variant="ghost" className="h-10 w-10 rounded-xl p-0 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800">
												<Menu className="h-6 w-6" />
											</Button>
										}
									></SheetTrigger>
									<SheetContent side="right" className="w-full sm:max-w-xs">
										<div className="flex h-full flex-col overflow-y-auto px-6 py-8 justify-between">
											<div>
												<div className="mb-6 flex items-center justify-between">
													<Link href="/" className="flex items-center gap-2">
														<div className="bg-primary rounded-md text-primary-foreground flex h-8 w-8 items-center justify-center">
															<FaCartShopping size={14} />
														</div>
														<span className="text-xl font-bold">বাজার দর</span>
													</Link>
												</div>
												<div className="flex flex-col gap-1 text-base font-medium">
													{context.categories.map((category: Category) => (
														<Link key={category.slug} className="hover:text-primary block py-2 text-neutral-900 transition-colors dark:text-neutral-50" href={`/categories/${category.slug}`}>
															<span className="mr-2">{category.icon}</span>
															<span>{category.nameBn}</span>
														</Link>
													))}
												</div>
											</div>
											<AuthSection />
										</div>
									</SheetContent>
								</Sheet>
							</div>
						</div>
					</div>

					{/* Desktop Horizontal Category Bar */}
					<NavigationMenu className="hidden lg:flex items-center h-10">
						<NavigationMenuList className="-m-3">
							<Suspense fallback={<CategoryLinksFallback count={context.categories.length || 8} />}>
								<CategoryLinks categories={context.categories} />
							</Suspense>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</nav>

			{/* Price Ticker Marquee */}
			<Marquee pauseOnHover className="[--duration:120s] w-full p-0 border-b bg-card/80 backdrop-blur-2xl">
				{context.products.map(product => (
					<Fragment key={product.id}>
						<Link href={`/categories/${product.category}/products/${product.id}`}>
							<article className="flex gap-2 text-sm p-2 items-center">
								<span>{product.image}</span>
								<span className="font-medium">{product.nameBn}</span>
								<span>{numberInBangla(product.today)} টাকা/কেজি</span>
								<span className={`font-semibold ${directionColor(product.change.dir)}`}>{directionSymbol(product.change.dir) + ' ' + numberInBangla(Math.abs(product.change.pct))}%</span>
							</article>
						</Link>
						<div className="w-px h-full bg-muted" />
					</Fragment>
				))}
			</Marquee>
		</section>
	);
}
