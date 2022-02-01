import {
	CalendarIcon,
	ChartBarIcon,
	ChatAltIcon,
	LockOpenIcon,
} from '@heroicons/react/outline'
import { format } from 'date-fns'
import { Issue } from '~/lib/types'
import { Button } from '../ui/Button'
import { ListItem } from './ListItem'
import { MemberList } from './MemberList'
import dynamic from 'next/dynamic'
import { Spinner } from '../ui/Spinner'
import useSWR from 'swr'
import { mutationFn } from '~/lib/fetchJson'
import { useRouter } from 'next/router'
import { UnassignMember } from './UnassignIssueModal'

const AssignIssueModal = dynamic<{}>(
	() => import('./AssignIssueModal').then((x) => x.AssignIssueModal),
	{
		ssr: false,
		loading: () => <Spinner />,
	}
)

export function IssueMetadata({ issueDetail }: { issueDetail: Issue }) {
	const router = useRouter()
	const issueId = (router.query.id as string).split(':')[1]

	async function handleUnassign(userId: string) {
		const resposne = await mutationFn(`/issues/${issueId}/unassign`, {
			assignedUserId: userId,
		})
	}

	return (
		<aside className="mt-8">
			<h2 className="sr-only">Details</h2>
			<div className="space-y-5">
				<ListItem icon={LockOpenIcon} label={issueDetail?.status} />
				<ListItem
					icon={ChartBarIcon}
					label={'Priority - ' + issueDetail?.priority}
				/>
				<ListItem
					icon={ChatAltIcon}
					label={`${issueDetail?._count?.comments} comments`}
				/>
				<ListItem
					icon={CalendarIcon}
					label={`Created at ${format(
						new Date(issueDetail?.createdAt),
						'MMM dd, yyyy'
					)}`}
				/>
			</div>
			<div className="mt-6 border-t border-b border-gray-200 py-6 space-y-8">
				<div>
					<div className="flex items-center justify-between">
						<h2 className="text-sm font-medium text-gray-500">Assignees</h2>
						<AssignIssueModal />
					</div>
					<ul role="list" className="mt-3 space-y-3">
						{issueDetail.assigned_to?.length === 0 && <p>No one assigned</p>}
						{issueDetail.assigned_to?.map(({ user }, index) => {
							return (
								<div key={index} className="flex items-center justify-between">
									<MemberList name={user.name} />
									<UnassignMember user={{ name: user.name, id: user.id }} />
								</div>
							)
						})}
					</ul>
				</div>
			</div>
		</aside>
	)
}
