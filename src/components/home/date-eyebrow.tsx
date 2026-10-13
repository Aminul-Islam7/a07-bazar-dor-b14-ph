'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useApp } from '@/context/app-context';

export default function DateEyebrow() {
	const context = useApp();

	return <div className="font-sans inline-flex items-center min-h-7 bg-green-100/70 dark:bg-green-800/30 text-primary dark:text-white px-3 py-1 text-sm font-medium rounded-full">{context.banglaDate ? <span className="text-xs">{context.banglaDate}</span> : <Skeleton className="h-3 w-32 bg-green-200/60 dark:bg-green-800/60 rounded" />}</div>;
}
