'use client';

import * as z from 'zod';

import { Controller, useForm } from 'react-hook-form';
import { FaArrowLeft, FaEye, FaEyeSlash, FaGithub, FaGoogle } from 'react-icons/fa';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { MdEmail, MdLock } from 'react-icons/md';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
	email: z.email({ message: 'সঠিক ইমেইল অ্যাড্রেস দিন।' }),
	password: z.string().min(1, 'পাসওয়ার্ড লিখুন'),
});

export default function SignInPage() {
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	function onSubmit(data: z.infer<typeof formSchema>) {}

	return (
		<main className="py-10 flex flex-col justify-center">
			<div className="mb-6 space-y-1">
				<h1 className="text-foreground text-2xl font-bold text-center">সাইন ইন</h1>
				<p className="text-muted-foreground text-sm text-center">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
			</div>
			<div className="flex items-center justify-center px-2">
				<div className="bg-card rounded-xl p-6 sm:p-8 w-md">
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
						<Controller
							name="email"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="email" className="text-sm font-medium">
										ইমেইল
									</FieldLabel>
									<div className="relative">
										<MdEmail className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
										<Input {...field} id="email" type="email" placeholder="you@example.com" autoComplete="email" className="bg-muted focus-visible:ring-primary/20 h-11 border-none pl-10" required />
									</div>
									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
								</Field>
							)}
						/>

						<Controller
							name="password"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="password" className="text-sm font-medium">
										পাসওয়ার্ড
									</FieldLabel>
									<div className="relative">
										<MdLock className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
										<Input {...field} id="password" type={showPassword ? 'text' : 'password'} placeholder="আপনার পাসওয়ার্ড" autoComplete="password" className="bg-muted focus-visible:ring-primary/20 h-11 border-none pl-10 pr-10" required />
										<button type="button" onClick={() => setShowPassword(prev => !prev)} className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3.5 -translate-y-1/2 transition-colors focus:outline-none cursor-pointer" aria-label={showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}>
											{showPassword ? <FaEye /> : <FaEyeSlash />}
										</button>
									</div>
									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
								</Field>
							)}
						/>

						<Button type="submit" className="py-5 w-full gap-2 font-semibold shadow-sm">
							সাইন ইন
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
						<span className="mr-2">অ্যাকাউন্ট নেই?</span>
						<Link className="font-semibold text-primary" href="/sign-up">
							সাইন আপ করুন
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
