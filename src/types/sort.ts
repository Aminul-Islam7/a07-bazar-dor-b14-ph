export const SORT_OPTIONS = [
	{ value: 'default', label: 'ডিফল্ট' },
	{ value: 'price-asc', label: 'দাম: কম থেকে বেশি' },
	{ value: 'price-dsc', label: 'দাম: বেশি থেকে কম' },
] as const;

// Derives: "default" | "price-asc" | "price-desc"
export type SortOptionValue = (typeof SORT_OPTIONS)[number]['value'];
