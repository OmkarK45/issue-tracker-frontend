import { NextPageContext } from 'next'
import { DashboardLayout } from '~/components/Dashboard/DashboardLayout'
import useUser from '~/lib/useUser'

export default function ApplicationPage({
	defaultTab,
	application,
}: {
	defaultTab: string
	application: string
}) {
	const { user } = useUser({
		redirectTo: '/auth/login',
	})
	return <DashboardLayout defaultTab={defaultTab} application={application} />
}

export async function getServerSideProps(ctx: NextPageContext) {
	return {
		props: {
			defaultTab: ctx.query.tab,
			application: ctx.query.application,
		},
	}
}
