'use client';

import { FaArrowLeft, FaGithub, FaGoogle } from 'react-icons/fa';
import { MdArrowForward, MdEmail, MdLock, MdPerson } from 'react-icons/md';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export interface TrustStat {
	value: string;
	label: string;
}

export default function SignUp() {
	return (
		<main className="py-10 flex flex-col justify-center">
			<div className="mb-6 space-y-1">
				<h1 className="text-foreground text-2xl font-bold text-center">অ্যাকাউন্ট তৈরি করুন</h1>
				<p className="text-muted-foreground text-sm text-center">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
			</div>
			<div className="flex items-center justify-center px-2">
				<div className="bg-card rounded-xl p-4 shadow-xs sm:p-8 w-md">
					<form
						onSubmit={e => {
							e.preventDefault();
							onSubmit?.(e);
						}}
						className="space-y-5"
					>
						<div className="space-y-1.5">
							<Label htmlFor="name" className="text-sm font-medium">
								নাম
							</Label>
							<div className="relative">
								<MdPerson className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
								<Input id="name" type="text " placeholder="যেমন: রহিম উদ্দিন" autoComplete="given-name" className="bg-muted focus-visible:ring-primary/20 h-11 border-none pl-10" required />
							</div>
						</div>

						<div className="space-y-1.5">
							<Label htmlFor="email" className="text-sm font-medium">
								ইমেইল
							</Label>
							<div className="relative">
								<MdEmail className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
								<Input id="email" type="email" placeholder="you@example.com" autoComplete="email" className="bg-muted focus-visible:ring-primary/20 h-11 border-none pl-10" required />
							</div>
						</div>

						<div className="space-y-1.5">
							<Label htmlFor="password" className="text-sm font-medium">
								পাসওয়ার্ড
							</Label>
							<div className="relative">
								<MdLock className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
								<Input id="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" autoComplete="new-password" className="bg-muted focus-visible:ring-primary/20 h-11 border-none pl-10" required minLength={8} />
							</div>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="password" className="text-sm font-medium">
								পাসওয়ার্ড নিশ্চিত করুন
							</Label>
							<div className="relative">
								<MdLock className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
								<Input id="password" type="password" placeholder="আবার লিখুন" autoComplete="new-password" className="bg-muted focus-visible:ring-primary/20 h-11 border-none pl-10" required minLength={8} />
							</div>
						</div>
						<Button type="submit" className="py-5 w-full gap-2 font-semibold shadow-sm">
							অ্যাকাউন্ট তৈরি করুন
							<MdArrowForward className="h-4 w-4" />
						</Button>
					</form>

					<div className="my-4 flex items-center gap-3">
						<Separator className="flex-1" />
						<span className="text-muted-foreground text-xs">অথবা</span>
						<Separator className="flex-1" />
					</div>

					<div className="grid grid-cols-2 gap-3 mb-4">
						<Button variant="secondary" type="button" className="w-full gap-2 py-5">
							<FaGoogle className="h-4 w-4" />
							Google
						</Button>
						<Button variant="secondary" type="button" className="w-full gap-2 py-5">
							<FaGithub className="h-4 w-4" />
							GitHub
						</Button>
					</div>
					<p className="text-sm text-center">
						<span className="mr-2">অ্যাকাউন্ট আছে?</span>
						<Link className="font-semibold text-primary" href="/sign-in">
							সাইন ইন করুন
						</Link>
					</p>
				</div>
			</div>
			<p className="text-muted-foreground mt-4 flex justify-center text-sm">
				<Link href="/" className="inline-flex items-center">
					<FaArrowLeft size={12} className="mr-2" /> হোম পেজে ফিরে যান
				</Link>
			</p>
		</main>
	);
}
