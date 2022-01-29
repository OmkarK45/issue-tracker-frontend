import { ChatAltIcon, UserCircleIcon } from '@heroicons/react/solid'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { AiOutlineSmile } from 'react-icons/ai'
import useSWR from 'swr'
import { fetcher } from '~/lib/fetchJson'
import { Activity, ApiResponse } from '~/lib/types'

export default function IssueActivity() {
	const router = useRouter()
	const { data } = useSWR<ApiResponse<Activity[]>>(
		`/issues/${(router.query.id as string).split(':')[1]}/activity`,
		fetcher
	)

	return (
		<div className="flow-root">
			<ul role="list" className="-mb-8">
				{data?.data?.map((activityItem, activityItemIdx) => (
					<li key={activityItem.id}>
						<div className="relative pb-8">
							{activityItemIdx !== data?.data?.length - 1 ? (
								<span
									className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
									aria-hidden="true"
								/>
							) : null}
							<div className="relative flex items-start space-x-3">
								{activityItem.type === 'COMMENTED' ? (
									<Comment
										author={activityItem.author.name}
										createdAt={activityItem.createdAt}
										text={activityItem.text}
									/>
								) : activityItem.type === 'ASSIGNED' ? (
									<Assignment
										text={activityItem.text}
										createdAt={activityItem.createdAt}
									/>
								) : activityItem.type === 'CREATED' ? (
									<Assignment
										text={activityItem.text}
										createdAt={activityItem.createdAt}
									/>
								) : null}
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export function Comment({
	author,
	text,
	createdAt,
}: {
	author: string
	text: string
	createdAt: string
}) {
	return (
		<>
			<div className="relative">
				<AiOutlineSmile className="h-10 w-10 rounded-full bg-white" />
				<span className="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">
					<ChatAltIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</span>
			</div>
			<div className="min-w-0 flex-1 ml-10">
				<div>
					<div className="text-sm">
						<p className="font-medium text-gray-900">{author}</p>
					</div>
					<p className="mt-0.5 text-sm text-gray-500">
						Commented {format(new Date(createdAt), 'MMM d')}
					</p>
				</div>
				<div className="mt-2 text-sm text-gray-700">
					<p>{text}</p>
				</div>
			</div>
		</>
	)
}

export function Assignment({
	text,
	createdAt,
}: {
	text: string
	createdAt: string
}) {
	return (
		<>
			<div>
				<div className="relative px-1">
					<div className="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center">
						<UserCircleIcon
							className="h-5 w-5 text-gray-500"
							aria-hidden="true"
						/>
					</div>
				</div>
			</div>
			<div className="min-w-0 flex-1 py-1.5">
				<div className="text-sm text-gray-500">
					{text}
					<span className="inline whitespace-nowrap">
						{' - '}
						{format(new Date(createdAt), 'MMM d - h:mm a')}
					</span>
				</div>
			</div>
		</>
	)
}
