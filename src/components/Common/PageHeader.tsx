import clsx from 'clsx'
import { Heading } from '../ui/Heading'

interface PageHeaderProps {
	title: string
	subtitle?: string
	image?: string
	children?: React.ReactNode
}
const DEFAULT_IMAGE =
	'https://res.cloudinary.com/dogecorp/image/upload/v1641642456/background2_amemmq.png'
export function PageHeader({
	title,
	subtitle,
	children,
	image = DEFAULT_IMAGE,
}: PageHeaderProps) {
	return (
		<div className="relative py-6 lg:py-10 ">
			<img
				className="z-0 w-full h-full absolute inset-0 object-cover"
				src={image}
				alt="bg"
			/>
			<div className="z-10 relative max-w-7xl container px-3 md:px-0  mx-auto flex flex-col  md:flex-row items-start md:items-center justify-between">
				<div className={clsx(subtitle && 'prose')}>
					<Heading
						size="h3"
						className="text-2xl font-bold leading-tight text-white capitalize"
					>
						{title}
					</Heading>
					<div>
						<p className="prose text-gray-300 ">{subtitle}</p>
					</div>
				</div>
				<div>{children}</div>
			</div>
		</div>
	)
}
