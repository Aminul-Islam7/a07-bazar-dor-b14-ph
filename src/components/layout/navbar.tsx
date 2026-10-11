'use client';

import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { directionColor, directionSymbol } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Category } from '@/types/commodity';
import { FaCartShopping } from 'react-icons/fa6';
import { Fragment } from 'react';
import Link from 'next/link';
import { Marquee } from '../ui/marquee';
import { Menu } from 'lucide-react';
import NavbarAvatar from '../ui/navbar-avatar';
import { Skeleton } from '../ui/skeleton';
import ThemeSwitcherButton from '../ui/theme-switcher-button';
import { numberInBangla } from '@/lib/utils';
import { useApp } from '@/context/app-context';

export default function Navbar() {
	const context = useApp();

	const dummyCategory = { length: 8 };

	return (
		<section className="sticky top-0">
			<nav className="relative w-full border-b bg-card/80 backdrop-blur-2xl">
				<div className="container mx-auto px-6">
					<div className=" flex h-16 items-center justify-between">
						<div className="flex items-center gap-6">
							<div className="flex items-center gap-2">
								<div className="bg-primary rounded-md text-white flex h-10 w-10 items-center justify-center">
									<FaCartShopping size={20} />
								</div>
								<div className="flex flex-col">
									<span className="text-xl font-bold">বাজার দর</span>
									{context.banglaDate ? <span className="text-xs">{context.banglaDate}</span> : <Skeleton className="mt-0.5 h-3.5 w-32 rounded" />}
								</div>
							</div>
						</div>
						{/* Right Section */}
						<div className="flex items-center gap-1 md:gap-2">
							<ThemeSwitcherButton></ThemeSwitcherButton>
							<div className="h-6 w-px bg-neutral-200 lg:block dark:bg-neutral-800" />
							{/* Avatar Section */}
							<NavbarAvatar className="hidden lg:block"></NavbarAvatar>
							<div className="text-neutral-700 lg:hidden">
								<Sheet>
									<SheetTrigger render={<Button variant="ghost" className="h-10 w-10 rounded-xl p-0 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800" />}>
										<Menu className="h-6 w-6" />
									</SheetTrigger>
									<SheetContent side="right" className="w-full sm:max-w-xs">
										<div className="flex h-full flex-col overflow-y-auto px-6 py-8 justify-between">
											<div>
												<div className="mb-6 flex items-center justify-between">
													<div className="flex items-center gap-2">
														<div className="bg-primary rounded-md text-white flex h-8 w-8 items-center justify-center">
															<FaCartShopping size={14} />
														</div>
														<span className="text-xl font-bold">বাজার দর</span>
													</div>
												</div>
												<div className="flex flex-col gap-1 text-base font-medium">
													{context.categories.map((category: Category) => (
														<Link key={category.slug} className="hover:text-primary block py-2 text-neutral-900 no-underline transition-colors dark:text-neutral-50" href={`category/${category.slug}`}>
															<span className="mr-2">{category.icon}</span>
															<span>{category.nameBn}</span>
														</Link>
													))}
												</div>
											</div>
											<NavbarAvatar></NavbarAvatar>
										</div>
									</SheetContent>
								</Sheet>
							</div>
						</div>
					</div>
					<NavigationMenu className="hidden lg:flex items-center h-10">
						<NavigationMenuList className="-m-3">
							{context.isLoading
								? Array.from(dummyCategory).map((dummyCategory, index) => <Skeleton key={index} className="h-6 w-16 ml-2"></Skeleton>)
								: context.categories.map((category: Category) => (
										<Link key={category.slug} className="rounded-md bg-transparent px-3 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-50" href={`category/${category.slug}`}>
											<span className="mr-2">{category.icon}</span>
											<span>{category.nameBn}</span>
										</Link>
									))}
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</nav>
			<Marquee pauseOnHover className="[--duration:120s] w-full p-0 border-b bg-card/80 backdrop-blur-2xl">
				{context.products.map(product => (
					<Fragment key={product.id}>
						<article className="flex gap-2 text-sm p-2">
							<span>{product.image}</span>
							<span className="font-medium">{product.nameBn}</span>
							<span>{numberInBangla(product.today)} টাকা/কেজি</span>

							<span className={`font-semibold ${directionColor(product.change.dir)}`}>{directionSymbol(product.change.dir) + ' ' + numberInBangla(Math.abs(product.change.pct))}%</span>
						</article>
						<div className="w-px h-full bg-muted"></div>
					</Fragment>
				))}
			</Marquee>
		</section>
	);
}
