import { FaCartShopping } from 'react-icons/fa6';
import { ImageResponse } from 'next/og';

export const size = {
	width: 32,
	height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
	return new ImageResponse(
		<div className="bg-primary rounded-md text-white dark:text-primary flex h-9 w-9 items-center justify-center">
			<FaCartShopping size={20} />
		</div>,
		{ ...size },
	);
}
