import { format } from 'date-fns'
import { useRouter } from 'next/router'
import React from 'react'
import { Column } from 'react-table'
import { Issue, PaginatedApiResponse } from '~/lib/types'
import { useStore } from '~/store/store'
import { PageHeader } from '../Common/PageHeader'
import { Badge } from '../ui/Badge'
import { Link } from '../ui/Link'
import { IssueTable } from './IssueTable'
import Pagination from './Pagination'
import { PriorityPill } from './PriorityPill'

export interface ColumnDetails {
	[key: string]: any
}

export function IssueListWrapper({
	issuesResponse,
	pageIndex,
	setPageIndex,
}: {
	issuesResponse: PaginatedApiResponse<Issue> | undefined
	pageIndex: number
	setPageIndex: (pageIndex: number) => void
}) {
	const router = useRouter()
	const currentApplication = useStore((state) => state.currentApplication)

	const data = React.useMemo<ColumnDetails[]>(
		() =>
			issuesResponse?.data.map((issue) => {
				return {
					col1: issue.number,
					col2: `${issue.application.name.slice(0, 3).toUpperCase()}-${
						issue.number
					}`,
					col3: issue.title,
					col4: (
						<Badge variant="blue" size="sm">
							{issue.status}
						</Badge>
					),
					col5: <PriorityPill priority={issue.priority} />,
					col6: (
						<p className="text-xs">
							{format(new Date(issue.createdAt), 'MMM d : h:mm a')}
						</p>
					),
					col7: (
						<Link
							className="no-underline !text-brand-800 "
							href={`/${router.query.application}/issues/${
								issue.number + ':' + issue.id
							}`}
						>
							View More{' →'}
						</Link>
					),
				}
			}) as ColumnDetails[],
		[issuesResponse?.data]
	)

	const columns = React.useMemo<Column<Record<string, string>>[]>(
		() => [
			{
				Header: '#',
				accessor: 'col1', // accessor is the "key" in the data
			},
			{
				Header: 'Issue Code',
				accessor: 'col2',
			},
			{
				Header: 'Issue Title',
				accessor: 'col3',
			},
			{
				Header: 'Status',
				accessor: 'col4',
			},
			{
				Header: 'Priority',
				accessor: 'col5',
			},
			{
				Header: 'Date Created',
				accessor: 'col6',
			},
			{
				Header: 'View More',
				accessor: 'col7',
			},
		],
		[]
	)

	return (
		<div className="align-middle inline-block min-w-full pb-24">
			<div className="shadow overflow-hidden border-b border-gray-200">
				<IssueTable columns={columns} data={data ?? []} />
			</div>
			<div className="px-5 mt-5">
				<Pagination
					onSetNext={() => setPageIndex(pageIndex + 1)}
					onSetPrevious={() => setPageIndex(pageIndex - 1)}
					pageInfo={issuesResponse?.pageInfo!}
					pageIndex={pageIndex}
					setPageIndex={setPageIndex}
				/>
			</div>
		</div>
	)
}
