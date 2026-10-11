'use client';

import { useApp } from '@/context/app-context';

export default function DateEyebrow() {
	const context = useApp();
	return <div className="font-sans inline-block items-center bg-green-100 dark:bg-green-900 text-primary dark:text-white px-3 py-1 text-sm font-medium rounded-full">{context.banglaDate ? <span className="text-xs">{context.banglaDate}</span> : '...........................................'}</div>;
}
