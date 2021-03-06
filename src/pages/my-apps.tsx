import { NextPageContext } from 'next'
import { ApplicationList } from '~/components/Application/ApplicationList'
import { PageHeader } from '~/components/Common/PageHeader'
import { Navbar } from '~/components/Nav/DesktopNav'
import { Alert } from '~/components/ui/Alert'
import { fetcher } from '~/lib/fetchJson'
import { Application, PaginatedApiResponse } from '~/lib/types'
import useUser from '~/lib/useUser'

export default function ApplicationsPage({
	applications,
}: {
	applications: PaginatedApiResponse<Application>
}) {
	const user = useUser({
		redirectTo: '/auth/login?redirect=/my-apps',
	})

	return (
		<div>
			<Navbar />
			<PageHeader title="Your Applications." />
			<div className="container max-w-7xl mx-auto mt-5">
				<Alert
					message="These are your applications. You can create as many applications you want."
					status="info"
					fullWidth
				/>
			</div>
			<ApplicationList applications={applications} />
		</div>
	)
}

ApplicationsPage.getInitialProps = async (ctx: NextPageContext) => {
	try {
		const userApplications = await fetcher(`/app?page=1&limit=10`, {
			method: 'GET',
			headers: {
				cookie: ctx.req?.headers.cookie ?? '',
			},
		})
		console.log(userApplications)
		return {
			applications: userApplications,
		}
	} catch (e) {
		return {
			applications: null,
		}
	}
}
