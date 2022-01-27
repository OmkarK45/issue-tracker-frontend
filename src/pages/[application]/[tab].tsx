import { NextPageContext } from 'next'
import { DashboardLayout } from '~/components/Dashboard/DashboardLayout'

export default function ApplicationPage({
	defaultTab,
	application,
}: {
	defaultTab: string
	application: string
}) {
	return <DashboardLayout defaultTab={defaultTab} application={application} />
}

export async function getServerSideProps(ctx: NextPageContext) {
	console.log(ctx.query.tab, ctx.query.application)
	return {
		props: {
			defaultTab: ctx.query.tab,
			application: ctx.query.application,
		},
	}
}
