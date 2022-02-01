import { CubeIcon } from '@heroicons/react/outline'

interface Props {
	name: string
	description: string
	logo?: string
	website?: string
	id: string
}

export function ApplicationCard(props: Props) {
	return (
		<div className="relative shadow-sm flex items-end justify-center overflow-hidden bg-gray-300 dark:bg-gray-800 md:rounded-lg group h-56">
			<div className="absolute left-0 bottom-0 flex items-center justify-center w-full h-full bg-gray-300 dark:bg-gray-700 opacity-50 group-hover:opacity-75">
				<CubeIcon className="w-14 h-14 text-gray-500 dark:text-gray-300" />
			</div>

			<div className="relative flex justify-between items-center w-full px-4 z-10 py-3 text-left">
				<div>
					<h2 className="line-clamp-1 font-sans text-xl font-semibold ">
						{props.name}
					</h2>
					<span className="inline-block font-sans text-xs ">
						{props.description}
					</span>
				</div>
			</div>
		</div>
	)
}
