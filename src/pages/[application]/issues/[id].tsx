import { NextPageContext } from 'next'
import dynamic from 'next/dynamic'
import { DashboardLayout } from '~/components/Dashboard/DashboardLayout'
import { IssueDetail } from '~/components/Issue/IssueDetail'
import { fetcher } from '~/lib/fetchJson'
import { Issue } from '~/lib/types'
import { initializeStore } from '~/store/store'

export default function IssueDetailPage({
	defaultTab,
	application,
	issueDetail,
}: {
	defaultTab: string
	application: string
	issueDetail: Issue
}) {
	return (
		<DashboardLayout defaultTab={defaultTab} application={application}>
			<IssueDetail />
		</DashboardLayout>
	)
}

export async function getServerSideProps(ctx: NextPageContext) {
	const zustandStore = initializeStore()

	console.log(zustandStore.getState().currentIssue)

	const issueId = (ctx.query.id as string).split(':')[1]
	const issueDetailResponse = await fetcher(`/issues/${issueId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			cookie: ctx.req?.headers.cookie ?? '',
		},
	})

	zustandStore.setState({
		currentIssue: issueDetailResponse.data,
	})

	return {
		props: {
			defaultTab: ctx.query.tab ?? null,
			application: ctx.query.application,
			issueDetail: issueDetailResponse.data,
			initialZustandState: JSON.parse(JSON.stringify(zustandStore.getState())),
		},
	}
}
