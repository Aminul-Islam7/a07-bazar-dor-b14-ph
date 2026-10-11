export { cn } from 'cn';

export function numberInBangla(input: number) {
	const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
	return input.toString().replace(/\d/g, digit => banglaDigits[+digit]);
}

