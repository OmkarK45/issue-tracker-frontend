import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '~/lib/fetchJson'
import { Issue, PaginatedApiResponse } from '~/lib/types'
import { IssueListWrapper } from './IssueListWrapper'

export function MyIssues() {
	const [pageIndex, setPageIndex] = useState(0)
	const router = useRouter()

	const { data: swr } = useSWR<PaginatedApiResponse<Issue>>(
		`/issues/${router.query.application}/issues/mine?page=${
			pageIndex + 1
		}&limit=20`,
		fetcher
	)

	return (
		<IssueListWrapper
			issuesResponse={swr}
			pageIndex={pageIndex}
			setPageIndex={setPageIndex}
		/>
	)
}
