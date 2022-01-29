import { NextPageContext } from 'next'
import dynamic from 'next/dynamic'
import { DashboardLayout } from '~/components/Dashboard/DashboardLayout'
import { IssueDetail } from '~/components/Issue/IssueDetail'
import { fetcher } from '~/lib/fetchJson'
import { Issue } from '~/lib/types'

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
			<IssueDetail issueDetail={issueDetail} />
		</DashboardLayout>
	)
}

export async function getServerSideProps(ctx: NextPageContext) {
	const issueId = (ctx.query.id as string).split(':')[1]
	console.log(issueId)
	const issueDetailResponse = await fetcher(`/issues/${issueId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			cookie: ctx.req?.headers.cookie ?? '',
		},
	})

	console.log(issueDetailResponse.data)
	return {
		props: {
			defaultTab: ctx.query.tab ?? null,
			application: ctx.query.application,
			issueDetail: issueDetailResponse.data,
		},
	}
}
