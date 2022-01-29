import { format } from 'date-fns'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Column } from 'react-table'
import useSWR from 'swr'
import { fetcher } from '~/lib/fetchJson'
import { Issue, PaginatedApiResponse } from '~/lib/types'
import { useStore } from '~/store/store'
import { Badge } from '../ui/Badge'
import { Data } from '../ui/Data'
import { Link } from '../ui/Link'
import { IssueTable } from './IssueTable'
import Pagination from './Pagination'
import { PriorityPill } from './PriorityPill'

export interface ColumnDetails {
	[key: string]: any
}

export function IssueListWrapper() {
	const [pageIndex, setPageIndex] = useState(0)
	const router = useRouter()
	const issueList = useStore((state) => state.issueList)
	const setIssueList = useStore((state) => state.setIssueList)

	const { data: swr } = useSWR<PaginatedApiResponse<Issue>>(
		`/issues/${router.query.application}/all?page=${pageIndex + 1}&limit=20`,
		fetcher,
		{ onSuccess: (data) => setIssueList(data.data) }
	)
	const data = React.useMemo<ColumnDetails[]>(
		() =>
			swr?.data.map((issue) => {
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
						<Link
							className="no-underline text-brand-800 "
							href={`/${router.query.application}/issues/${
								issue.number + ':' + issue.id
							}`}
						>
							View More{' →'}
						</Link>
					),
					col7: (
						<p className="text-xs text-center">
							{format(new Date(issue.createdAt), 'MMM d')}
						</p>
					),
				}
			}) as ColumnDetails[],
		[swr?.data]
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
				Header: 'View More',
				accessor: 'col6',
			},
			{
				Header: 'Date Created',
				accessor: 'col7',
			},
		],
		[]
	)

	return (
		<div className="align-middle inline-block min-w-full pb-24">
			<div className="shadow overflow-hidden border-b border-gray-200">
				<small>Click the header to sort.</small>
				<IssueTable columns={columns} data={data ?? []} />
			</div>
			<div className="px-5 mt-5">
				<Pagination
					onSetNext={() => setPageIndex(pageIndex + 1)}
					onSetPrevious={() => setPageIndex(pageIndex - 1)}
					pageInfo={swr?.pageInfo!}
					pageIndex={pageIndex}
					setPageIndex={setPageIndex}
				/>
			</div>
		</div>
	)
}