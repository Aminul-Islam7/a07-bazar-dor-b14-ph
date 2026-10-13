'use client';

import * as z from 'zod';

import { Controller, useForm } from 'react-hook-form';
import { FaCamera, FaEye, FaEyeSlash, FaInfoCircle, FaLock, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { changePassword, signOut, updateUser, useSession } from '@/lib/auth-client';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

const profileSchema = z.object({
	name: z.string().min(2, 'নাম কমপক্ষে ২ অক্ষরের হতে হবে।'),
});

const passwordSchema = z
	.object({
		currentPassword: z.string().min(1, 'বর্তমান পাসওয়ার্ড লিখুন।'),
		newPassword: z.string().min(8, 'নতুন পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।'),
		confirmPassword: z.string().min(1, 'নতুন পাসওয়ার্ড নিশ্চিত করুন।'),
	})
	.superRefine(({ newPassword, confirmPassword }, ctx) => {
		if (confirmPassword !== newPassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'নতুন পাসওয়ার্ড দুটি মেলেনি।',
				path: ['confirmPassword'],
			});
		}
	});

export default function ProfilePage() {
	const router = useRouter();
	const { data: session, isPending: isSessionPending, refetch } = useSession();

	const [isUpdatingName, setIsUpdatingName] = useState(false);
	const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
	const [isUpdatingImage, setIsUpdatingImage] = useState(false);
	const [isSigningOut, setIsSigningOut] = useState(false);

	const [isImageModalOpen, setIsImageModalOpen] = useState(false);
	const [imageUrlInput, setImageUrlInput] = useState(session?.user.image);

	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const profileForm = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: '',
		},
	});

	useEffect(() => {
		if (session?.user?.name) {
			profileForm.reset({ name: session.user.name });
		}
	}, [session, profileForm]);

	const passwordForm = useForm<z.infer<typeof passwordSchema>>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
	});

	const handleSignOut = async () => {
		try {
			setIsSigningOut(true);
			await signOut({
				fetchOptions: {
					onSuccess: () => {
						toast.success('সফলভাবে সাইন আউট করা হয়েছে।');
						router.push('/sign-in');
					},
					onError: ctx => {
						toast.error(ctx.error.message || 'সাইন আউট ব্যর্থ হয়েছে।');
					},
				},
			});
		} catch {
			toast.error('সার্ভারে সমস্যা হচ্ছে, অনুগ্রহ করে আবার চেষ্টা করুন।');
		} finally {
			setIsSigningOut(false);
		}
	};

	const onUpdateName = async (data: z.infer<typeof profileSchema>) => {
		try {
			setIsUpdatingName(true);
			await updateUser({
				name: data.name,
				fetchOptions: {
					onSuccess: () => {
						toast.success('নাম সফলভাবে পরিবর্তন করা হয়েছে।');
						refetch?.();
					},
					onError: ctx => {
						toast.error(ctx.error.message || 'নাম আপডেট করা যায়নি।');
					},
				},
			});
		} catch {
			toast.error('নাম আপডেট করতে সমস্যা হয়েছে।');
		} finally {
			setIsUpdatingName(false);
		}
	};

	const onUpdateImage = async () => {
		if (!imageUrlInput.trim()) {
			toast.error('অনুগ্রহ করে সঠিক ছবির লিংক দিন।');
			return;
		}

		try {
			setIsUpdatingImage(true);
			await updateUser({
				image: imageUrlInput.trim(),
				fetchOptions: {
					onSuccess: () => {
						toast.success('প্রোফাইল ছবি সফলভাবে আপডেট হয়েছে।');
						setIsImageModalOpen(false);
						setImageUrlInput('');
						refetch?.();
					},
					onError: ctx => {
						toast.error(ctx.error.message || 'ছবি আপডেট করা যায়নি।');
					},
				},
			});
		} catch {
			toast.error('ছবি আপডেট করতে সমস্যা হয়েছে।');
		} finally {
			setIsUpdatingImage(false);
		}
	};

	const onUpdatePassword = async (data: z.infer<typeof passwordSchema>) => {
		try {
			setIsUpdatingPassword(true);
			await changePassword({
				currentPassword: data.currentPassword,
				newPassword: data.newPassword,
				revokeOtherSessions: true,
				fetchOptions: {
					onSuccess: () => {
						toast.success('পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।');
						passwordForm.reset();
					},
					onError: ctx => {
						toast.error(ctx.error.message || 'পাসওয়ার্ড পরিবর্তন করা যায়নি।');
					},
				},
			});
		} catch {
			toast.error('পাসওয়ার্ড আপডেট করতে সমস্যা হয়েছে।');
		} finally {
			setIsUpdatingPassword(false);
		}
	};

	if (isSessionPending) {
		return (
			<main className="container max-w-2xl mx-auto px-4 py-10 space-y-6">
				<div className="space-y-2">
					<Skeleton className="h-8 w-44 rounded-md" />
					<Skeleton className="h-4 w-60 rounded" />
				</div>
				<Skeleton className="h-32 w-full rounded-2xl" />
				<Skeleton className="h-58 w-full rounded-2xl" />
				<Skeleton className="h-78 w-full rounded-2xl" />
			</main>
		);
	}

	return (
		<main className="container max-w-2xl mx-auto px-4 py-10 space-y-6">
			<div className="space-y-1">
				<h1 className="text-2xl font-bold tracking-tight text-foreground">আমার প্রোফাইল</h1>
				<p className="text-sm text-muted-foreground">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
			</div>

			<section className="bg-card rounded-2xl border p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
				<div className="flex items-center gap-4">
					<button type="button" onClick={() => setIsImageModalOpen(true)} className="group relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-2xl border bg-muted focus:outline-none" title="ছবি পরিবর্তন করতে ক্লিক করুন">
						{session?.user?.image ? (
							<Image src={session.user.image} alt={session.user.name || 'User'} fill sizes="80px" className="object-cover" />
						) : (
							<div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
								<FaUser className="h-8 w-8" />
							</div>
						)}
						<div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100">
							<FaCamera className="h-5 w-5" />
							<span className="text-[10px] mt-0.5 font-medium">পরিবর্তন</span>
						</div>
					</button>

					<div>
						<h2 className="text-xl font-bold text-foreground">{session?.user?.name || 'ব্যবহারকারী'}</h2>
						<p className="text-sm text-muted-foreground mt-0.5">{session?.user?.email || 'ইমেইল নেই'}</p>
					</div>
				</div>

				<Button type="button" variant="outline" size="lg" onClick={handleSignOut} disabled={isSigningOut} className="gap-1.5 w-full sm:w-auto border-red-600 text-red-600 hover:text-red-700 bg-red-50/60 hover:bg-red-100/60 dark:border-red-600 dark:text-red-300 dark:hover:text-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/40">
					{isSigningOut ? (
						<Spinner className="h-4 w-4" />
					) : (
						<>
							<FaSignOutAlt className="h-4 w-4" /> সাইন আউট
						</>
					)}
				</Button>
			</section>

			{/* Info / Name Form Card */}
			<section className="bg-card rounded-2xl border p-6 space-y-5">
				<div className="flex items-center gap-2">
					<FaInfoCircle className="h-4 w-4 text-muted-foreground" />
					<h3 className="text-lg font-bold text-foreground">তথ্য</h3>
				</div>

				<form onSubmit={profileForm.handleSubmit(onUpdateName)} className="space-y-4" noValidate>
					<Controller
						name="name"
						control={profileForm.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="name" className="text-sm font-medium">
									নাম
								</FieldLabel>
								<Input {...field} id="name" type="text" placeholder="আপনার নাম" className="bg-muted focus-visible:ring-primary/20 h-11 border-none px-4" />
								{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
							</Field>
						)}
					/>

					<Button type="submit" disabled={isUpdatingName} className="w-full py-5">
						{isUpdatingName ? <Spinner /> : 'আপডেট'}
					</Button>
				</form>
			</section>

			{/* Password Form Card */}
			<section className="bg-card rounded-2xl border p-6 space-y-5">
				<div className="flex items-center gap-2">
					<FaLock className="h-4 w-4 text-muted-foreground" />
					<h3 className="text-lg font-bold text-foreground">পাসওয়ার্ড পরিবর্তন</h3>
				</div>

				<form onSubmit={passwordForm.handleSubmit(onUpdatePassword)} className="space-y-4" noValidate>
					<Controller
						name="currentPassword"
						control={passwordForm.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="currentPassword" className="text-sm font-medium">
									বর্তমান পাসওয়ার্ড
								</FieldLabel>
								<div className="relative">
									<Input {...field} id="currentPassword" type={showCurrentPassword ? 'text' : 'password'} placeholder="বর্তমান পাসওয়ার্ড লিখুন" className="bg-muted focus-visible:ring-primary/20 h-11 border-none pl-4 pr-10" />
									<button type="button" onClick={() => setShowCurrentPassword(prev => !prev)} className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer focus:outline-none">
										{showCurrentPassword ? <FaEye /> : <FaEyeSlash />}
									</button>
								</div>
								{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
							</Field>
						)}
					/>

					<FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<Controller
							name="newPassword"
							control={passwordForm.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="newPassword" className="text-sm font-medium">
										নতুন পাসওয়ার্ড
									</FieldLabel>
									<div className="relative">
										<Input {...field} id="newPassword" type={showNewPassword ? 'text' : 'password'} placeholder="কমপক্ষে ৮ অক্ষর" className="bg-muted focus-visible:ring-primary/20 h-11 border-none pl-4 pr-10" />
										<button type="button" onClick={() => setShowNewPassword(prev => !prev)} className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer focus:outline-none">
											{showNewPassword ? <FaEye /> : <FaEyeSlash />}
										</button>
									</div>
									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
								</Field>
							)}
						/>

						<Controller
							name="confirmPassword"
							control={passwordForm.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="confirmPassword" className="text-sm font-medium">
										নতুন পাসওয়ার্ড নিশ্চিত করুন
									</FieldLabel>
									<div className="relative">
										<Input {...field} id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="আবার লিখুন" className="bg-muted focus-visible:ring-primary/20 h-11 border-none pl-4 pr-10" />
										<button type="button" onClick={() => setShowConfirmPassword(prev => !prev)} className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer focus:outline-none">
											{showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
										</button>
									</div>
									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
								</Field>
							)}
						/>
					</FieldGroup>

					<Button type="submit" disabled={isUpdatingPassword} className="w-full py-5">
						{isUpdatingPassword ? <Spinner /> : 'পাসওয়ার্ড আপডেট করুন'}
					</Button>
				</form>
			</section>

			{isImageModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
					<div className="bg-card w-full max-w-md rounded-2xl border p-6 space-y-4 shadow-xl">
						<div className="space-y-1">
							<h3 className="text-lg font-bold text-foreground">প্রোফাইল ছবি পরিবর্তন</h3>
							<p className="text-sm text-muted-foreground">আপনার ছবির সরাসরি ওয়েব লিংক (Image URL) এখানে দিন।</p>
						</div>

						<Input type="url" placeholder="https://example.com/photo.jpg" value={imageUrlInput} onChange={e => setImageUrlInput(e.target.value)} className="bg-muted border-none h-11 px-4" />

						<div className="flex justify-end gap-2 pt-2">
							<Button type="button" variant="outline" onClick={() => setIsImageModalOpen(false)} disabled={isUpdatingImage}>
								বাতিল
							</Button>
							<Button type="button" onClick={onUpdateImage} disabled={isUpdatingImage}>
								{isUpdatingImage ? <Spinner className="h-4 w-4" /> : 'সংরক্ষণ করুন'}
							</Button>
						</div>
					</div>
				</div>
			)}
		</main>
	);
}
