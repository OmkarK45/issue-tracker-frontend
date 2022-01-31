import {
	CalendarIcon,
	ChartBarIcon,
	ChatAltIcon,
	LockOpenIcon,
} from '@heroicons/react/outline'
import { format } from 'date-fns'
import { Issue } from '~/lib/types'
import { ListItem } from './ListItem'
import { MemberList } from './MemberList'

export function IssueMetadata({ issueDetail }: { issueDetail: Issue }) {
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
					<h2 className="text-sm font-medium text-gray-500">Assignees</h2>
					<ul role="list" className="mt-3 space-y-3">
						{issueDetail.assigned_to?.length === 0 && <p>No one assigned</p>}
						{issueDetail.assigned_to?.map(({ user }, index) => {
							return <MemberList key={index} name={user.name} />
						})}
					</ul>
				</div>
			</div>
		</aside>
	)
}
