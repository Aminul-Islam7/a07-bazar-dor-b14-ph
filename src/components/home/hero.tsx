import { Button } from '../ui/button';
import DateEyebrow from './date-eyebrow';
import Image from 'next/image';
import bazarHero from '@/assets/bazar-hero.svg';

export default function Hero() {
	return (
		<section className="bg-card border p-5 rounded-2xl flex flex-col md:flex-row">
			<div className="flex-2 flex flex-col justify-between">
				<div className="flex flex-col gap-2 items-center md:items-start">
					<DateEyebrow></DateEyebrow>
					<h1 className="text-4xl font-bold text-center md:text-start">আজকের বাজারের দাম এক নজরে</h1>
					<p className="text-muted-foreground my-5 text-center md:text-start">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
				</div>
				<a href="#all-products-section">
					<Button size="lg" className="py-5 px-7 w-full md:w-fit text-base cursor-pointer">
						সব পণ্য দেখুন
					</Button>
				</a>
			</div>
			<Image priority className="flex-1 max-w-70 order-first md:order-last mb-2 md:mb-0 self-center" src={bazarHero} width={250} height={250} alt="Hero image"></Image>
		</section>
	);
}
