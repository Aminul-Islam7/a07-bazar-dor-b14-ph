'use client';

import * as z from 'zod';

import { Controller, useForm } from 'react-hook-form';
import { FaArrowLeft, FaEye, FaEyeSlash, FaGithub, FaGoogle } from 'react-icons/fa';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { MdEmail, MdLock } from 'react-icons/md';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { signIn } from '@/lib/auth-client';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
	email: z.email({ message: 'সঠিক ইমেইল অ্যাড্রেস দিন।' }),
	password: z.string().min(1, 'পাসওয়ার্ড লিখুন'),
});

function SignInForm() {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') || '/';
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			await signIn.email(
				{
					email: data.email,
					password: data.password,
					callbackURL: callbackUrl,
				},
				{
					onRequest: () => {
						setIsLoading(true);
					},
					onSuccess: () => {
						setIsLoading(false);
						router.push(callbackUrl);
					},
					onError: ctx => {
						setIsLoading(false);
						if (ctx.error?.code === 'INVALID_EMAIL_OR_PASSWORD') {
							toast.error('ইমেইল অথবা পাসওয়ার্ডটি সঠিক নয়।');
						} else if (ctx.error?.message) {
							toast.error(`${ctx.error.message}`);
						} else {
							toast.error(`${ctx.error.statusText} (${ctx.error.status})`);
						}
					},
				},
			);
		} catch (err) {
			setIsLoading(false);
			toast.error('সার্ভারে সমস্যা হচ্ছে, অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।');
		}
	};

	const handleGoogleSignIn = async () => {
		await signIn.social({
			provider: 'google',
		});
	};

	const handleGithubSignIn = async () => {
		await signIn.social({
			provider: 'github',
		});
	};

	return (
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
								<Input {...field} id="email" type="email" placeholder="you@example.com" autoComplete="email" className="bg-muted focus-visible:ring-primary/20 h-11 border-none pl-10" />
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
								<Input {...field} id="password" type={showPassword ? 'text' : 'password'} placeholder="আপনার পাসওয়ার্ড" autoComplete="current-password" className="bg-muted focus-visible:ring-primary/20 h-11 border-none pl-10 pr-10" />
								<button type="button" onClick={() => setShowPassword(prev => !prev)} className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3.5 -translate-y-1/2 transition-colors focus:outline-none cursor-pointer" aria-label={showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}>
									{showPassword ? <FaEye /> : <FaEyeSlash />}
								</button>
							</div>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Button type="submit" disabled={isLoading} className="py-5 w-full gap-2 font-semibold shadow-sm cursor-pointer">
					{isLoading ? <Spinner /> : <>সাইন ইন</>}
				</Button>
			</form>

			<div className="my-4 flex items-center gap-3">
				<Separator className="flex-1" />
				<span className="text-muted-foreground text-xs">অথবা</span>
				<Separator className="flex-1" />
			</div>

			<div className="grid grid-cols-2 gap-3 mb-4">
				<Button variant="secondary" type="button" onClick={handleGoogleSignIn} className="w-full gap-2 py-5 cursor-pointer">
					<FaGoogle className="h-4 w-4" />
					Google
				</Button>
				<Button variant="secondary" type="button" onClick={handleGithubSignIn} className="w-full gap-2 py-5 cursor-pointer">
					<FaGithub className="h-4 w-4" />
					GitHub
				</Button>
			</div>
			<p className="text-sm text-center">
				<span className="mr-2">অ্যাকাউন্ট নেই?</span>
				<Link className="font-semibold text-primary" href={`sign-up/?callbackUrl=${callbackUrl}`}>
					সাইন আপ করুন
				</Link>
			</p>
		</div>
	);
}

function SignInFallback() {
	return <div className="bg-card rounded-xl p-6 sm:p-8 w-md h-[360px] animate-pulse" />;
}

export default function SignInPage() {
	return (
		<main className="py-10 flex flex-col justify-center">
			<div className="mb-6 space-y-1">
				<h1 className="text-foreground text-2xl font-bold text-center">সাইন ইন</h1>
				<p className="text-muted-foreground text-sm text-center">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
			</div>
			<div className="flex items-center justify-center px-2">
				<Suspense fallback={<SignInFallback />}>
					<SignInForm />
				</Suspense>
			</div>
			<p className="text-muted-foreground mt-4 flex justify-center text-sm">
				<Link href="/" className="inline-flex items-center">
					<FaArrowLeft size={12} className="mr-2" /> হোম পেজে ফিরে যান
				</Link>
			</p>
		</main>
	);
}
