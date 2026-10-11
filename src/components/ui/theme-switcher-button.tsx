import { MoonStar, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export default function ThemeSwitcherButton() {
	const { theme, setTheme } = useTheme();

	return (
		<Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-lg text-neutral-600 p-0 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 cursor-pointer">
			<Sun className="h-5 w-5 hidden dark:block" />
			<MoonStar className="h-5 w-5 block dark:hidden" />
		</Button>
	);
}
