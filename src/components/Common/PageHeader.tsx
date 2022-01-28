import clsx from 'clsx'
import React from 'react'
import { Heading } from '../ui/Heading'

interface PageHeaderProps {
	title: string
	subtitle?: string | React.ReactNode
	image?: string
	children?: React.ReactNode
}
const DEFAULT_IMAGE =
	'https://tuk-cdn.s3.amazonaws.com/assets/webapp/common/bg_image_dark.png'
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
					<span className="text-gray-300 ">{subtitle}</span>
				</div>
				<div>{children}</div>
			</div>
		</div>
	)
}
