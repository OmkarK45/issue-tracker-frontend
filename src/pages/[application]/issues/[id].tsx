import { NextPageContext } from 'next'
import { DashboardLayout } from '~/components/Dashboard/DashboardLayout'
import { IssueActivity } from '~/components/Issue/IssueActivity'
import { IssueDetail } from '~/components/Issue/IssueDetail'

export default function IssueDetailPage({
	defaultTab,
	application,
}: {
	defaultTab: string
	application: string
}) {
	return (
		<DashboardLayout defaultTab={defaultTab} application={application}>
			<IssueDetail />
			<IssueActivity />
		</DashboardLayout>
	)
}

export async function getServerSideProps(ctx: NextPageContext) {
	return {
		props: {
			defaultTab: ctx.query.tab ?? null,
			application: ctx.query.application,
		},
	}
}
