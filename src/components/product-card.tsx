import { directionColor, directionSymbol, numberInBangla } from '@/lib/utils';

import { CommodityItem } from '@/types/commodity';

export default function ProductCard({ product }: { product: CommodityItem }) {
	return (
		<article className="bg-card p-4 rounded-xl  space-y-4">
			<div className="flex gap-2">
				<div className="rounded-lg bg-background h-12 w-12 flex justify-center items-center text-2xl">{product.image}</div>
				<div className="flex flex-col gap-1">
					<h3 className="font-semibold">{product.nameBn}</h3>
					<span className="text-xs text-muted-foreground">প্রতি কেজি</span>
				</div>
			</div>
			<div className="text-xs -mb-0.5">আজকের দাম</div>
			<div className="flex justify-between items-end">
				<div className="flex items-end gap-1">
					<span className="text-xl font-bold mr-0.5">{numberInBangla(product.today)}</span> <span className="text-sm font-semibold mb-0.5">টাকা</span>
				</div>
				<div className={`font-semibold text-xs bg-background rounded-full py-1 px-2 ${directionColor(product.change.dir)}`}>{directionSymbol(product.change.dir) + ' ' + numberInBangla(Math.abs(product.change.pct).toFixed(1)) + '%'}</div>
			</div>
		</article>
	);
}
