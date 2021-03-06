import { ComponentProps, ReactElement } from 'react'
import { Listbox } from '@headlessui/react'
import clsx from 'clsx'
import { FaCheck } from 'react-icons/fa'
import { CheckIcon } from '@heroicons/react/outline'

interface SelectOption extends Omit<ComponentProps<'li'>, 'value'> {
	value: unknown
	label: string
	selectedIcon?: ReactElement
}

export const SelectOption = ({ value, label, selectedIcon }: SelectOption) => {
	return (
		<Listbox.Option
			key={JSON.stringify(value)}
			className={({ active }) =>
				clsx(
					'cursor-pointer select-none relative py-2 px-4',
					active ? 'text-white bg-brand-600' : 'text-gray-900'
				)
			}
			value={value}
		>
			{({ selected, active }) => (
				<>
					<div className="flex items-center space-x-2">
						{selected && (
							<span
								className={clsx('flex-shrink-0 inline-block')}
								aria-hidden="true"
							>
								{selectedIcon}
							</span>
						)}
						<span className="block truncate">{label}</span>
					</div>
				</>
			)}
		</Listbox.Option>
	)
}
