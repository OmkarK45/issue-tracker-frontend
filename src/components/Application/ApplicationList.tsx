import { CubeIcon, PlusIcon } from '@heroicons/react/outline'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '~/lib/fetchJson'
import { Application, PaginatedApiResponse } from '~/lib/types'
import useUser from '~/lib/useUser'
import { Alert } from '../ui/Alert'
import { Button } from '../ui/Button'
import { Link } from '../ui/Link'
import { useModal } from '../ui/Modal'
import { ApplicationCard } from './ApplicationCard'
import { CreateApplicationModal } from './CreateApplicationModal'

export function ApplicationList({
	applications,
}: {
	applications: PaginatedApiResponse<Application>
}) {
	const [page, setPage] = useState<number>(0)
	const [applicationsList, setApplicationsList] = useState<Application[]>([])
	const [reachedEnd, setReachedEnd] = useState<boolean>(false)

	const { data } = useSWR<PaginatedApiResponse<Application>>(
		`/app?page=${page + 1}&limit=10`,
		fetcher,
		{
			fallbackData: applications,
		}
	)

	const createApplicationModal = useModal()

	useEffect(() => {
		if (data?.pageInfo.totalCount === applicationsList.length) {
			setReachedEnd(true)
		}
		setApplicationsList((previous) => {
			console.log('POREVOS', previous)
			const prev = _.uniqBy(previous.concat(data?.data ?? []), 'id')
			return [...prev]
		})
	}, [data])

	return (
		<div className="mx-auto container md:max-w-7xl ">
			<div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-6 gap-8">
				{applicationsList.map((application) => (
					<Link
						href={`/${application.id}`}
						key={application.id}
						className="no-underline"
					>
						<ApplicationCard {...application} />
					</Link>
				))}
				<div>
					<div className="relative shadow-sm flex items-end justify-center overflow-hidden  border-2 border-gray-500 border-dashed md:rounded-lg group h-56">
						<button
							onClick={createApplicationModal.open}
							className="absolute left-0 bottom-0 flex flex-col items-center justify-center w-full h-full bg-gray-300 dark:bg-gray-700 opacity-50 group-hover:opacity-75"
						>
							<PlusIcon className="w-14 h-14 text-gray-500 dark:text-gray-300" />
							<p>Create Application</p>
						</button>
					</div>
				</div>
				<CreateApplicationModal
					isOpen={createApplicationModal.props.open}
					onClose={createApplicationModal.props.onClose}
				/>
			</div>
			<div className="flex items-center justify-center  mt-10">
				<Button
					size="xl"
					variant="ghost"
					disabled={reachedEnd}
					onClick={() => !reachedEnd && setPage((prev) => prev + 1)}
				>
					{reachedEnd ? 'No more applications' : 'Load More'}
				</Button>
			</div>
		</div>
	)
}
