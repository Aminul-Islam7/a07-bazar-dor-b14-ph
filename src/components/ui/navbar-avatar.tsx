import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';

import { Button } from './button';
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

interface SessionUser {
	createdAt: Date;
	email: string;
	emailVerified: boolean;
	id: string;
	name: string;
	updatedAt: Date;
}

export default function NavbarAvatar({ user }: { user: SessionUser }) {
	const router = useRouter();

	const handleSignOut = async () => {
		await signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push('/sign-in');
				},
			},
		});
	};

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger render={<Button variant="ghost" className="h-auto rounded-xl p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800/50" />}>
					<div className="flex items-center gap-2">
						<Avatar className="h-8 w-8 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
							{/* <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" /> */}
							<AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
						</Avatar>
						<span className="text-sm font-semibold text-muted-foreground max-w-20 truncate">{user.name.trim().split(' ')[0]}</span>
						<ChevronDown className="h-4 w-4 text-neutral-400" />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-56 rounded-xl p-1.5 shadow-xl">
					<DropdownMenuGroup>
						<DropdownMenuLabel className="px-2 py-1.5 text-xs text-neutral-400 uppercase">Account</DropdownMenuLabel>
						<DropdownMenuItem className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm">
							<User className="h-4 w-4" /> আমার প্রোফাইল
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleSignOut} variant="destructive" className="!focus:bg-red-600/10 flex items-center gap-2 rounded-lg px-2 py-2 text-sm">
							<LogOut className="h-4 w-4" /> সাইন আউট
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
