import {
	ArrowNarrowLeftIcon,
	ArrowNarrowRightIcon,
} from '@heroicons/react/solid'
import clsx from 'clsx'
import { PageInfo } from '~/lib/types'

export default function Pagination({
	onSetPrevious,
	onSetNext,
	pageInfo,
	pageIndex,
	setPageIndex,
}: {
	onSetPrevious: () => void
	onSetNext: () => void
	pageInfo: PageInfo
	pageIndex: number
	setPageIndex: (pageIndex: number) => void
}) {
	return (
		<nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
			<div className="-mt-px w-0 flex-1 flex">
				<button
					disabled={pageIndex === 0}
					onClick={onSetPrevious}
					className="disabled:cursor-not-allowed border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
				>
					<ArrowNarrowLeftIcon
						className="mr-3 h-5 w-5 text-gray-400"
						aria-hidden="true"
					/>
					Previous
				</button>
			</div>
			<div className="hidden md:-mt-px md:flex">
				{Array.from({ length: pageInfo?.totalPage }, (_, i) => (
					<button
						key={i}
						onClick={() => setPageIndex(i)}
						className={clsx(
							'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium',
							{
								'border-brand-500 text-brand-600': i === pageIndex,
							}
						)}
					>
						{i + 1}
					</button>
				))}
			</div>
			<div className="-mt-px w-0 flex-1 flex justify-end">
				<button
					onClick={onSetNext}
					disabled={
						pageInfo?.currentPage
							? pageInfo.currentPage === pageInfo.totalPage
							: true
					}
					className="disabled:cursor-not-allowed border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
				>
					Next
					<ArrowNarrowRightIcon
						className="ml-3 h-5 w-5 text-gray-400"
						aria-hidden="true"
					/>
				</button>
			</div>
		</nav>
	)
}
