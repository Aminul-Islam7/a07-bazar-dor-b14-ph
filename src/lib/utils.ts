export { cn } from 'cn';

export function numberInBangla(input: number | string) {
	const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
	return input.toString().replace(/\d/g, digit => banglaDigits[+digit]);
}

export const directionSymbol = (dir: string) => {
	if (dir === 'up') return '▲';
	if (dir === 'down') return '▼';
	return '—';
};

export const directionColor = (dir: string) => {
	if (dir === 'up') return 'text-red-600 dark:text-red-400';
	if (dir === 'down') return 'text-green-700 dark:text-green-400';
	return 'text-muted-foreground';
};

