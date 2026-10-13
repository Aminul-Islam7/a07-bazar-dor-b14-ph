import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';

import { Button } from './button';
import { FaUser } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SessionUser {
	createdAt?: Date | null;
	email?: string | null;
	emailVerified?: boolean | null;
	id?: string | null;
	name?: string | null;
	image?: string | null;
	updatedAt?: Date | null;
}

export default function NavbarAvatar({ user }: { user: SessionUser }) {
	const router = useRouter();
	const [isSigningOut, setIsSigningOut] = useState(false);

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

	const displayName = user.name?.trim() || 'ব্যবহারকারী';
	const firstName = displayName.split(' ')[0];

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger render={<Button variant="ghost" className="h-auto rounded-xl p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800/50" />}>
					<div className="flex items-center gap-2">
						<Avatar className="h-8 w-8 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 relative">
							{user.image ? (
								<AvatarImage src={user.image} />
							) : (
								<AvatarFallback className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
									<FaUser className="h-4 w-4" />
								</AvatarFallback>
							)}
						</Avatar>
						<span className="text-sm font-semibold text-muted-foreground max-w-20 truncate">{firstName}</span>
						<ChevronDown className="h-4 w-4 text-neutral-400" />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-56 rounded-xl p-1.5 shadow-xl">
					<DropdownMenuGroup>
						<DropdownMenuLabel className="px-2 pt-1.5 text-sm font-semibold uppercase text-foreground">{displayName}</DropdownMenuLabel>
						{user.email && <DropdownMenuLabel className="px-2 pb-1.5 -mt-1 text-xs text-muted-foreground">{user.email}</DropdownMenuLabel>}
						<Link href="/profile">
							<DropdownMenuItem className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm cursor-pointer">
								<User className="h-4 w-4" /> আমার প্রোফাইল
							</DropdownMenuItem>
						</Link>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleSignOut} disabled={isSigningOut} variant="destructive" className="!focus:bg-red-600/10 flex items-center gap-2 rounded-lg px-2 py-2 text-sm cursor-pointer">
							<LogOut className="h-4 w-4" /> সাইন আউট
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
