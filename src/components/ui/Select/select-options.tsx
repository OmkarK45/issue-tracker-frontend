import { ComponentProps, Fragment, ReactNode } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import clsx from 'clsx'

interface SelectOptionsProps extends ComponentProps<'ul'> {
	children: ReactNode
}

export const SelectOptions = ({
	children,
	className,
	...props
}: SelectOptionsProps) => {
	return (
		<Transition
			as={Fragment}
			leave="transition ease-in duration-100"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<Listbox.Options
				className={clsx(
					'absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm ',
					className
				)}
				{...props}
			>
				{children}
			</Listbox.Options>
		</Transition>
	)
}
