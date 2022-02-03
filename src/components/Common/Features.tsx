import clsx from 'clsx'
import React from 'react'

export interface Feature {
	icon: React.ElementType
	color: { text: string; bg: string }
	title: string
	description: string
}
export function Features({ features }: { features: Feature[] }) {
	return (
		<section className="pt-20 pb-32 bg-white">
			<div className="px-20 mx-auto max-w-7xl">
				<h2 className="mb-1 text-3xl font-extrabold leading-tight text-gray-900">
					Features
				</h2>
				<p className="mb-16 text-lg text-gray-500">
					Here is our list of our powerful features.
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-16 lg:gap-x-24 gap-y-20">
					{features.map((feature, index) => {
						return <Feature key={index} feature={feature} />
					})}
				</div>
			</div>
		</section>
	)
}

export function Feature({ feature }: { feature: Feature }) {
	const Icon = feature.icon
	return (
		<div>
			<div
				className={clsx(
					'flex items-center justify-center w-12 h-12 mb-4 text-red-600 bg-red-100 rounded-full',
					feature.color.bg
				)}
			>
				<Icon className={clsx('w-8 h-8', feature.color.text)} />
			</div>
			<h3 className="mb-2 text-base font-semibold leading-tight text-gray-900 lg:text-lg">
				{feature.title}
			</h3>
			<p className="text-sm text-gray-500 lg:text-base">
				{feature.description}
			</p>
		</div>
	)
}
