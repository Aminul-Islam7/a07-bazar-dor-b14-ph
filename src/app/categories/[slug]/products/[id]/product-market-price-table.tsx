import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Product } from '@/types/commodity';
import { numberInBangla } from '@/lib/utils';

export default function ProductMarketPriceTable({ product }: { product: Product }) {
	return (
		<section className="overflow-hidden rounded-xl border">
			<Table>
				<TableHeader className="bg-background">
					<TableRow className="text-sm font-bold">
						<TableHead className="text-muted-foreground">বাজার</TableHead>
						<TableHead className="text-muted-foreground">বিভাগ</TableHead>
						<TableHead className="text-center text-muted-foreground">সর্বনিম্ন</TableHead>
						<TableHead className="text-center text-muted-foreground">সর্বাধিক</TableHead>
						<TableHead className="text-right text-muted-foreground">গড়</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{product.markets.map(market => {
						const marketAvg = (market.min + market.max) / 2;
						return (
							<TableRow key={market.market}>
								<TableCell className="font-medium">{market.market}</TableCell>
								<TableCell>{market.division}</TableCell>
								<TableCell className="text-center">{numberInBangla(market.min)} টাকা</TableCell>
								<TableCell className="text-center">{numberInBangla(market.max)} টাকা</TableCell>
								<TableCell className="text-right font-semibold">{numberInBangla(marketAvg)} টাকা</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</section>
	);
}
