'use client';

import * as z from 'zod';

import { Controller, useForm } from 'react-hook-form';
import { FaArrowLeft, FaGithub, FaGoogle } from 'react-icons/fa';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { MdArrowForward, MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { Suspense, useState } from 'react';
import { signIn, signUp } from '@/lib/auth-client';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z
	.object({
		name: z.string().min(3, 'নাম কমপক্ষে ৩ অক্ষরের হতে হবে।'),
		email: z.email({ message: 'সঠিক ইমেইল অ্যাড্রেস দিন।' }),
		password: z.string().min(8, 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।'),
		confirmPassword: z.string().min(1, 'পাসওয়ার্ডটি আবার লিখে নিশ্চিত করুন।'),
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'পাসওয়ার্ড দুটি মেলেনি।',
				path: ['confirmPassword'],
			});
		}
	});

function releaseConfetti() {
	const end = Date.now() + 3 * 1000;
	const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];

	const frame = () => {
		if (Date.now() > end) return;

		confetti({
			particleCount: 2,
			angle: 60,
			spread: 55,
			startVelocity: 60,
			origin: { x: 0, y: 0.5 },
			colors: colors,
		});
		confetti({
			particleCount: 2,
			angle: 120,
			spread: 55,
			startVelocity: 60,
			origin: { x: 1, y: 0.5 },
			colors: colors,
		});

		requestAnimationFrame(frame);
	};

	frame();
}

function SignUpForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') || '/';
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			await signUp.email(
				{
					name: data.name,
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
						releaseConfetti();
						toast.success('আপনার অ্যাকাউন্টটি সফলভাবে তৈরি করা হয়েছে।');
						router.push(callbackUrl);
					},
					onError: ctx => {
						setIsLoading(false);
						toast.error('একটি এরোর হয়েছে। আবার চেষ্টা করুন।');
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
					name="name"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="name" className="text-sm font-medium">
								নাম
							</FieldLabel>
							<div className="relative">
								<MdPerson className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
								<Input {...field} id="name" type="text" placeholder="যেমন: রহিম উদ্দিন" autoComplete="name" aria-invalid={fieldState.invalid} className="bg-muted focus-visible:ring-primary/20 h-11 border-none pl-10" />
							</div>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

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

				<FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
									<Input {...field} id="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" autoComplete="new-password" className="bg-muted focus-visible:ring-primary/20 h-11 border-none pl-10" />
								</div>
								{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
							</Field>
						)}
					/>
					<Controller
						name="confirmPassword"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="confirmPassword" className="text-sm font-medium">
									পাসওয়ার্ড নিশ্চিত করুন
								</FieldLabel>
								<div className="relative">
									<MdLock className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
									<Input {...field} id="confirmPassword" type="password" placeholder="আবার লিখুন" autoComplete="off" className="bg-muted focus-visible:ring-primary/20 h-11 border-none pl-10" />
								</div>
								{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
							</Field>
						)}
					/>
				</FieldGroup>
				<Button type="submit" disabled={isLoading} className="py-5 w-full gap-2 font-semibold shadow-sm cursor-pointer">
					{isLoading ? (
						<Spinner />
					) : (
						<>
							অ্যাকাউন্ট তৈরি করুন <MdArrowForward className="h-4 w-4" />
						</>
					)}
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
				<span className="mr-2">অ্যাকাউন্ট আছে?</span>
				<Link className="font-semibold text-primary" href="/sign-in">
					সাইন ইন করুন
				</Link>
			</p>
		</div>
	);
}

function SignUpFormFallback() {
	return <div className="bg-card rounded-xl p-6 sm:p-8 w-md h-[460px] animate-pulse" />;
}

export default function SignUpPage() {
	return (
		<main className="py-10 flex flex-col justify-center">
			<div className="mb-6 space-y-1">
				<h1 className="text-foreground text-2xl font-bold text-center">অ্যাকাউন্ট তৈরি করুন</h1>
				<p className="text-muted-foreground text-sm text-center">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
			</div>
			<div className="flex items-center justify-center px-2">
				<Suspense fallback={<SignUpFormFallback />}>
					<SignUpForm />
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
