import { Button } from '../ui/button';
import DateEyebrow from './date-eyebrow';
import Image from 'next/image';
import bazarHero from '@/assets/bazar-hero.svg';

export default function Hero() {
	return (
		<article className="bg-card p-5 my-10 rounded-2xl flex">
			<div className="flex-2 flex flex-col justify-between">
				<div className="space-y-3">
					<DateEyebrow></DateEyebrow>
					<h1 className="text-4xl font-bold">আজকের বাজারের দাম এক নজরে</h1>
					<p className="text-muted-foreground my-5">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
				</div>
				<Button size="lg" className="py-5 px-7 w-fit text-base cursor-pointer">
					সব পণ্য দেখুন
				</Button>
			</div>
			<Image className="flex-1 max-w-70" src={bazarHero} width={70} height={70} alt="Hero image"></Image>
		</article>
	);
}
