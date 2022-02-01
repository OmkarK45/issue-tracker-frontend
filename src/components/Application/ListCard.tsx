import React from 'react'
import { Heading } from '../ui/Heading'

interface Props {
	title: string
	description: string
	icon: React.ElementType
	onClick: () => void
}

export function ListCard({ title, description, icon, onClick }: Props) {
	const Icon = icon
	return (
		<button
			onClick={onClick}
			className="flex bg-white dark:bg-gray-800 w-full px-5 py-5 rounded-lg shadow-sm animate-scale"
		>
			<div className="mr-4 p-2 flex-shrink-0 self-center rounded-full bg-brand-500">
				<Icon className="h-5 w-5 text-white" />
			</div>
			<div className="text-left">
				<h4 className="font-semibold">{title}</h4>
				<p className="text-gray-500">{description}</p>
			</div>
		</button>
	)
}
