import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';

export default function NotFound() {
	return (
		<main className="min-h-[70vh] flex items-center justify-center px-6">
			<div className="max-w-md w-full text-center space-y-6">
				<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl text-muted-foreground">
					<MdOutlineRemoveShoppingCart size={80} />
				</div>

				<div className="space-y-4">
					<div className="text-md font-semibold text-muted-foreground">৪০৪ • পাওয়া যায়নি</div>
					<h1 className="text-2xl font-bold text-foreground sm:text-3xl">পণ্য বা পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h1>
				</div>

				<div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-2">
					<Button size="lg" className="w-full sm:w-fit cursor-pointer">
						<Link href="/" className="flex items-center gap-2">
							<ArrowLeft />
							হোমপেজে ফিরে যান
						</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}
