import clsx from 'clsx'
import React from 'react'

type Props = {
	size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
	children: React.ReactNode
	className?: string
	noItalics?: boolean
}

const variants = {
	h1: 'text-6xl',
	h2: 'text-5xl',
	h3: 'text-4xl',
	h4: 'text-3xl',
	h5: 'text-2xl',
}

export function Heading({
	size: Size = 'h1',
	children,
	className,
	noItalics,
}: Props) {
	return (
		<Size
			className={clsx('font-bold  dark:text-white', variants[Size], className, {
				'not-italic': noItalics,
			})}
		>
			{children}
		</Size>
	)
}
