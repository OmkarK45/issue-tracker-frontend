import { ReactElement } from 'react'
import { Listbox } from '@headlessui/react'
import clsx from 'clsx'
import { SelectorIcon } from '@heroicons/react/outline'

const labelVariants = {
	default: 'text-black',
	placeholder: 'text-gray-400',
}

interface Props {
	label: string
	variant?: keyof typeof labelVariants
	icon?: ReactElement
}

export const SelectButton = ({ label, variant = 'default', icon }: Props) => {
	const labelVariant = labelVariants[variant]

	return (
		<Listbox.Button className="z-30 relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 sm:text-sm">
			<span className={clsx('block truncate', labelVariant)}>{label}</span>
			{icon && (
				<span className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
					{icon}
				</span>
			)}
			<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
				<SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
			</span>
		</Listbox.Button>
	)
}
