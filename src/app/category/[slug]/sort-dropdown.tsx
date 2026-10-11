'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SORT_OPTIONS, SortOptionValue } from '@/types/sort';

import { Button } from '@/components/ui/button';
import { FaAngleDown } from 'react-icons/fa6';
import { useState } from 'react';

interface SortDropdownProps {
	sortDirection: SortOptionValue;
	onSortChange: (val: SortOptionValue) => void;
}

export default function SortDropdown({ sortDirection, onSortChange }: SortDropdownProps) {
	const [open, setOpen] = useState(false);
	const handleSelect = (val: string) => {
		onSortChange(val as SortOptionValue);
		setOpen(false);
	};
	const currentOption = SORT_OPTIONS.find(option => option.value === sortDirection);
	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger
				render={
					<Button variant="outline" className="bg-card">
						{currentOption ? currentOption.label : 'ডিফল্ট'}
						<FaAngleDown />
					</Button>
				}
			/>
			<DropdownMenuContent className="min-w-56">
				<DropdownMenuGroup>
					<DropdownMenuLabel>দাম অনুযায়ী সর্ট করুন</DropdownMenuLabel>
					<DropdownMenuRadioGroup value={sortDirection} onValueChange={handleSelect}>
						{SORT_OPTIONS.map(option => (
							<DropdownMenuRadioItem key={option.value} value={option.value}>
								{option.label}
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
